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
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PlayerSettings from "./PlayerSettings";
import { cn } from "@/lib/utils";
import type { CaptionTrack } from "../../../youtube";
import { PlayerSlider } from "./slider/PlayerSlider";

dayjs.extend(duration);

function formatPlayerTime(
  seconds: number,
  rounding: "floor" | "round" = "floor",
) {
  const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const displaySeconds =
    rounding === "round" ? Math.round(safeSeconds) : Math.floor(safeSeconds);
  const time = dayjs.duration(displaySeconds, "seconds");

  if (time.asHours() >= 1) {
    return time.format("H:mm:ss");
  }

  return time.format("m:ss");
}

type PlayerControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  captionsOn: boolean;
  captionTracks: CaptionTrack[];
  selectedCaptionTrack: CaptionTrack | null;
  volume: number;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleCaptions: () => void;
  onSelectCaptionTrack: (track: CaptionTrack | null) => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (seconds: number) => void;
  onSeekEnd: () => void;
};

export default function PlayerControls({
  isPlaying,
  isMuted,
  captionsOn,
  captionTracks,
  selectedCaptionTrack,
  volume,
  currentTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onToggleCaptions,
  onSelectCaptionTrack,
  onVolumeChange,
  onSeek,
  onSeekEnd,
}: PlayerControlsProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const formattedCurrentTime = formatPlayerTime(currentTime);
  const formattedDuration = formatPlayerTime(duration, "round");

  return (
    <section
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex h-11 opacity-100 flex-col items-end bg-linear-to-t from-black/70 to-transparent group-hover:opacity-100",
        isSettingsOpen && "opacity-100",
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="relative z-20 w-full">
        <PlayerSlider
          currentTime={currentTime}
          totalTime={duration}
          onSeek={onSeek}
          onSeekEnd={onSeekEnd}
        />
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

        <div className="flex h-4 grow items-center justify-start font-['Noto_Sans'] text-xs font-medium leading-4 tabular-nums text-white">
          <span
            className="inline-block text-right"
            style={{ minWidth: `${formattedDuration.length}ch` }}
          >
            {formattedCurrentTime}
          </span>
          <span className="px-1">/</span>
          <span>{formattedDuration}</span>
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
            <PlayerSettings
              captionTracks={captionTracks}
              selectedCaptionTrack={selectedCaptionTrack}
              onSelectCaptionTrack={onSelectCaptionTrack}
              onOpenChange={setIsSettingsOpen}
            />
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
