import { RiArrowLeftSLine } from "react-icons/ri";

type SettingsPanelHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function SettingsPanelHeader({
  title,
  onBack,
}: SettingsPanelHeaderProps) {
  return (
    <div className="flex w-full items-center gap-3 px-4 py-3">
      <button
        type="button"
        aria-label="Back to settings"
        onClick={onBack}
        className="cursor-pointer"
      >
        <RiArrowLeftSLine className="h-5! w-5!" />
      </button>
      <span className="text-sm text-neutral-900">{title}</span>
    </div>
  );
}
