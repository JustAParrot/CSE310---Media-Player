import PlayerControls from "../components/PlayerControls";
import { Play, Pause } from "lucide-react";
import "./Player.css";

export default function Player({
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
}) {
    if (!currentSong) {
        return (
            <section className="player-page">
                <h1>No song selected 🎵</h1>
            </section>
        );
    }

    const handleSeek = (e) => {
        seek(Number(e.target.value));
    };

    return (
        <section className="player-page">
            <h1>
                Now Playing <span role="img" aria-label="notes">🎶</span>
            </h1>
            <div className="player-controls">
                <img src={currentSong.albumArt} alt={currentSong.title} />
                <h2>{currentSong.title}</h2>
                <p>{currentSong.artist}</p>

                <button onClick={togglePlay}>
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>

                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                    className="player-slider"
                />
            </div>
        </section>
    );
}
