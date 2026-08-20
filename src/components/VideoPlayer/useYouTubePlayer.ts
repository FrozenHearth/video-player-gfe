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

function createPlayer(
  element: HTMLDivElement,
  videoId: string,
  onPlaybackChange: PlaybackChangeHandler,
) {
  let captionsInitialized = false;

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
      onStateChange: ({ target, data }) => {
        const isPlaying = data === PlayerState.PLAYING;
        onPlaybackChange(target, isPlaying);

        if (isPlaying && !captionsInitialized) {
          target.loadModule("captions");
          target.setOption("captions", "track", {});
          captionsInitialized = true;
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
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [hasStarted, setHasStarted] = useState(false);

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

  function toggleCaptions() {
    if (!player.current) {
      return;
    }

    if (captionsOn) {
      player.current.setOption("captions", "track", {});
      setCaptionsOn(false);
      return;
    }

    const tracks = player.current.getOption(
      "captions",
      "tracklist",
    ) as CaptionTrack[];

    if (!tracks) {
      return;
    }

    const englishTrack = tracks.find((track) => {
      return track.languageCode.startsWith("en");
    });

    if (!englishTrack) {
      return;
    }

    player.current.setOption("captions", "track", englishTrack);
    player.current.setOption("captions", "reload", true);
    setCaptionsOn(true);
  }

  useEffect(() => {
    const element = playerElement.current;
    if (!element) return;

    const startPlayer = () => {
      player.current = createPlayer(element, videoId, (_, playing) => {
        setIsPlaying(playing);
        if (playing) {
          setHasStarted(true);
        }
      });
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
    volume,
    hasStarted,
    togglePlay,
    toggleMute,
    toggleCaptions,
    changeVolume,
  };
}
