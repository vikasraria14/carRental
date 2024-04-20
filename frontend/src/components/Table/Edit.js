import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { host } from "../../App";

const Edit = ({
  data,
  selectedData,
  setdata,
  setIsEditing,
  columns,
  endpoint,
  title,
  selectedMonth,
  selectedYear,
}) => {
  const id = selectedData.id;
  let x = {};
  columns.map((column) => {
    return (x[column.field] = selectedData[column.field]);
  });
  const [empData, setEmpData] = useState(x);
  const [categories, setCategories] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let finalData = { ...empData, month: selectedMonth, year: selectedYear };
      const res = await axios.put(
        `${host}/${endpoint}/${selectedData._id}`,
        finalData
      );

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1, res.data);
          break;
        }
      }
      setdata(data);
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error during API request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update data. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleEmp = (e) => {
    const updatedValue = e.target.value;
    setEmpData({ ...empData, [e.target.name]: updatedValue });
  };

  useEffect(() => {
    setCategories([
      {category:"request placed"},
      {category:"car ready for pickup"},
      {category:"car delivered"},
      {category:"car returned"}
    ])
  }, []);

  return (
    <div className="container mx-auto">
      <form className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Edit {title}</h1>
        {columns.map((column, i) => (
          !column.editable &&<div key={i} className="mb-4">
            <label htmlFor={column.field} className="block text-sm font-bold">
              {column.label}
            </label>
            {column.type === "select" ? (
              <select
                name={column.field}
                id={column.field}
                value={empData[column.field]} // Set the value attribute for the selected option
                onChange={(e) => handleEmp(e)}
                className=" dark:text-black block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {categories.map((option, index) => (
                  <option key={index} value={option.category}>
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
            onClick={(e) => handleUpdate(e)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
