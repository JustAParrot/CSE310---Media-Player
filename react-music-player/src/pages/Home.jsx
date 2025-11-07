import songs from "../data/songs.json";
import SongCard from "../components/SongCard";
import "./Home.css";

export default function Home({ setCurrentSongIndex }) {
  return (
    <section className="home">
      <h1>🎧 Browse Songs</h1>
      <div className="song-list">
        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            index={index}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        ))}
      </div>
    </section>
  );
}
