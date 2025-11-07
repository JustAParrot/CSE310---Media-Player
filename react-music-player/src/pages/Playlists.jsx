import { useState, useEffect } from "react";
import songs from "../data/songs.json";
import "./Playlists.css";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("playlists");
        if (saved) setPlaylists(JSON.parse(saved));
    }, []);

    // Save playlists automatically
    useEffect(() => {
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [playlists]);

    const createPlaylist = () => {
        if (!newPlaylistName.trim()) return;
        setPlaylists([
            ...playlists,
            { id: Date.now(), name: newPlaylistName.trim(), songIds: [] },
        ]);
        setNewPlaylistName("");
    };

    const deletePlaylist = (id) => {
        setPlaylists(playlists.filter((p) => p.id !== id));
    };

    const removeSong = (playlistId, songId) => {
        setPlaylists((prev) =>
            prev.map((p) =>
                p.id === playlistId
                    ? { ...p, songIds: p.songIds.filter((id) => id !== songId) }
                    : p
            )
        );
    };

    // Select songs to add
    const openAddSongs = (playlistId) => {
        setSelectedPlaylistId(playlistId);
    };

    const addSongToPlaylist = (playlistId, songId) => {
        setPlaylists((prev) =>
            prev.map((p) =>
                p.id === playlistId && !p.songIds.includes(songId)
                    ? { ...p, songIds: [...p.songIds, songId] }
                    : p
            )
        );
    };

    const closeSelector = () => {
        setSelectedPlaylistId(null);
    };

    return (
        <section className="playlists-page">
            <h1>🎵 Your Playlists</h1>

            <div className="create-playlist">
                <input
                    type="text"
                    placeholder="New playlist name..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <button onClick={createPlaylist}>Create +</button>
            </div>

            <div className="playlist-grid">
                {playlists.length === 0 ? (
                    <p>No playlists yet. Create one above!</p>
                ) : (
                    playlists.map((playlist) => (
                        <div key={playlist.id} className="playlist-card">
                            <h3>{playlist.name}</h3>

                            <div className="playlist-buttons">
                                <button onClick={() => openAddSongs(playlist.id)}>
                                    ➕ Add Song
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => deletePlaylist(playlist.id)}
                                >
                                    ❌ Delete
                                </button>
                            </div>

                            <ul>
                                {playlist.songIds.length === 0 ? (
                                    <li className="empty">No songs yet</li>
                                ) : (
                                    playlist.songIds.map((id) => {
                                        const song = songs.find((s) => s.id === id);
                                        return (
                                            <li key={id}>
                                                {song ? (
                                                    <>
                                                        {song.title} — <span>{song.artist}</span>
                                                        <button
                                                            className="small-delete"
                                                            onClick={() => removeSong(playlist.id, id)}
                                                        >
                                                            🗑
                                                        </button>
                                                    </>
                                                ) : (
                                                    <em>Missing Song</em>
                                                )}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </div>
                    ))
                )}
            </div>

            {/* Pop-up song selector */}
            {selectedPlaylistId && (
                <div className="song-selector">
                    <div className="selector-content">
                        <h2>Select Songs</h2>
                        <ul>
                            {songs.map((song) => (
                                <li key={song.id}>
                                    <div>
                                        <strong>{song.title}</strong> — {song.artist}
                                    </div>
                                    <button
                                        onClick={() => addSongToPlaylist(selectedPlaylistId, song.id)}
                                    >
                                        Add
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="close-btn" onClick={closeSelector}>
                            Close ✖
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
