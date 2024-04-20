import CrudTable from "../Table";

const AdminOrder = () => {
  const booking = [
    {
      label: "Cust Name",
      field: "name",
      type: "String",
      ref: "Car",
      editable: true,
      required: true,
    },
    {
      label: "Car Name",
      field: "carName",
      type: "String",
      ref: "Car",
      editable: true,
      required: true,
    },
    {
      label: "Start Date",
      field: "startDate",
      type: "Date",
      editable: true,
      required: true,
    },
    {
      label: "End Date",
      field: "endDate",
      type: "Date",
      editable: true,
      required: true,
    },
    {
      label: "Status",
      field: "status",
      type: "select",
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
      editable: true,
      required: true,
    },
    {
      label: "Created At",
      field: "createdAt",
      type: "Date",
      editable: true,
      default: "Date.now",
    },
  ];
  return (
    <div>
      <CrudTable
        setIsAuthenticated={true}
        showDropDown={true}
        columns={booking}
        endpoint={"orders/admin"}
        title={"Orders"}
        noAction={false}
        onlyEdit={true}
      />
      ;
    </div>
  );
};
export default AdminOrder;
