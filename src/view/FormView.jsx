import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormView = () => {
  const { formId } = useParams(); // Get form ID from URL
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const savedForm = localStorage.getItem(`form_${formId}`);
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    } else {
      console.error("No form data found for ID:", formId);
    }
  }, [formId]);

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Responses:", responses);

    // Save responses to localStorage (You can send this to a backend instead)
    localStorage.setItem(`responses_${formId}`, JSON.stringify(responses));

    alert("Form submitted successfully!");
  };

  if (!formData) {
    return <p>Loading form...</p>; // Show loading state until form data is available
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{formData.title}</h1>
      <p className="text-gray-600 mb-6">{formData.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.questions?.length > 0 ? (
          formData.questions.map((question) => (
            <div key={question.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="font-medium">{question.text || "Untitled Question"}</h3>
              
              {/* Input fields based on question type */}
              {question.type === "shortAnswer" && (
                <input
                  type="text"
                  placeholder="Enter your answer"
                  className="border p-2 w-full mt-2"
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
              )}

              {question.type === "longAnswer" && (
                <textarea
                  placeholder="Enter your answer"
                  className="border p-2 w-full mt-2"
                  rows={3}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
              )}

              {question.type === "checkbox" && question.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) =>
                      handleChange(question.id, {
                        ...responses[question.id],
                        [option]: e.target.checked,
                      })
                    }
                  />
                  <label>{option}</label>
                </div>
              ))}

              {question.type === "multipleChoice" && question.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormView;
