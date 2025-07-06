import React from "react";

const Option = ({ text, onClick }) => {
  return (
    <button
  onClick={onClick}
  className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition w-full sm:w-auto md:w-1/2 lg:w-1/3 xl:w-1/4 " 
>
  {text}
</button>

  );
};

export default Option;
