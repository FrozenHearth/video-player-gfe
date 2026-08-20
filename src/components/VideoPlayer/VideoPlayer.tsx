import { useEffect, useRef, useState } from "react";
import PlayerControls from "./PlayerControls";
import { PlayerState, type YouTubePlayer } from "../../youtube.ts";

type VideoPlayerProps = {
  videoId: string;
};

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const playerBox = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(50);
  const [showPoster, setShowPoster] = useState(true);

  function togglePlay() {
    if (!player.current) {
      return;
    }

    if (player.current?.getPlayerState() === PlayerState.PLAYING) {
      player.current?.pauseVideo();
    } else {
      player.current?.playVideo();
    }
  }

  function toggleMute() {
    if (player.current?.isMuted()) {
      player.current?.unMute();
      setIsMuted(false);
      setCurrentVolume(player.current?.getVolume() ?? 50);
    } else {
      player.current?.mute();
      setCurrentVolume(0);
      setIsMuted(true);
    }
  }

  useEffect(() => {
    if (currentVolume === 0) {
      setIsMuted(true);
    }
  }, [currentVolume]);

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const volume = parseInt(event.target.value);
    player.current?.setVolume(volume);
    setCurrentVolume(volume);
  }

  function createVideoPlayer() {
    if (!playerBox.current || !window.YT) {
      return;
    }

    player.current = new window.YT.Player(playerBox.current, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
        controls: 0,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(50);
          setCurrentVolume(50);
        },
        onStateChange: (event) => {
          setIsPlaying(event.data === PlayerState.PLAYING);
          if (event.data === PlayerState.PLAYING) {
            setShowPoster(false);
          }
        },
      },
    });
  }

  useEffect(() => {
    if (window.YT) {
      createVideoPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createVideoPlayer;
    }

    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, []);

  return (
    <section className="group relative aspect-video h-100 w-200 overflow-hidden rounded-lg border-solid border-neutral-200 bg-black [&_iframe]:block [&_iframe]:size-full [&_iframe]:border-0">
      <div className="size-full" ref={playerBox}></div>
      {showPoster ? (
        <img
          className="absolute inset-0 size-full object-cover"
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
        />
      ) : null}
      <div className="absolute inset-0" onClick={togglePlay}>
        <PlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlay={togglePlay}
          onPause={togglePlay}
          onMute={toggleMute}
          onUnmute={toggleMute}
          currentVolume={currentVolume}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </section>
  );
}
