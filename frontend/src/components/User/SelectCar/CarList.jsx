import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { host } from "../../../App";
import { Link } from "react-router-dom";

// const carList = [
//   {
//     name: "BMW UX",
//     price: 100,
//     image: whiteCar,
//     aosDelay: "0",
//   },
//   {
//     name: "KIA UX",
//     price: 140,
//     image: car2,
//     aosDelay: "500",
//   },
//   {
//     name: "BMW UX",
//     price: 100,
//     image: car3,
//     aosDelay: "1000",
//   },
// ];

const CarList = () => {
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    async function fun() {
      let carData = await axios.get(`${host}/cars`);
      setCarList(carData.data);
      console.log("adsfd", carData);
    }
    fun();
  }, []);
  return (
    <div className="pb-24 overflow-hidden">
      <div className="container">
        {/* Heading */}
        
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <Link
                key={data.id}
                to={{
                  pathname: `/car-details/${data._id}`,
                  state: { car: data }, // Pass car data as state
                }}
              >
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
                >
                  <div className="w-full h-[120px]">
                    <img
                      // src={car2}
                      src={`${host}/uploads/${data.image}`}
                      alt={`${data.make} ${data.model}`}
                      className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-primary font-semibold">
                      {data.make} {data.model}
                    </h1>
                    <div className="flex justify-between items-center text-xl font-semibold">
                      <p>${data.dailyRate}/Day</p>
                      <span className="text-blue-500 hover:text-blue-700">
                        Details
                      </span>
                    </div>
                  </div>
                  <p className="text-xl font-semibold absolute top-0 left-3">
                    {data.availableQuantity} left
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        
      </div>
    </div>
  );
};

export default CarList;
