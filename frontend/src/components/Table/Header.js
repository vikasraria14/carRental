import React from "react";

const Header = ({ setIsAdding, title, noAction,onlyEdit }) => {
  return (
    <header  className="items-center">
      <h1 className="text-3xl font-bold items-center ">{title}</h1>
      {!noAction&&!onlyEdit && (
        <div className=" mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => setIsAdding(true)}
          >
            Add {title}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
