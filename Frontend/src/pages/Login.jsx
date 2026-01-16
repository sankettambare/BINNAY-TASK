import api from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      console.log("ROLE FROM BACKEND:", res.data.role);

      login(res.data.token, res.data.role);

      if (res.data.role?.toLowerCase() === "admin") {
        navigate("/add-movie");
      } else {
        navigate("/movies");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}
