import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RiSettings3Line } from "react-icons/ri";
import SettingsMainPanel from "./settings/SettingsMainPanel";
import SubtitlesPanel from "./settings/SubtitlesPanel";
import PlaybackSpeedPanel from "./settings/PlaybackSpeedPanel";
import QualityPanel from "./settings/QualityPanel";
import type { SettingsPanel } from "./settings/types";
import type { CaptionTrack } from "../../../youtube";

type PlayerSettingsProps = {
  captionTracks: CaptionTrack[];
  selectedCaptionTrack: CaptionTrack | null;
  onSelectCaptionTrack: (track: CaptionTrack | null) => void;
  onOpenChange: (open: boolean) => void;
};

export default function PlayerSettings({
  captionTracks,
  selectedCaptionTrack,
  onSelectCaptionTrack,
  onOpenChange,
}: PlayerSettingsProps) {
  const [activePanel, setActivePanel] = useState<SettingsPanel>("main");

  function handleOpenChange(open: boolean) {
    onOpenChange(open);
    if (!open) setActivePanel("main");
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button className="cursor-pointer bg-transparent! w-0">
            <RiSettings3Line className="h-4.5 w-4.5 text-white" />
          </Button>
        }
      />
      <DropdownMenuContent
        className="w-80 max-h-80 overflow-y-auto duration-0 data-open:animate-none"
        align="center"
        side="top"
        sideOffset={-44}
      >
        {activePanel === "main" ? (
          <SettingsMainPanel
            selectedCaptionTrack={selectedCaptionTrack}
            onSelectPanel={setActivePanel}
          />
        ) : null}
        {activePanel === "subtitles" ? (
          <SubtitlesPanel
            captionTracks={captionTracks}
            selectedCaptionTrack={selectedCaptionTrack}
            onSelectCaptionTrack={onSelectCaptionTrack}
            onBack={() => setActivePanel("main")}
          />
        ) : null}
        {activePanel === "playback-speed" ? (
          <PlaybackSpeedPanel onBack={() => setActivePanel("main")} />
        ) : null}
        {activePanel === "quality" ? (
          <QualityPanel onBack={() => setActivePanel("main")} />
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
