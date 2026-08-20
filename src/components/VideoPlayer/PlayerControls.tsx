import {
  RiClosedCaptioningFill,
  RiFullscreenLine,
  RiPauseFill,
  RiPictureInPictureFill,
  RiPlayFill,
  RiSettings3Line,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
} from "react-icons/ri";

export default function PlayerControls({
  isPlaying,
  isMuted,
  currentVolume,
  onPlay,
  onPause,
  onMute,
  onUnmute,
  handleVolumeChange,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  currentVolume?: number;
  onPlay: () => void;
  onPause: () => void;
  onMute: () => void;
  onUnmute: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section
      className="absolute inset-x-0 bottom-0 flex h-11 flex-col items-end bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center self-stretch bg-indigo-50">
        <div className="h-1 w-25 bg-indigo-700"></div>
      </div>
      <footer className="flex h-full w-full items-center px-4">
        <aside className="flex gap-1.5 pr-4">
          <div className="flex items-center justify-center gap-2 rounded">
            <RiSkipBackFill className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            {isPlaying ? (
              <button
                type="button"
                className="cursor-pointer"
                onClick={onPause}
              >
                <RiPauseFill className="h-4.5 w-4.5 text-white" />
              </button>
            ) : (
              <button type="button" className="cursor-pointer" onClick={onPlay}>
                <RiPlayFill className="h-4.5 w-4.5 text-white" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            <RiSkipForwardFill className="h-4.5 w-4.5 text-white" />
          </div>
        </aside>
        <div className="flex pr-4">
          {isMuted || currentVolume === 0 ? (
            <button
              type="button"
              className="cursor-pointer"
              onClick={isMuted ? onUnmute : onMute}
            >
              <RiVolumeMuteFill className="h-4.5 w-4.5 text-white" />
            </button>
          ) : (
            <section className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer peer"
                onClick={onUnmute}
              >
                <RiVolumeDownFill className="h-4.5 w-4.5 text-white" />
              </button>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                value={currentVolume}
                onChange={handleVolumeChange}
                className="h-3 w-12 cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:size-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-black"
                style={{
                  background: `linear-gradient(to right, white ${currentVolume ?? 50}%, #e5e7eb ${currentVolume ?? 50}%) no-repeat center / 100% 2px`,
                }}
              />
            </section>
          )}
        </div>
        <div className="flex h-4.5 grow items-center">
          <span className="text-xs font-medium text-white">1:48 / 3:24</span>
        </div>
        <aside className="flex gap-2">
          <div className="flex items-center justify-center gap-2 rounded">
            <RiClosedCaptioningFill className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            <RiSettings3Line className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            <RiPictureInPictureFill className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            <RiFullscreenLine className="h-4.5 w-4.5 text-white" />
          </div>
        </aside>
      </footer>
    </section>
  );
}
