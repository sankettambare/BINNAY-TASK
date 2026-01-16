import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    description: "",
    rating: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await api.post("/movies", movie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Movie added successfully");
      navigate("/");
    } catch (error) {
      alert("Only admin can add movie", error);
    }
  };

  return (
    <div className="form">
      <h2>Add Movie</h2>

      <input name="name" placeholder="Movie Name" onChange={handleChange} />

      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        name="rating"
        placeholder="Rating"
        type="number"
        onChange={handleChange}
      />

      <button onClick={submit}>Add Movie</button>
    </div>
  );
}
