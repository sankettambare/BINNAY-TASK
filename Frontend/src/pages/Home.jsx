import api from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const { role, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/movies").then((res) => setMovies(res.data));
  }, []);

  // ✅ DELETE MOVIE
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await api.delete(`/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMovies(movies.filter((m) => m._id !== id));
  };

  return (
    <div className="container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <div className="rating">⭐ {movie.rating || "N/A"}</div>

            <div className="movie-poster">🎬</div>

            <div className="movie-info">
              <h3>{movie.name}</h3>
              <p>{movie.description}</p>

              {role === "admin" && (
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => navigate(`/edit/${movie._id}`)}
                  >
                    Edit
                  </button>

                  <button className="delete" onClick={() => del(movie._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
