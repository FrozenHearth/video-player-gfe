import PlayerControls from "./controls/PlayerControls";
import { useYouTubePlayer } from "./useYouTubePlayer";

type VideoPlayerProps = {
  videoId: string;
};

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const {
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
  } = useYouTubePlayer(videoId);

  return (
    <section className="group relative aspect-video h-100 w-200 overflow-hidden rounded-lg border-solid border-neutral-200 bg-black [&_iframe]:block [&_iframe]:size-full [&_iframe]:border-0">
      <div className="size-full" ref={playerElement}></div>
      {!hasStarted && (
        <img
          className="absolute inset-0 size-full object-cover"
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
        />
      )}
      <div className="absolute inset-0" onClick={togglePlay}>
        <PlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          captionsOn={captionsOn}
          captionTracks={captionTracks}
          selectedCaptionTrack={selectedCaptionTrack}
          volume={volume}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onToggleCaptions={toggleCaptions}
          onSelectCaptionTrack={selectCaptionTrack}
          onVolumeChange={changeVolume}
        />
      </div>
    </section>
  );
}
