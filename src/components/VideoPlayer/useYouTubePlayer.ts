import { useEffect, useRef, useState } from "react";
import {
  PlayerState,
  type CaptionTrack,
  type YouTubePlayer,
} from "../../youtube.ts";

const DEFAULT_VOLUME = 50;

type PlaybackChangeHandler = (
  player: YouTubePlayer,
  isPlaying: boolean,
) => void;

function getCaptionTracks(player: YouTubePlayer) {
  const tracklist = player.getOption("captions", "tracklist");

  if (!Array.isArray(tracklist)) {
    return [];
  }

  const tracks: CaptionTrack[] = [];

  for (const item of tracklist) {
    if (!item || !item.languageCode) {
      continue;
    }

    tracks.push({
      languageCode: item.languageCode,
      languageName: item.languageName || item.languageCode,
    });
  }

  return tracks;
}

function getDefaultCaptionTrack(tracks: CaptionTrack[]) {
  const englishTrack = tracks.find((track) => {
    return track.languageCode.startsWith("en");
  });

  if (englishTrack) {
    return englishTrack;
  }

  return tracks[0];
}

function createPlayer(
  element: HTMLDivElement,
  videoId: string,
  onPlaybackChange: PlaybackChangeHandler,
  onCaptionTracksChange: (
    tracks: CaptionTrack[],
    currentTrack: CaptionTrack | null,
  ) => void,
) {
  let captionsModuleLoaded = false;

  return new window.YT!.Player(element, {
    videoId,
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      cc_load_policy: 1,
      cc_lang_pref: "en",
    },
    events: {
      onReady: ({ target }) => {
        target.setVolume(DEFAULT_VOLUME);
      },
      onApiChange: ({ target }) => {
        const tracks = getCaptionTracks(target);

        if (!tracks.length) {
          return;
        }

        onCaptionTracksChange(tracks, getDefaultCaptionTrack(tracks));
      },
      onStateChange: ({ target, data }) => {
        const isPlaying = data === PlayerState.PLAYING;
        onPlaybackChange(target, isPlaying);

        if (isPlaying && !captionsModuleLoaded) {
          target.loadModule("captions");
          captionsModuleLoaded = true;
        }
      },
    },
  });
}

export function useYouTubePlayer(videoId: string) {
  const playerElement = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [captionTracks, setCaptionTracks] = useState<CaptionTrack[]>([]);
  const [selectedCaptionTrack, setSelectedCaptionTrack] =
    useState<CaptionTrack | null>(null);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [hasStarted, setHasStarted] = useState(false);
  const hasSyncedDefaultCaption = useRef(false);

  function togglePlay() {
    if (!player.current) {
      return;
    }

    if (player.current.getPlayerState() === PlayerState.PLAYING) {
      player.current.pauseVideo();
    } else {
      player.current.playVideo();
    }
  }

  function toggleMute() {
    if (!player.current) {
      return;
    }

    if (player.current.isMuted()) {
      player.current.unMute();
      setIsMuted(false);
      setVolume(player.current.getVolume());
    } else {
      player.current.mute();
      setIsMuted(true);
    }
  }

  function changeVolume(value: number) {
    if (!player.current) {
      return;
    }

    player.current.setVolume(value);
    setVolume(value);

    if (value === 0) {
      player.current.mute();
      setIsMuted(true);
    } else if (player.current.isMuted()) {
      player.current.unMute();
      setIsMuted(false);
    }
  }

  function selectCaptionTrack(track: CaptionTrack | null) {
    if (!player.current) {
      return;
    }

    if (!track) {
      player.current.setOption("captions", "track", {});
      setSelectedCaptionTrack(null);
      setCaptionsOn(false);
      return;
    }

    player.current.setOption("captions", "track", track);
    player.current.setOption("captions", "reload", true);
    setSelectedCaptionTrack(track);
    setCaptionsOn(true);
  }

  function toggleCaptions() {
    if (captionsOn) {
      selectCaptionTrack(null);
      return;
    }

    if (selectedCaptionTrack) {
      selectCaptionTrack(selectedCaptionTrack);
      return;
    }

    const englishTrack = captionTracks.find((track) => {
      return track.languageCode.startsWith("en");
    });

    if (englishTrack) {
      selectCaptionTrack(englishTrack);
      return;
    }

    if (captionTracks[0]) {
      selectCaptionTrack(captionTracks[0]);
    }
  }

  useEffect(() => {
    const element = playerElement.current;
    if (!element) return;

    hasSyncedDefaultCaption.current = false;

    const startPlayer = () => {
      player.current = createPlayer(
        element,
        videoId,
        (_, playing) => {
          setIsPlaying(playing);
          if (playing) {
            setHasStarted(true);
          }
        },
        (tracks, currentTrack) => {
          setCaptionTracks(tracks);

          if (hasSyncedDefaultCaption.current || !currentTrack) {
            return;
          }

          hasSyncedDefaultCaption.current = true;
          setSelectedCaptionTrack(currentTrack);
          setCaptionsOn(true);
        },
      );
    };

    if (window.YT) {
      startPlayer();
    } else {
      window.onYouTubeIframeAPIReady = startPlayer;
    }

    return () => {
      player.current?.destroy();
    };
  }, [videoId]);

  return {
    playerElement,
    isPlaying,
    isMuted,
    captionsOn,
    captionTracks,
    selectedCaptionTrack,
    volume,
    hasStarted,
    togglePlay,
    toggleMute,
    toggleCaptions,
    selectCaptionTrack,
    changeVolume,
  };
}
