import CrudTable from "../../Table";

const UserOrder = () => {
    const booking = [
       {
          label: "Car Name",
          field: "carName",
          type: "String",
          ref: "Car",
          required: true,
        },
        {
          label: "Start Date",
          field: "startDate",
          type: "Date",
          required: true,
        },
        {
          label: "End Date",
          field: "endDate",
          type: "Date",
          required: true,
        },
        {
          label: "Status",
          field: "status",
          type: "String",
          enum: [
            "request placed",
            "car ready for pickup",
            "car delivered",
            "car returned",
          ],
          default: "request placed",
        },
        {
          label: "Rental Cost",
          field: "rentalCost",
          type: "Number",
          required: true,
        },
        {
          label: "Created At",
          field: "createdAt",
          type: "Date",
          default: "Date.now",
        },
      ];
  return (
    <div>
      <CrudTable
        setIsAuthenticated={true}
        showDropDown={true}
        columns={booking}
        endpoint={"orders"}
        title={"Orders"}
        noAction={true}
      />
      ;
    </div>
  );
};
export default UserOrder;
