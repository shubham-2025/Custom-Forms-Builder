import { useState } from "react";
import { Plus, Image, Video, Type, FileText } from "lucide-react";
import { PiEqualsBold } from "react-icons/pi"; // Importing equal sign icon
import React from "react";

const FloatingToolbar = ({ addField, addSection }) => {
  return (
    <div className="fixed left-5 top-1/4 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-3">
      <button
        onClick={() => addField("text")}
        className="p-3 rounded hover:bg-gray-100 flex items-center justify-center"
        title="Short Answer"
      >
        <Type size={24} />
      </button>

      <button
        onClick={() => addField("long-text")}
        className="p-3 rounded hover:bg-gray-100 flex items-center justify-center"
        title="Long Answer"
      >
        <FileText size={24} />
      </button>

      <button
        onClick={() => addSection()}
        className="p-3 rounded hover:bg-gray-100 flex items-center justify-center"
        title="Add Section"
      >
        <PiEqualsBold size={24} />
      </button>

      <button
        onClick={() => addField("image")}
        className="p-3 rounded hover:bg-gray-100 flex items-center justify-center"
        title="Add Image"
      >
        <Image size={24} />
      </button>

      <button
        onClick={() => addField("video")}
        className="p-3 rounded hover:bg-gray-100 flex items-center justify-center"
        title="Add Video"
      >
        <Video size={24} />
      </button>
    </div>
  );
};

export default FloatingToolbar;
