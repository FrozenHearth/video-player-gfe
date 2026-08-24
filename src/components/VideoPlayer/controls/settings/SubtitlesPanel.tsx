import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RiCheckboxCircleFill } from "react-icons/ri";
import SettingsPanelHeader from "./SettingsPanelHeader";
import type { CaptionTrack } from "../../../../youtube";
import { cn } from "@/lib/utils";

type SubtitlesPanelProps = {
  captionTracks: CaptionTrack[];
  selectedCaptionTrack: CaptionTrack | null;
  onSelectCaptionTrack: (track: CaptionTrack | null) => void;
  onBack: () => void;
};

export default function SubtitlesPanel({
  captionTracks,
  selectedCaptionTrack,
  onSelectCaptionTrack,
  onBack,
}: SubtitlesPanelProps) {
  const captionsOff = selectedCaptionTrack === null;

  return (
    <DropdownMenuGroup>
      <SettingsPanelHeader title="Subtitles/CC" onBack={onBack} />
      <section className="px-3">
        <DropdownMenuSeparator />
      </section>
      <DropdownMenuItem
        closeOnClick={false}
        className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1"
        onClick={() => onSelectCaptionTrack(null)}
      >
        <span
          className={cn(
            "flex items-center gap-3 w-full p-2",
            captionsOff && "bg-gray-50 rounded-md justify-between",
          )}
        >
          <span className="text-sm text-neutral-900">Off</span>
          {captionsOff ? <RiCheckboxCircleFill className="h-5! w-5!" /> : null}
        </span>
      </DropdownMenuItem>
      {captionTracks.map((track) => {
        const isSelected =
          selectedCaptionTrack?.languageCode === track.languageCode;

        return (
          <DropdownMenuItem
            key={track.languageCode}
            closeOnClick={false}
            className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1"
            onClick={() => onSelectCaptionTrack(track)}
          >
            <span
              className={cn(
                "flex items-center gap-3 rounded-md p-2 w-full",
                isSelected && "bg-gray-50 justify-between",
              )}
            >
              <span className="text-sm text-neutral-900">
                {track.languageName}
              </span>
              {isSelected ? (
                <RiCheckboxCircleFill className="h-5! w-5!" />
              ) : null}
            </span>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
