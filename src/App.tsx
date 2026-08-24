import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

const VIDEO_ID = "M7FIvfx5J10";

function App() {
  return (
    <main className="flex h-screen items-center justify-center">
      <VideoPlayer videoId={VIDEO_ID} />
    </main>
  );
}

export default App;
