import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RiCheckboxCircleFill } from "react-icons/ri";
import SettingsPanelHeader from "./SettingsPanelHeader";

type PlaybackSpeedPanelProps = {
  onBack: () => void;
};

export default function PlaybackSpeedPanel({
  onBack,
}: PlaybackSpeedPanelProps) {
  return (
    <DropdownMenuGroup>
      <SettingsPanelHeader title="Playback speed" onBack={onBack} />
      <section className="px-3">
        <DropdownMenuSeparator />
      </section>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 rounded-md p-2 w-full justify-between">
          <span className="text-sm text-neutral-900">0.25</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 rounded-md p-2 w-full justify-between">
          <span className="text-sm text-neutral-900">0.5</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 rounded-md p-2 w-full justify-between">
          <span className="text-sm text-neutral-900">0.75</span>
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer flex w-full justify-between gap-4 px-2 py-1">
        <span className="flex items-center gap-3 bg-gray-50 rounded-md p-2 w-full justify-between">
          <span className="text-sm text-neutral-900">Normal</span>
          <RiCheckboxCircleFill className="h-5! w-5!" />
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
