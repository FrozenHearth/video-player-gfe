import {
  RiClosedCaptioningFill,
  RiFullscreenLine,
  RiPictureInPictureFill,
  RiPlayFill,
  RiSettings3Line,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiVolumeMuteFill,
} from "react-icons/ri";

export default function PlayerControls() {
  return (
    <section className="absolute inset-x-0 bottom-0 flex flex-col h-11 items-end bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100">
      <div className="flex items-center self-stretch bg-indigo-50">
        <div className="w-25 h-1 bg-indigo-700"></div>
      </div>
      <footer className="flex w-full h-full px-4 items-center">
        <aside className="flex gap-1.5 pr-4">
          <div className="flex justify-center items-center gap-2 rounded">
            <RiSkipBackFill className="text-white w-4.5 h-4.5" />
          </div>
          <div className="flex justify-center items-center gap-2 rounded">
            <RiPlayFill className="text-white w-4.5 h-4.5" />
          </div>
          <div className="flex justify-center items-center gap-2 rounded">
            <RiSkipForwardFill className="text-white w-4.5 h-4.5" />
          </div>
        </aside>
        <div className="flex pr-4">
          <RiVolumeMuteFill className="text-white w-4.5 h-4.5" />
        </div>
        <div className="flex items-center grow h-4.5">
          <span className="font-medium text-xs text-white">1:48 / 3:24</span>
        </div>
        <aside className="flex gap-2">
          <div className="flex justify-center items-center gap-2 rounded">
            <RiClosedCaptioningFill className="text-white w-4.5 h-4.5" />
          </div>
          <div className="flex justify-center items-center gap-2 rounded">
            <RiSettings3Line className="text-white w-4.5 h-4.5" />
          </div>
          <div className="flex justify-center items-center gap-2 rounded">
            <RiPictureInPictureFill className="text-white w-4.5 h-4.5" />
          </div>
          <div className="flex justify-center items-center gap-2 rounded">
            <RiFullscreenLine className="text-white w-4.5 h-4.5" />
          </div>
        </aside>
      </footer>
    </section>
  );
}
