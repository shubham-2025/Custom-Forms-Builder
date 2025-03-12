import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormHeader from "./FormHeader";
import { BsFillTrashFill, BsFillPlusCircleFill } from "react-icons/bs";
import { FiBold, FiItalic, FiUnderline, FiUpload, FiCopy } from "react-icons/fi";

const FormBuilder = ({ formFields, setFormFields, formTitle, setFormTitle, formDescription, setFormDescription }) => {
  const [themeColor, setThemeColor] = useState("#d1c4e9");

  const addQuestion = () => {
    setFormFields([...formFields, { 
      id: Date.now(), type: "shortAnswer", text: "", 
      options: [], required: false, isBold: false, isItalic: false, 
      isUnderline: false, isUppercase: false, image: null 
    }]);
  };

  const duplicateQuestion = (id) => {
    const questionToCopy = formFields.find(q => q.id === id);
    if (questionToCopy) {
      setFormFields([...formFields, { ...questionToCopy, id: Date.now() }]);
    }
  };

  const deleteQuestion = (id) => {
    setFormFields(formFields.filter(q => q.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-6 relative" style={{ backgroundColor: themeColor }}>
        {/* Theme Color Palette - Positioned at Top Right */}
        <div className="absolute top-4 right-6 flex space-x-2">
          {["#f3f4f6", "#e0f7fa", "#fbe9e7", "#f9fbe7", "#e8f5e9", "#d1c4e9", "#ffcdd2", "#b2ebf2", "#c8e6c9"].map(color => (
            <button key={color} className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}>
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <FormHeader
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
          />

          {/* Add Question Button */}
          <div 
            onClick={addQuestion} 
            className="bg-white shadow-md p-4 text-blue-500 cursor-pointer flex justify-center items-center rounded-lg mb-6"
          >
            <BsFillPlusCircleFill className="mr-2" /> Add Question
          </div>

          {formFields.map((q) => (
            <div key={q.id} className="bg-white shadow-md p-6 mb-6 rounded-lg space-y-4">
              {/* Question Label with Required Asterisk */}
              <label className="font-medium">
                {q.required && <span className="text-red-500">*</span>} Question
              </label>

              {/* Text Input with Formatting */}
              <input
                type="text"
                placeholder="Untitled Question"
                value={q.text}
                onChange={(e) => setFormFields(formFields.map(item => item.id === q.id ? { ...item, text: e.target.value } : item))}
                className="w-full p-2 border rounded"
                style={{
                  fontWeight: q.isBold ? "bold" : "normal",
                  fontStyle: q.isItalic ? "italic" : "normal",
                  textDecoration: q.isUnderline ? "underline" : "none"
                }}
              />
              
              {/* Text Formatting Options */}
              <div className="flex gap-3 text-gray-600">
                <button onClick={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, isBold: !item.isBold } : item))}><FiBold /></button>
                <button onClick={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, isItalic: !item.isItalic } : item))}><FiItalic /></button>
                <button onClick={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, isUnderline: !item.isUnderline } : item))}><FiUnderline /></button>
              </div>
              
              {/* Question Type Selection */}
              <select
                className="w-full p-2 border rounded"
                value={q.type}
                onChange={(e) => setFormFields(formFields.map(item => item.id === q.id ? { ...item, type: e.target.value } : item))}
              >
                <option value="shortAnswer">Short Answer</option>
                <option value="longAnswer">Long Answer</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="image">Image Upload</option>
              </select>
              
              {/* Multiple Choice & Checkbox Options */}
              {(q.type === "multipleChoice" || q.type === "checkbox") && (
                <div>
                  {q.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mt-2">
                      <input className="w-full p-2 border rounded" value={option} 
                        onChange={(e) => {
                          const newOptions = [...q.options];
                          newOptions[idx] = e.target.value;
                          setFormFields(formFields.map(item => item.id === q.id ? { ...item, options: newOptions } : item));
                        }}
                      />
                      <button onClick={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, options: q.options.filter((_, i) => i !== idx) } : item))}>
                        <BsFillTrashFill className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, options: [...q.options, `Option ${q.options.length + 1}`] } : item))} className="text-blue-500 mt-2">
                    + Add Option
                  </button>
                </div>
              )}
              
              {/* Image Upload */}
              {q.type === "image" && (
                <div className="mt-2">
                  <label className="flex items-center gap-2 text-blue-500 cursor-pointer">
                    <FiUpload /> Upload Image
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => setFormFields(formFields.map(item => item.id === q.id ? { ...item, image: URL.createObjectURL(e.target.files[0]) } : item))}
                    />
                  </label>
                  {q.image && <img src={q.image} alt="Uploaded" className="mt-2 max-w-xs rounded-lg shadow" />}
                </div>
              )}
              
              {/* Action Icons & Required Toggle */}
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => duplicateQuestion(q.id)}>
                  <FiCopy className="text-gray-600" />
                </button>

                {/* Required Toggle with Delete Button on the Right */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <span className="text-gray-700">Required</span>
                    <input 
                      type="checkbox" 
                      checked={q.required} 
                      onChange={() => setFormFields(formFields.map(item => item.id === q.id ? { ...item, required: !item.required } : item))}
                      className="w-5 h-5"
                    />
                  </label>
                  <button onClick={() => deleteQuestion(q.id)}>
                    <BsFillTrashFill className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
