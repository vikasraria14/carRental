import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({
  setFilterData,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const handleDateChange = (date) => {
    if (date[0] && date[1]) {
      const endDateTime = new Date(new Date(date[1]).setHours(23, 59, 0, 0));
      setEndDate(date[1]);
      setFilterData((filterData) => ({ ...filterData, to: endDateTime }));
    } else {
      setEndDate(null);
      setFilterData((filterData) => ({ ...filterData, to: null }));
    }
    const startDateTime = new Date(new Date(date[0]).setHours(0, 0, 0, 0));
    setStartDate(date[0]);
    setFilterData((filterData) => ({ ...filterData, from: startDateTime }));

    
      let m1 = date[0]?.getTime() + 6 * 24 * 60 * 60 * 1000;
      m1 = m1 > new Date()?.getTime() ? new Date() : new Date(m1);
      setMaxDate(m1);
    
  };

  return (
    <DatePicker
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      minDate={new Date()}
      // maxDate={maxDate}
      // isClearable
      dateFormat={"dd/MM/yyyy"}
      className="border border-gray-300 rounded p-2 w-full"
    />
  );
};

export default DateRangeFilter;
