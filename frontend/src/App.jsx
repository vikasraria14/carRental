import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Navbar from "./components/Navbar/Navbar";
import AdminLogin from "./components/Auth/AdminLogin";
import CarDetailPage from "./components/User/SelectCar/CarDetail";
import CarTable from "./components/Admin/CarTable";
import CarList from "./components/User/SelectCar/CarList";
import UserOrder from "./components/User/Order/UserOrder";
import AdminSignup from "./components/Auth/AdminSignUp";
import AdminOrders from "./components/Admin/Orders";
import Dashboard from "./components/Admin/Dashboard";
export const host = "http://localhost:9000";

const App = () => {
  // Set up authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); // User type: admin, user, etc.
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  useEffect(() => {
    // Retrieve user type from localStorage
    const user = JSON.parse(localStorage.getItem("carTap"));
    if (user && user.token) {
      // isLoggedIn = true;
      // userRole = user.role;
      setIsLoggedIn(true);
      setUserType(user.role);
    } else {
      // isLoggedIn = false;
      // userRole = "";
      setIsLoggedIn(false);
      setUserType("");
    }
  }, []);

  let navLinks = [];
  if (isLoggedIn) {
    if (userType === "admin") {
      navLinks = [
        // { id: 1, name: "HOME", link: "/" },
        { id: 4, name: "Dashboard", link: "/admin/dashboard" },
        { id: 3, name: "Cars", link: "/admin/carlist" },
        { id: 2, name: "Orders", link: "/admin/orders" },

        { id: 5, name: "Logout", link: "#" },
      ];
    } else {
      navLinks = [
        // { id: 1, name: "HOME", link: "/" },
        { id: 4, name: "Cars", link: "/carlist" },
        { id: 2, name: "Orders", link: "/orders" },
        { id: 3, name: "Logout", link: "#" },
      ];
    }
  } else {
    navLinks = [
      { id: 1, name: "HOME", link: "/" },
      { id: 2, name: "Login", link: "/login" },
      { id: 3, name: "Sign Up", link: "/signup" },
      { id: 4, name: "Admin Login", link: "/adminlogin" },
      { id: 5, name: "Admin Signup", link: "/adminsignup" },
    ];
  }

  // Dark mode setup
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  if (isLoggedIn) {
    if (userType === "user") {
      // Render components for logged-in user
      return (
        <Router>
          <Navbar
            theme={theme}
            setTheme={setTheme}
            navLinks={navLinks}
            setIsLoggedIn={setIsLoggedIn}
          />
          <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
            <Routes>
              <Route path="/car-details/:id" element={<CarDetailPage />} />
              <Route path="/carlist" element={<CarList />} />
              <Route path="/orders" element={<UserOrder />} />
              <Route
                path="/"
                element={<LandingPage theme={theme} setTheme={setTheme} />}
              />
            </Routes>
          </div>
        </Router>
      );
    } else {
      // Render components for admin
      return (
        <Router>
          <Navbar
            theme={theme}
            setTheme={setTheme}
            navLinks={navLinks}
            setIsLoggedIn={setIsLoggedIn}
          />
          <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
            <Routes>
              <Route
                path="/admin/carlist"
                element={<CarTable theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/admin/dashboard"
                element={<Dashboard />}
              />
              <Route path="/admin/orders" element={<AdminOrders />} />

              <Route
                path="/"
                element={<LandingPage theme={theme} setTheme={setTheme} />}
              />
            </Routes>
          </div>
        </Router>
      );
    }
  } else {
    // Render components for not logged in
    return (
      <Router>
        <Navbar
          theme={theme}
          setTheme={setTheme}
          navLinks={navLinks}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
          <Routes>
            <Route
              path="/adminlogin"
              element={
                <AdminLogin
                  theme={theme}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginForm
                  theme={theme}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                />
              }
            />
            <Route path="/signup" element={<SignUp theme={theme} />} />
            <Route
              path="/adminsignup"
              element={<AdminSignup theme={theme} />}
            />
            <Route
              path="/"
              element={<LandingPage theme={theme} setTheme={setTheme} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
};

export default App;
