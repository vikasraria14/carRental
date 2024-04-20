import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { host } from "../../App";
import axios from "axios";

const Add = ({
  data,
  setdata,
  setIsAdding,
  columns,
  endpoint,
  title,
  selectedMonth,
  selectedYear,
}) => {
  let x = {};
  columns.map((column) => (x[column.field] = ""));
  const [empData, setEmpData] = useState(x);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fun = async () => {
      const res = await axios.get(`${host}/category`);
      setCategories(res.data);
      setEmpData({ ...empData, categories: res?.data[0] });
    };
    // fun();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      let finalData = { ...empData, month: selectedMonth, year: selectedYear };
      let res = await axios.post(`${host}/${endpoint}`, finalData);

      data.push(res.data);
      setdata(data);
      setIsAdding(false);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: ` data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error during API request:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add data. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleEmp = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleAdd} className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Add {title}</h1>
        {columns.map((column, i) => (
          <div key={i} className="mb-4">
            <label
              htmlFor={column.field}
              className="block text-sm font-bold mb-1"
            >
              {column.label}
            </label>

            {column.type === "select" ? (
              <select
                name={column.field}
                id={column.field}
                value={empData[column.field]}
                onChange={(e) => handleEmp(e)}
                className="dark:text-black block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Category</option>
                {categories.map((option, index) => (
                  <option key={index + 1} value={option.category}>
                    {option.category}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={column.field}
                type={column.type}
                name={column.field}
                value={empData[column.field]}
                onChange={(e) => handleEmp(e)}
                className="dark:text-black block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            )}
          </div>
        ))}

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
