
import React, { useEffect, useState } from "react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Swal from 'sweetalert2';
import { host } from "../../App";
import { useNavigate } from "react-router-dom";

const SignUp = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  }, []);
  const navigate= useNavigate()
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!fullName || !email || !password || !confirmPassword) {
    setError("All fields are required");
    toast.error("Password should be at least 6 characters long");
    return;
  } else if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  } else if (password.length < 6) {
    setError("Password should be at least 6 characters long");
    toast.error("Password should be at least 6 characters long");
    return;
  } else {
    // Clear error state if there are no validation errors
    setError("");
    try {
      // Handle form submission logic
      await axios.post(`${host}/auth/signUp`, { name: fullName, email, password, type: "admin" });
      // Display success message using SweetAlert
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Registration successful. Redirecting to login page...',
        showConfirmButton: false,
        timer: 2000,
        onClose: () => {
          // Redirect to the login page after registration
          navigate('/login');
        }
      });
      navigate('/adminlogin');
    } catch (error) {
      // Handle errors
      if (error.response) {
       
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error response data:", error.response.data);
        // Display the error message from the backend response using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
      }
    }
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
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="flex justify-center items-center h-screen">
              <form
                onSubmit={handleSubmit}
                className="bg-transparent shadow-md rounded-lg p-8 max-w-sm w-full"
              >
                <h2 className="text-2xl font-bold text-center mb-4">
                  Admin Sign Up
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
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
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <Link
                    to="/login"
                    className="text-sm text-blue-500 hover:text-blue-800 font-bold"
                  >
                    Sign In
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

export default SignUp;
