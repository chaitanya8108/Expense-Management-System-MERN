import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { message } from "antd";
import ErrorBoundary from "../../utils/ErrorBoundary";
import "../../styles/Header.css";

const Header = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUser, setLoginUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // Profile dropdown state for large devices
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null); // Reference for the profile dropdown
  const hamburgerMenuRef = useRef(null); // Reference for the hamburger menu
  const logoutIconRef = useRef(null); // Reference for Logout's Lordicon
  const aboutIconRef = useRef(null); // Reference for About Lordicon
  const lordIconStyles = { width: "3rem", height: "3rem", cursor: "pointer" };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
      setLoginUserName(user.name); // Update the loginUserName state
    }

    // Close the profile dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
        setMenuOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [localStorage.getItem("user")]); // This will run once when the component mounts
  // The empty array means the effect runs only on mount

  const logoutHandler = () => {
    // Close all menus
    setMenuOpen(false);
    setProfileDropdownOpen(false);

    // Remove user and navigate after menu state updates
    setTimeout(() => {
      localStorage.removeItem("user");
      message.success("Logout Successfully");
      navigate("/login");
    }, 100); // Add slight delay to ensure state updates before navigation
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMouseEvent = (ref, eventType) => {
    if (ref.current) {
      ref.current.dispatchEvent(new MouseEvent(eventType)); // Dispatch event dynamically
    }
  };

  return (
    <nav className="navbar">
      <div className="brandLogo">
        {/* Brand Logo */}
        <Link to="/">
          <h1 className="brand-logo text-white text-lg font-serif">
            <span className="text-green-500">{`<`}</span>{" "}
            <span className="text-gray-500">{`E/PENSE`}</span>{" "}
            <span className="text-green-500">{`/>`}</span>{" "}
          </h1>
        </Link>

        {/* Hamburger Menu for Small and Medium Devices */}
        <div className="lg:hidden" ref={hamburgerMenuRef}>
          <button
            className="text-gray-500 hover:text-black"
            onClick={handleHamburgerClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navbar Links */}
        <ul className="hidden lg:flex items-center xl:mr-4">
          <Link to="/expense">
            <li className="flex mx-2 p-2 rounded text-gray-500 hover:text-black font-serif">
              <ErrorBoundary>
                <lord-icon
                  src="https://cdn.lordicon.com/jtiihjyw.json"
                  trigger="loop"
                  state="loop-spin"
                  style={lordIconStyles}
                ></lord-icon>
              </ErrorBoundary>
            </li>
          </Link>
          <Link to="/contact">
            <li className="flex mx-2 p-2 rounded text-gray-500 hover:text-black font-serif">
              <ErrorBoundary>
                <lord-icon
                  src="https://cdn.lordicon.com/nqisoomz.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#faddd1,tertiary:#109121,quaternary:#3a3347"
                  style={lordIconStyles}
                ></lord-icon>
              </ErrorBoundary>
            </li>
          </Link>

          {/* Profile Dropdown for Large Devices */}
          <div className="relative ml-4 mr-4 z-50" ref={profileDropdownRef}>
            <button
              className="flex items-center space-x-2"
              onClick={handleProfileClick}
            >
              <ErrorBoundary>
                <lord-icon
                  src="https://cdn.lordicon.com/roybxdwv.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#0a5c15,tertiary:#eeaa66,quaternary:#848484,quinary:#ffc738,senary:#3a3347"
                  style={lordIconStyles}
                ></lord-icon>
              </ErrorBoundary>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2">
                <p className="px-4 py-2 text-gray-700 font-serif border-b-2 text-center">
                  {loginUser.name}
                </p>
                <Link
                  to="/about"
                  className="p-0"
                  onMouseEnter={() =>
                    handleMouseEvent(aboutIconRef, "mouseenter")
                  }
                  onMouseLeave={() =>
                    handleMouseEvent(aboutIconRef, "mouseleave")
                  }
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="flex rounded my-[0.5rem] flex-row justify-start items-center text-gray-500 hover:text-black font-serif border-b-2">
                    <ErrorBoundary>
                      <lord-icon
                        ref={aboutIconRef}
                        src="https://cdn.lordicon.com/hiazjcik.json"
                        trigger="hover"
                        state="hover-roll"
                        colors="primary:#0a5c49,secondary:#109121"
                        style={lordIconStyles}
                      ></lord-icon>
                    </ErrorBoundary>
                    <span className="text-gray-500 hover:text-black">
                      About
                    </span>
                  </div>
                </Link>
                <button
                  className="flex flex-row justify-center items-center mt-[0.5rem]"
                  onClick={logoutHandler}
                  onMouseEnter={() =>
                    handleMouseEvent(logoutIconRef, "mouseenter")
                  }
                  onMouseLeave={() =>
                    handleMouseEvent(logoutIconRef, "mouseleave")
                  }
                >
                  <ErrorBoundary>
                    <lord-icon
                      ref={logoutIconRef}
                      src="https://cdn.lordicon.com/eoacwhtz.json"
                      trigger="hover"
                      style={lordIconStyles}
                    ></lord-icon>
                  </ErrorBoundary>
                  <span className="text-gray-500 hover:text-black font-serif">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>

      {/* Hamburger Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden mt-2 bg-gray-100 rounded-md shadow-md">
          {/* Profile Section for Small/Medium Devices */}
          <div className="p-4 border-b flex items-center space-x-2">
            <ErrorBoundary>
              <lord-icon
                src="https://cdn.lordicon.com/amtdygnu.json"
                trigger="hover"
                style={lordIconStyles}
              ></lord-icon>
            </ErrorBoundary>
            <span className="text-gray-700 font-serif">{loginUserName}</span>
          </div>

          <ul>
            <li>
              <Link to="/expense" onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-2 text-gray-500 hover:bg-gray-200 hover:text-black font-serif">
                  <b>Expenses</b>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-2 text-gray-500 hover:bg-gray-200 hover:text-black font-serif">
                  <b>About</b>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                <div className="px-4 py-2 text-gray-500 hover:bg-gray-200 hover:text-black font-serif">
                  <b>Contact</b>
                </div>
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="px-4 py-2 text-gray-500 hover:bg-gray-200 hover:text-black font-serif"
              >
                <b>Logout</b>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
