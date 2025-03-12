import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FormBuilder from "./components/FormBuilder";
import FormView from "./view/FormView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [formFields, setFormFields] = useState([]); // ✅ Move state here
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("Form Description");

  return (
    <Router>
      <Routes>
        {/* Form Builder */}
        <Route
          path="/"
          element={
            <>
              <Navbar
                formFields={formFields}
                formTitle={formTitle}
                formDescription={formDescription}
              />
              <FormBuilder
                formFields={formFields}
                setFormFields={setFormFields}
                formTitle={formTitle}
                setFormTitle={setFormTitle}
                formDescription={formDescription}
                setFormDescription={setFormDescription}
              />
            </>
          }
        />

        {/* Form View */}
        <Route path="/form/:formId" element={<FormView />} />
      </Routes>
    </Router>
  );
};

export default App;
