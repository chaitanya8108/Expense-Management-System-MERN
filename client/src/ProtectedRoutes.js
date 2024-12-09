import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorBoundary from "./utils/ErrorBoundary";

export function ProtectedRoutes({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    // Simulate authentication check delay
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <ErrorBoundary>
          <lord-icon
            src="https://cdn.lordicon.com/idylhtwd.json"
            trigger="loop"
            stroke="bold"
            state="loop-cycle"
            colors="primary:#16c72e,secondary:#d1fad7"
            style={{ width: "50px", height: "50px" }}
          ></lord-icon>
        </ErrorBoundary>
      </div>
    ); // Loading state to show while checking auth status
  }

  if (user) {
    return children; // Render the protected content if the user is authenticated
  } else {
    return <Navigate to="/login" />; // Redirect to login page if the user is not authenticated
  }
}
