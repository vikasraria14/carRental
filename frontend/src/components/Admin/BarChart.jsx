import React from "react";

const DummyBarChart = ({data}) => {
  console.log("rev",data)
  // Dummy data
  // const data = [
  //   { label: "Category A", value: 20 },
  //   { label: "Category B", value: 35 },
  //   { label: "Category C", value: 50 },
  //   { label: "Category D", value: 45 },
  //   { label: "Category E", value: 30 },
  // ];

  // Calculate the maximum value for scaling
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="flex flex-col space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-20">{item.label}</div>
          <div className="bg-blue-500 h-6 rounded" style={{ width: `${(item.value / max) * 100}%` }}></div>{item.value}
        </div>
      ))}
    </div>
  );
};

export default DummyBarChart;
