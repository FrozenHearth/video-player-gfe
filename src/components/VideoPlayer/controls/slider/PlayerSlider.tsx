import { Slider } from "@/components/ui/slider";

export function PlayerSlider({
  currentTime,
  totalTime,
  onSeek,
  onSeekEnd,
}: {
  currentTime: number;
  totalTime: number;
  onSeek: (seconds: number) => void;
  onSeekEnd: () => void;
}) {
  return (
    <Slider
      defaultValue={[0]}
      min={0}
      max={totalTime > 0 ? totalTime : 1}
      step={0.1}
      disabled={totalTime <= 0}
      value={currentTime}
      onValueChange={(seconds) => {
        if (typeof seconds === "number") {
          onSeek(seconds);
        }
      }}
      onValueCommitted={onSeekEnd}
      className="w-full"
      controlClassName="cursor-pointer py-2 -my-2"
      trackClassName="bg-indigo-50 data-horizontal:h-1"
      indicatorClassName="bg-indigo-700"
      thumbClassName="border-none bg-indigo-700"
    />
  );
}
