import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import "./NowPlayingBar.css";

export default function NowPlayingBar({
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
    nextSong,
    prevSong
}) {
    if (!currentSong) return null;

    const handleSeek = (e) => seek(Number(e.target.value));

    return (
        <div className="now-playing-bar">
            <div className="song-info">
                <img src={currentSong.albumArt} alt={currentSong.title} />
                <div>
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
            </div>

            <div className="controls">
                <button onClick={prevSong}><SkipBack size={24} /></button>
                <button onClick={togglePlay}>
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button onClick={nextSong}><SkipForward size={24} /></button>
            </div>

            <div className="progress-container">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                />
            </div>
        </div>
    );
}
