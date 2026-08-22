import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RiArrowRightSLine, RiHdLine, RiPlayCircleLine } from "react-icons/ri";
import type { SettingsPanel } from "./types";

type SettingsMainPanelProps = {
  onSelectPanel: (panel: SettingsPanel) => void;
};

export default function SettingsMainPanel({
  onSelectPanel,
}: SettingsMainPanelProps) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem
        closeOnClick={false}
        onClick={() => onSelectPanel("subtitles")}
        className="cursor-pointer flex w-full justify-between gap-4 px-3.5 py-3.5"
      >
        <span className="flex items-center gap-3">
          <RiPlayCircleLine className="h-5! w-5!" />
          <span className="text-sm text-neutral-900">Subtitles/CC</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-neutral-500">Auto generated</span>
          <RiArrowRightSLine className="h-5! w-5! text-neutral-700" />
        </span>
      </DropdownMenuItem>

      <DropdownMenuItem
        closeOnClick={false}
        onClick={() => onSelectPanel("playback-speed")}
        className="cursor-pointer flex w-full justify-between gap-4 px-3.5 py-3.5"
      >
        <span className="flex items-center gap-3">
          <RiPlayCircleLine className="h-5! w-5!" />
          <span className="text-sm text-neutral-900">Playback speed</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-neutral-500">Normal</span>
          <RiArrowRightSLine className="h-5! w-5! text-neutral-700" />
        </span>
      </DropdownMenuItem>

      <DropdownMenuItem
        closeOnClick={false}
        onClick={() => onSelectPanel("quality")}
        className="cursor-pointer flex w-full justify-between gap-4 px-3.5 py-3.5"
      >
        <span className="flex items-center gap-3">
          <RiHdLine className="h-5! w-5!" />
          <span className="text-sm text-neutral-900">Quality</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-neutral-500">1440p</span>
          <RiArrowRightSLine className="h-5! w-5! text-neutral-700" />
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
