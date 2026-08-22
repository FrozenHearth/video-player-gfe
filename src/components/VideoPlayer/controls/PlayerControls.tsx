import { useState } from "react";
import {
  RiClosedCaptioningFill,
  RiClosedCaptioningLine,
  RiFullscreenLine,
  RiPauseFill,
  RiPictureInPictureFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
} from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PlayerSettings from "./PlayerSettings";
import { cn } from "@/lib/utils";

type PlayerControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  captionsOn: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleCaptions: () => void;
  onVolumeChange: (volume: number) => void;
};

export default function PlayerControls({
  isPlaying,
  isMuted,
  captionsOn,
  volume,
  onTogglePlay,
  onToggleMute,
  onToggleCaptions,
  onVolumeChange,
}: PlayerControlsProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <section
      className={cn(
        "absolute inset-x-0 bottom-0 flex h-11 flex-col items-end bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100",
        isSettingsOpen && "opacity-100",
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center self-stretch bg-indigo-50">
        <div className="h-1 w-25 bg-indigo-700"></div>
      </div>
      <footer className="flex h-full w-full items-center px-4">
        <aside className="flex gap-1.5 pr-4">
          <button type="button" disabled>
            <RiSkipBackFill className="h-4.5 w-4.5 text-white" />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={onTogglePlay}
          >
            {isPlaying ? (
              <RiPauseFill className="h-4.5 w-4.5 text-white" />
            ) : (
              <RiPlayFill className="h-4.5 w-4.5 text-white" />
            )}
          </button>
          <button type="button" disabled>
            <RiSkipForwardFill className="h-4.5 w-4.5 text-white" />
          </button>
        </aside>

        <div className="flex items-center gap-2 pr-4">
          <button
            type="button"
            className="cursor-pointer"
            onClick={onToggleMute}
          >
            {isMuted || volume === 0 ? (
              <RiVolumeMuteFill className="h-4.5 w-4.5 text-white" />
            ) : (
              <RiVolumeDownFill className="h-4.5 w-4.5 text-white" />
            )}
          </button>
          <input
            type="range"
            aria-label="Volume"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            className="h-3 w-12 cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:size-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-black"
            style={{
              background: `linear-gradient(to right, white ${volume}%, #e5e7eb ${volume}%) no-repeat center / 100% 2px`,
            }}
          />
        </div>

        <div className="flex h-4.5 grow items-center">
          <span className="text-xs font-medium text-white">1:48 / 3:24</span>
        </div>
        <aside className="flex gap-2">
          <div className="flex items-center justify-center gap-2 rounded">
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="flex cursor-pointer items-center"
                onClick={onToggleCaptions}
              >
                {captionsOn ? (
                  <RiClosedCaptioningFill className="h-4.5 w-4.5 text-white" />
                ) : (
                  <RiClosedCaptioningLine className="h-4.5 w-4.5 text-white" />
                )}
              </TooltipTrigger>
              <TooltipContent className="px-3 py-2 rounded-lg">
                <p>Captions</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center justify-center gap-2 rounded">
            <PlayerSettings onOpenChange={setIsSettingsOpen} />
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
