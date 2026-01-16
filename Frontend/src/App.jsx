import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddMovie from "./pages/AddMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import EditMovie from "./pages/EditMovie.JSX";
import Register from "./Register";
import Movies from "./pages/Movies";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          }
        />
        import EditMovie from "./pages/EditMovie";
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
