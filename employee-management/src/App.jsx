import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import RegistrationPage from "./RegistrationPage.jsx";
import DetailsPage from "./DetailsPage.jsx";
import LoginPage from "./LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SignupPage from "./SignupPage.jsx";
import "./App.css";

function App() {
  const { token, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav className="navbar">
        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/">Registration</Link>
            <Link to="/details">Details</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        {/* Show login first */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />


        {/* Protect other routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
