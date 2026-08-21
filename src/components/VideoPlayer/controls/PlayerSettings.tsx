import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  RiArrowRightSLine,
  RiHdLine,
  RiPlayCircleLine,
  RiSettings3Line,
} from "react-icons/ri";

type PlayerSettingsProps = {
  onOpenChange: (open: boolean) => void;
};

export default function PlayerSettings({
  onOpenChange,
}: PlayerSettingsProps) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button className="cursor-pointer bg-transparent!">
            <RiSettings3Line className="h-4.5 w-4.5 text-white" />
          </Button>
        }
      />
      <DropdownMenuContent
        className="w-80"
        align="center"
        side="top"
        sideOffset={-44}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex w-full justify-between gap-4 px-3.5 py-3.5">
            <span className="flex items-center gap-3">
              <RiPlayCircleLine className="h-5! w-5!" />
              <span className="text-sm text-neutral-900">Subtitles/CC</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-sm text-neutral-500">Auto generated</span>
              <RiArrowRightSLine className="h-5! w-5! text-neutral-700" />
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex w-full justify-between gap-4 px-3.5 py-3.5">
            <span className="flex items-center gap-3">
              <RiPlayCircleLine className="h-5! w-5!" />
              <span className="text-sm text-neutral-900">Playback speed</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-sm text-neutral-500">Normal</span>
              <RiArrowRightSLine className="h-5! w-5! text-neutral-700" />
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex w-full justify-between gap-4 px-3.5 py-3.5">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
