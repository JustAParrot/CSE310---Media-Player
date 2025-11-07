import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Playlists from "./pages/Playlists";
import NowPlayingBar from "./components/NowPlayingBar";
import songs from "./data/songs.json";
import "./App.css";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  // Auto-play when a song is selected
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSongIndex]);

  // Automatically play next song when one ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      nextSong();
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentSongIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const seek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const nextSong = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) =>
      prev === null ? 0 : (prev + 1) % songs.length
    );
  };

  const prevSong = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) =>
      prev === null ? 0 : (prev - 1 + songs.length) % songs.length
    );
  };

  return (
    <Router>
      <nav className="nav">
        <h2>🎵 React Music Player</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/player">Player</Link></li>
          <li><Link to="/playlists">Playlists</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home setCurrentSongIndex={setCurrentSongIndex} />}
          />
          <Route
            path="/player"
            element={
              <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                progress={progress}
                duration={duration}
                togglePlay={togglePlay}
                seek={seek}
              />
            }
          />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </main>

      <audio ref={audioRef} src={currentSong?.src}></audio>

      <NowPlayingBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        togglePlay={togglePlay}
        seek={seek}
        nextSong={nextSong}
        prevSong={prevSong}
      />
    </Router>
  );
}

export default App;
