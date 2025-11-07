import { useNavigate } from "react-router-dom";
import "./SongCard.css";

export default function SongCard({ song, index, setCurrentSongIndex }) {
  const handlePlay = () => setCurrentSongIndex(index);

  return (
    <div className="song-card">
      <img src={song.albumArt} alt={song.title} />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={handlePlay}>Play ▶</button>
    </div>
  );
}

