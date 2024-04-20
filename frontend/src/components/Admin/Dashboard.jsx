import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../App";
// import BarChart from "./BarChart"; // Import your chart components
import BarChart from "./BarChart1";
// import PieChart from "./PieChart";

const Dashboard = () => {
  // const [revenueData, setRevenueData] = useState(null);
  // const [popularDurationsData, setPopularDurationsData] = useState(null);
  const [mostRentedCarsData, setMostRentedCarsData] = useState(null);
  const [monthlyRevenueTrendData, setMonthlyRevenueTrendData] = useState(null);
  const [userRevenue, setUserRevenue] = useState(null);
  const fetchData = async () => {
    try {
      // const revenueResponse = await axios.get(`${host}/stats/revenue`);
      // setRevenueData(revenueResponse.data);

      // const popularDurationsResponse = await axios.get(
      //   `${host}/stats/popularRentalDurations`
      // );
      // setPopularDurationsData(popularDurationsResponse.data);

      const mostRentedCarsResponse = await axios.get(
        `${host}/stats/mostRentedCars`
      );
      setMostRentedCarsData(mostRentedCarsResponse.data);

      const monthlyRevenueTrendResponse = await axios.get(
        `${host}/stats/monthlyRevenueTrend`
      );
      setMonthlyRevenueTrendData(monthlyRevenueTrendResponse.data);
      const userRev = await axios.get(`${host}/stats/userRevenue`);
      setUserRevenue(userRev.data);
      await axios.get(`${host}/stats/userActivity`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-2 gap-4">
      <div className="border p-4">
        {mostRentedCarsData && (
          <BarChart
            data={mostRentedCarsData}
            heading={"Most Rented Cars"}
            title={"Count"}
            legend={"Cars"}
          />
        )}
      </div>
      <div className="border p-4">
        {userRevenue && (
          <BarChart
            data={userRevenue}
            heading={"User Revenue"}
            title={"Revenue"}
            legend={"Users"}
          />
        )}
      </div>
      <div className="border p-4">
        {monthlyRevenueTrendData && (
          <BarChart
            data={monthlyRevenueTrendData}
            heading={"Monthly Revenue"}
            title={"Revenue"}
            legend={"Months"}
          />
        )}
      </div>
      <div className=" p-4"></div>
    </div>
  );
};

export default Dashboard;
