import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Movies.css";

export default function Movies() {
  const { token, loading } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [error, setError] = useState("");

  // 🔹 Fetch movies after auth is ready
  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        setError("Failed to load movies", err);
      }
    };

    fetchMovies();
  }, [token]);

  // 🔹 WAIT for auth init
  if (loading) {
    return (
      <h2 style={{ marginTop: "120px", textAlign: "center" }}>Loading...</h2>
    );
  }

  // 🔹 NOT LOGGED IN
  if (!token) {
    return (
      <h2 style={{ marginTop: "120px", textAlign: "center" }}>
        Please login to view movies
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ marginTop: "120px", textAlign: "center", color: "red" }}>
        {error}
      </h2>
    );
  }

  // 🔍 Search
  const filteredMovies = movies.filter((movie) => {
    const title = (movie.title || "").toLowerCase();
    const description = (movie.description || "").toLowerCase();
    const query = search.toLowerCase();

    return title.includes(query) || description.includes(query);
  });

  // 🔽 Sort
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "name") {
      const titleA = a.title || "";
      const titleB = b.title || "";
      return titleA.localeCompare(titleB);
    }

    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }

    if (sortBy === "release") {
      return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
    }

    if (sortBy === "duration") {
      return (b.duration || 0) - (a.duration || 0);
    }

    return 0;
  });

  return (
    <>
      {/* SEARCH + SORT */}
      <div className="movies-controls">
        <input
          className="search-input"
          placeholder="Search movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="release">Sort by Release Date</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>

      {/* MOVIES */}
      <div className="movies-container">
        {sortedMovies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
