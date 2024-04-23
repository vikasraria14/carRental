import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import Swal from "sweetalert2"; // Import Swal
import { useNavigate } from "react-router-dom";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png"
// import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ theme, setTheme, navLinks, setIsLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let x = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    });
    if (x.isConfirmed) {
      setIsLoggedIn(false);
      localStorage.removeItem("carTap");
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            {theme==='light'&&<span className="text-3xl font-bold font-serif">
              <img src={logoLight} className="h-8" />{" "}
              {/* Adjust the height as needed */}
            </span>}
            {theme==='dark'&&<span className="text-3xl font-bold font-serif">
              <img src={logoDark} className="h-8" />{" "}
              {/* Adjust the height as needed */}
            </span>}
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  {link === "#" ? (
                    <button
                      onClick={handleLogout}
                      className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </button>
                  ) : (
                    <Link
                      to={link}
                      className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}
              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      {/* <ResponsiveMenu showMenu={showMenu} /> */}
    </div>
  );
};

export default Navbar;
