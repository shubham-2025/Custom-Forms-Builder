import React from "react";

const DraggableField = ({
  field,
  selected,
  setSelectedField,
  updateFieldLabel,
  updateOption,
  addOption,
  removeOption,
  deleteField,
  duplicateField,
}) => {
  return (
    <div 
      className={`border p-3 rounded-lg shadow-md mb-3 bg-white ${selected ? "border-blue-500" : "border-gray-300"}`}
      onClick={() => setSelectedField(field.id)}
    >
      {/* Dropdown for Field Type */}
      <select
        value={field.type}
        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      >
        <option value="short-text">Short Answer</option>
        <option value="long-text">Long Answer</option>
        <option value="paragraph">Paragraph</option>
        <option value="multiple-choice">Multiple Choice</option>
      </select>

      {/* Editable Label */}
      <input
        type="text"
        value={field.label}
        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
        className="w-full border p-2 rounded-md"
      />

      {/* Delete & Duplicate Buttons */}
      <div className="flex justify-end mt-2 space-x-2">
        <button onClick={() => duplicateField(field)} className="text-blue-500">
          📄 Copy
        </button>
        <button onClick={() => deleteField(field.id)} className="text-red-500">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default DraggableField;
