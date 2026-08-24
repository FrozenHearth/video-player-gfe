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
        onPlaybackChange(target, false);
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hasSyncedDefaultCaption = useRef(false);
  const isScrubbing = useRef(false);
  const seekTarget = useRef<number | null>(null);

  function syncPlaybackTime(ytPlayer: YouTubePlayer | null) {
    if (!ytPlayer || isScrubbing.current) {
      return;
    }

    const nextDuration = ytPlayer.getDuration();
    if (nextDuration) {
      setDuration(nextDuration);
    }

    if (ytPlayer.getPlayerState() === PlayerState.ENDED) {
      seekTarget.current = null;
      setCurrentTime(nextDuration);
      return;
    }

    const playerTime = ytPlayer.getCurrentTime();

    if (
      seekTarget.current != null &&
      Math.abs(playerTime - seekTarget.current) > 1
    ) {
      return;
    }

    seekTarget.current = null;
    setCurrentTime(playerTime);
  }

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

  function seekTo(seconds: number) {
    if (!player.current) {
      return;
    }

    const videoDuration = player.current.getDuration();
    let nextTime = Math.max(0, seconds);

    if (videoDuration > 0) {
      nextTime = Math.min(nextTime, Math.max(0, videoDuration - 0.25));
    }

    seekTarget.current = nextTime;
    isScrubbing.current = true;
    player.current.seekTo(nextTime, true);
    setCurrentTime(nextTime);
  }

  function stopSeeking() {
    isScrubbing.current = false;
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
    setCurrentTime(0);
    setDuration(0);

    const startPlayer = () => {
      player.current = createPlayer(
        element,
        videoId,
        (target, playing) => {
          setIsPlaying(playing);
          syncPlaybackTime(target);
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

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      syncPlaybackTime(player.current);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying]);

  return {
    playerElement,
    isPlaying,
    isMuted,
    captionsOn,
    captionTracks,
    selectedCaptionTrack,
    volume,
    hasStarted,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    toggleCaptions,
    selectCaptionTrack,
    changeVolume,
    seekTo,
    stopSeeking,
  };
}
