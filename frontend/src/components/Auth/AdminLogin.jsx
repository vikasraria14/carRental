import React, { useEffect, useState } from "react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "../../App";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ theme,setIsLoggedIn, setUserType }) => {
  useEffect(() => {
    AOS.refresh();
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a request to the backend for authentication
      const response = await axios.post(`${host}/auth/adminlogin`, { email, password });
  
      // If authentication is successful, save user data in localStorage
      localStorage.setItem('carTap', JSON.stringify(response.data));
  
      // Show success message and navigate to the dashboard page
      await Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'Redirecting to dashboard...',
        showConfirmButton: false,
        timer: 2000,
        onClose: () => {
          navigate('/admin/carlist');
        }
      });
      navigate('/admin/carlist');
      setIsLoggedIn(true)
      setUserType("admin")
      // window.reload()
    } catch (error) {
      // Handle login error
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            // className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div 
        //   className="space-y-5 order-2 sm:order-1 sm:pr-32 "
          >
          <div className="flex justify-center items-center h-screen">
            <form
              onSubmit={handleSubmit}
              className="bg-transparent shadow-md rounded-lg p-8 max-w-sm w-full"
            >
              <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  to="/adminsignup"
                  className="text-sm text-blue-500 hover:text-blue-800 font-bold"
                >
                  Sign Up
                </Link>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
