import { useRef, useState, useEffect } from "react";
import "./PlayerControls.css";

export default function PlayerControls({ currentSong }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Update progress bar
    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };
        audio.addEventListener("timeupdate", updateProgress);
        return () => audio.removeEventListener("timeupdate", updateProgress);
    }, []);

    // Auto-play when song changes
    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSong]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="player-controls">
            {currentSong ? (
                <>
                    <img src={currentSong.albumArt} alt={currentSong.title} />
                    <h2>{currentSong.title}</h2>
                    <p>{currentSong.artist}</p>
                    <audio ref={audioRef} src={currentSong.src} />
                    <div className="controls">
                        <button onClick={togglePlay}>
                            {isPlaying ? "⏸ Pause" : "▶ Play"}
                        </button>
                    </div>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </>
            ) : (
                <p>No song selected</p>
            )}
        </div>
    );
}
