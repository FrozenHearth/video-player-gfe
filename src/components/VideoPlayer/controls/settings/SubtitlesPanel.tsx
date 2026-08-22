import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RiCheckboxCircleFill } from "react-icons/ri";
import SettingsPanelHeader from "./SettingsPanelHeader";

type SubtitlesPanelProps = {
  onBack: () => void;
};

export default function SubtitlesPanel({ onBack }: SubtitlesPanelProps) {
  return (
    <DropdownMenuGroup>
      <SettingsPanelHeader title="Subtitles/CC" onBack={onBack} />
      <section className="px-3">
        <DropdownMenuSeparator />
      </section>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 w-full p-2">
          <span className="text-sm text-neutral-900">Off</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 bg-gray-50 rounded-md p-2 w-full justify-between">
          <span className="text-sm text-neutral-900">
            English (Auto generated)
          </span>
          <RiCheckboxCircleFill className="h-5! w-5!" />
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-3">
        <span className="flex items-center gap-3 rounded-md p-2 w-full">
          <span className="text-sm text-neutral-900">Malay</span>
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
