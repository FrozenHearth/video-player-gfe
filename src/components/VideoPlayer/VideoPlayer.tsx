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
  const [showPoster, setShowPoster] = useState(true);

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

  function createVideoPlayer() {
    if (!playerBox.current || !window.Youtube) {
      return;
    }

    player.current = new window.Youtube.Player(playerBox.current, {
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
    if (window.Youtube) {
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
          onPlay={togglePlay}
          onPause={togglePlay}
        />
      </div>
    </section>
  );
}
