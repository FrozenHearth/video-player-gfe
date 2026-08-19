import { useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";

type VideoPlayerProps = {
  videoId: string;
};

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const playerBox = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);

  function makePlayer() {
    const win = window as any;

    if (!playerBox.current || !win.YT) {
      return;
    }

    player.current = new win.YT.Player(playerBox.current, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
        controls: 0,
      },
    });
  }

  useEffect(() => {
    const win = window as any;

    if (win.YT) {
      makePlayer();
    } else {
      win.onYouTubeIframeAPIReady = makePlayer;
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
      <img
        className="absolute inset-0 size-full object-cover"
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
      />
      <div className="absolute inset-0">
        <PlayerControls />
      </div>
    </section>
  );
}
