import React, { useState, useCallback } from "react";
import { PaintBucket, Eye, Link2 } from "lucide-react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ formFields, formTitle, formDescription }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Handle Publish Form
  const handlePublish = async () => {
    console.log("Publishing Form:", formFields);

    if (!formFields || formFields.length === 0) {
      alert("Please add questions before publishing!");
      return;
    }

    const formId = Date.now().toString();
    const formData = {
      id: formId,
      title: formTitle || "Untitled Form",
      description: formDescription || "",
      questions: formFields,
    };

    localStorage.setItem(`form_${formId}`, JSON.stringify(formData));

    const formLink = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(formLink);
    alert("Form published! Link copied to clipboard: " + formLink);
  };

  return (
    <nav
      className="flex justify-between items-center px-8 py-10 shadow-lg backdrop-blur-lg bg-opacity-70 bg-white/30 border border-gray-200 rounded-lg"
      style={{ backgroundColor: bgColor }}
    >
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <img
          src="https://www.gstatic.com/images/branding/product/2x/forms_2020q4_48dp.png"
          alt="Google Forms Icon"
          className="h-10 w-10"
        />
        <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
          {formTitle || "Forms Builder"}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        <div className="relative"></div>

        {/* Publish Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2 rounded-md shadow-lg transition"
          onClick={handlePublish}
        >
          Publish
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
