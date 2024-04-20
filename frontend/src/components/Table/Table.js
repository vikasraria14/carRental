import React from "react";

const Table = ({
  data,
  handleEdit,
  handleDelete,
  columns,
  theme,
  noAction,
  onlyEdit
}) => {
  data.forEach((dataField, i) => {
    dataField.id = i + 1;
  });

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "dark" : ""
      }  overflow-y-auto`}
    >
      <table
        className={`w-full ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        } border-collapse border`}
      >
        <thead>
          <tr className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {column.label}
              </th>
            ))}
            {!noAction && (
              <th
                colSpan={onlyEdit?1:2}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((dataField, index) => (
              <tr
                key={dataField.id}
                className={`${
                  index % 2 === 0
                    ? theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : theme === "dark"
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {column.type==='Date'?new Date(dataField[column.field]).toLocaleDateString():dataField[column.field]}
                  </td>
                ))}
                {!noAction && (
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    <button
                      onClick={() => handleEdit(dataField.id)}
                      className={`px-4 py-2 rounded hover:bg-blue-600 ${
                        theme === "dark"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-200 text-black"
                      }`}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {!noAction && !onlyEdit && (
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    <button
                      onClick={() => handleDelete(dataField._id)}
                      className={`px-4 py-2 rounded hover:bg-red-600 ${
                        theme === "dark"
                          ? "bg-red-500 text-white"
                          : "bg-red-200 text-black"
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="border border-gray-300 px-4 py-2"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
