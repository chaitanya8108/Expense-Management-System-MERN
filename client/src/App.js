import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Expense from "./pages/Expense";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useAuth } from "./AuthContext"; // Import the AuthContext

function App() {
  const { user, login, logout } = useAuth(); // Access user, login, and logout from context

  useEffect(() => {
    // This is no longer needed since the context manages auth state
  }, []); // Runs once when component mounts

  return (
    <>
      {/* Header is shown only if authenticated */}
      {user && <Header onLogout={logout} />}

      {/* Main Content */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/expense"
          element={
            <ProtectedRoutes>
              <Expense />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoutes>
              <Contact />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
