import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [movie, setMovie] = useState({
    name: "",
    description: "",
    rating: ""
  });

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(() => alert("Movie not found"));
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const updateMovie = async () => {
    try {
      await api.put(`/movies/${id}`, movie, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Movie updated");
      navigate("/");
    } catch {
      alert("Admin access only");
    }
  };

  return (
    <div className="form">
      <h2>Edit Movie</h2>

      <input
        name="name"
        value={movie.name}
        onChange={handleChange}
      />

      <input
        name="description"
        value={movie.description}
        onChange={handleChange}
      />

      <input
        name="rating"
        value={movie.rating}
        onChange={handleChange}
      />

      <button onClick={updateMovie}>Update Movie</button>
    </div>
  );
}
