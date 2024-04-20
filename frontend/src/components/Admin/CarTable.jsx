import CrudTable from "../Table";

const CarTable = () => {
  const cars = [
    {
      label: "Make",
      field: "make",
      type: "text",
    },
    {
      label: "Model",
      field: "model",
      type: "text",
    },
    {
      label: "Year",
      field: "year",
      type: "number",
    },
    {
      label: "Hourly Rate",
      field: "hourlyRate",
      type: "number",
    },
    {
      label: "Daily Rate",
      field: "dailyRate",
      type: "number",
    },
    {
      label: "Available Quantity",
      field: "availableQuantity",
      type: "number",
    },
    {
      label: "Fuel Type",
      field: "fuelType",
      type: "text",
    },
    {
      label: "Transmission",
      field: "transmission",
      type: "text",
    },
    {
      label: "Seating Capacity",
      field: "seatingCapacity",
      type: "number",
    },
    {
      label: "Mileage",
      field: "mileage",
      type: "number",
    },
    {
      label: "Engine Size",
      field: "engineSize",
      type: "number",
    },
    {
      label: "Registration Number",
      field: "registrationNumber",
      type: "text",
    },
    {
      label: "Insurance Provider",
      field: "insuranceProvider",
      type: "text",
    }
   
   
  ];
  return (
    <div>
      <CrudTable
        setIsAuthenticated={true}
        showDropDown={true}
        columns={cars}
        endpoint={"cars"}
        title={"Cars"}
      />
      ;
    </div>
  );
};
export default CarTable;
