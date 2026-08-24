import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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

const MAX_MENU_HEIGHT = 320;

const PANEL_WIDTH = {
  main: 320,
  subtitles: 256,
  "playback-speed": 256,
  quality: 256,
};

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
  const [menuHeight, setMenuHeight] = useState<number>();
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    setMenuHeight(Math.min(panel.scrollHeight, MAX_MENU_HEIGHT));
  }, [activePanel, captionTracks]);

  function handleOpenChange(open: boolean) {
    onOpenChange(open);
    if (!open) setActivePanel("main");
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button className="cursor-pointer bg-transparent!">
            <RiSettings3Line className="h-4.5 w-4.5 text-white" />
          </Button>
        }
      />
      <DropdownMenuContent
        className={cn(
          "p-0 duration-0 data-open:animate-none",
          menuHeight === MAX_MENU_HEIGHT
            ? "overflow-x-hidden overflow-y-auto"
            : "overflow-hidden",
        )}
        align="end"
        side="top"
        sideOffset={-44}
        style={{
          width: PANEL_WIDTH[activePanel],
          maxHeight: MAX_MENU_HEIGHT,
          transition: "width 150ms ease, height 150ms ease",
        }}
      >
        <div ref={panelRef}>
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
