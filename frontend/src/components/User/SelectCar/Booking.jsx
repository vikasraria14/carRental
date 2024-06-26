import React, { useEffect, useState } from "react";
import DateRangeFilter from "./DateRange";
import Swal from "sweetalert2";
import axios from "axios";
import { host } from "../../../App";
import { useNavigate } from "react-router-dom";
const BookingPopup = ({ closePopup, car }) => {
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(0);
  const [rentalCost, setRentalCost] = useState(0);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState();
  const [isValid, setIsValid] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);
  const [validCoupon, setValidCoupon] = useState(null);
  const [bookingData, setBookingData] = useState({
    duration: 0,
    paymentDetails: "",
    deliveryAddress: "",
  });
  const [filterData, setFilterData] = useState({
    from: new Date(),
    to: new Date(),
    deliveryAddress: "",
    price: 0,
  });
  const validCoupons = [
    {
      coupon: "njit10",
      discount: 10,
    },
    {
      coupon: "njit20",
      discount: 20,
    },
    {
      coupon: "njit30",
      discount: 30,
    },
  ];

  const handleNextStep = async () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleApply = (e) => {
    e.preventDefault();
    let valid = validCoupons.find((c) => coupon === c.coupon);
    if (valid) {
      setIsValid(true);
      setValidCoupon(valid);
      let f =
        car.dailyRate * days - car.dailyRate * days * (valid.discount / 100);
      setFinalPrice(f);
    } else {
      setIsValid(false);
    }
    setApplied(true);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setApplied(false);
    setValidCoupon(null);
    setFinalPrice(null);
    setIsValid(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let carTapData = localStorage.getItem("carTap");

    // Check if data exists in localStorage
    if (carTapData) {
      // Parse the JSON data
      const parsedData = JSON.parse(carTapData);

      // Use the parsed data as needed
      carTapData = parsedData;
    } else {
      console.log("No data found in localStorage");
    }

    try {
      let final = isValid ? finalPrice : rentalCost;
      const response = await axios.post(`${host}/orders/create`, {
        startDate: filterData.from,
        endDate: filterData.to,
        carId: car._id,
        userId: carTapData._id,
        rentalCost: final,
      });

      // Handle form submission logic

      // Display success message using Swal
      await Swal.fire({
        icon: "success",
        title: "Booking Successful",
        text: "Your car has been booked successfully!",
      });
      navigate("/orders");
      // Perform further actions if needed

      // Close the popup
      closePopup();
    } catch (error) {
      // Display error message using Swal
      let text =
        error?.response?.data?.message ||
        "An error occurred while booking the car. Please try again later.";
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: text,
        // text: 'An error occurred while booking the car. Please try again later.'
      });

      console.error("Error:", error);
    }
  };

  function calculateDays(startDate, endDate) {
    // Convert both dates to milliseconds
    const startMs = new Date(startDate).getTime();
    const endMs = new Date(endDate).getTime();

    // Calculate the difference in milliseconds
    const diffMs = endMs - startMs;

    // Convert milliseconds to days
    let days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (startMs == endMs) {
      days = 1;
    }
    return days;
  }

  // Example usage:
  // const startDate = '2024-04-01';
  // const endDate = new Date(); // Current date
  // const days = calculateDays(startDate, endDate);
  // console.log('Number of days:', days);

  useEffect(() => {
    let days = calculateDays(filterData.from, filterData.to);

    setDays(days);
    setRentalCost(days * car.dailyRate);
    setBookingData({ ...bookingData, duration: days });
  }, [filterData]);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-dark">
        <h2 className="text-2xl font-bold mb-4">Book Car</h2>
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <label htmlFor="duration" className="block mb-4">
              Duration:
              {/* <ResponsiveDateRangePickers/> */}
              <DateRangeFilter setFilterData={setFilterData} />
              <br />
              {days > 0 ? (
                <div>
                  <p>Days: {days}</p>
                  <p>
                    Cost: ${car.dailyRate} x {days}days ={" "}
                    <strong>${car.dailyRate * days}</strong>
                  </p>
                </div>
              ) : (
                ""
              )}
            </label>
            <div className="flex justify-between">
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNextStep}>
            {/* <label htmlFor="paymentDetails" className="block mb-4">
              Payment Details:
              <input
                type="text"
                id="paymentDetails"
                name="paymentDetails"
                value={bookingData.paymentDetails}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter payment details"
                required
              />
            </label> */}
            <label htmlFor="deliveryAddress" className="block mb-4">
              Delivery Address:
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={bookingData.deliveryAddress}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter delivery address"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {/* {step === 3 && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="deliveryAddress" className="block mb-4">
              Coupon Code:
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter Coupon Code"
                disabled={applied}
              />
              {applied &&
                (isValid ? (
                  <div>
                    <p>coupon {coupon} applied</p>
                    <p>Discount : {validCoupon.discount}%</p>
                    <p>Final Price: ${finalPrice}</p>
                  </div>
                ) : (
                  <p className="text-red">Coupon is Invalid</p>
                ))}
              {!applied && (
                <button
                  onClick={handleApply}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              )}
              {applied && (
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )} */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="deliveryAddress" className="block mb-4">
              Coupon Code:
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
                className="border border-gray-300 rounded p-2 w-full mt-2"
                placeholder="Enter Coupon Code"
                disabled={applied}
              />
              {applied && (
                <>
                  {isValid ? (
                    <div className="mt-2">
                      <p className="text-green-500">Coupon {coupon} applied</p>
                      <p>Discount: {validCoupon.discount}%</p>
                      <p className="font-bold">Final Price: ${finalPrice}</p>
                    </div>
                  ) : (
                    <p className="text-red-500 mt-2">Coupon is Invalid</p>
                  )}
                </>
              )}
              {!applied && (
                <button
                  onClick={handleApply}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Apply
                </button>
              )}
              {applied && (
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              )}
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPopup;
