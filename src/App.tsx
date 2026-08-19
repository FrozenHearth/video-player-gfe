import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

const VIDEO_ID = "OjHbS-_nncw";

function App() {
  return (
    <main className="flex h-screen items-center justify-center">
      <VideoPlayer videoId={VIDEO_ID} />
    </main>
  );
}

export default App;
