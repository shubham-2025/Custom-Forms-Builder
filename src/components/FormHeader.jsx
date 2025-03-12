import React from "react";

const FormHeader = ({ formTitle, setFormTitle, formDescription, setFormDescription }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        className="w-full text-2xl font-semibold border-none focus:ring-0"
      />
      <input
        type="text"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        className="w-full text-gray-500 border-none focus:ring-0 mt-2"
      />
    </div>
  );
};

export default FormHeader;
