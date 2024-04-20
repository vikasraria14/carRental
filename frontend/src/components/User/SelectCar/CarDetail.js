import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { host } from "../../../App";
import BookingPopup from "./Booking";
import Swal from "sweetalert2";

const CarDetail = ({ theme }) => {
  const [car, setCar] = useState({});
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${host}/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleBooking = () => {
    setShowBookingPopup(true);
  };

  const closeBookingPopup = () => {
    setShowBookingPopup(false);
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[600px] flex">
        {/* Car Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="zoom-in" data-aos-duration="1500">
            <img
              // src={theme === "dark" ? car2 : car2}
              src={`${host}/uploads/${car.image}`}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          {/* Car Details and Booking Button */}
          <div>
            <div className="flex justify-center items-center h-screen">
              <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Car Details</h1>
                <h2 className="text-xl font-semibold">
                  {car.make} {car.model}
                </h2>
                <div>
                  <p>
                    <strong>Make:</strong> {car.make}
                  </p>
                  <p>
                    <strong>Model:</strong> {car.model}
                  </p>
                  <p>
                    <strong>Year:</strong> {car.year}
                  </p>
                  <p>
                    <strong>Rate:</strong> ${car.dailyRate}/day
                  </p>
                  <p>
                    <strong>Available Quantity:</strong> {car.availableQuantity}
                  </p>
                  <p>
                    <strong>Fuel Type:</strong> {car.fuelType}
                  </p>
                  <p>
                    <strong>Transmission:</strong> {car.transmission}
                  </p>
                  <p>
                    <strong>Seating Capacity:</strong> {car.seatingCapacity}
                  </p>
                  
                  <p>
                    <strong>Mileage:</strong> {car.mileage}mpl
                  </p>
                  <p>
                    <strong>Engine Size:</strong> {car.engineSize}
                  </p>
                  <p>
                    <strong>Registration Number:</strong>{" "}
                    {car.registrationNumber}
                  </p>
                  <p>
                    <strong>Insurance Provider:</strong> {car.insuranceProvider}
                  </p>
                  
                </div>

                <button
                  onClick={handleBooking}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Popup */}
      {/* {showBookingPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Book Car</h2>
            <button onClick={closeBookingPopup}>Close</button>
          </div>
        </div>
      )} */}
      {showBookingPopup && <BookingPopup closePopup={closeBookingPopup} car={car} />}
    </div>
  );
};

export default CarDetail;
