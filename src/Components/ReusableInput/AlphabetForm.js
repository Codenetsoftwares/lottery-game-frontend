import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useDebounce from "../../Utils/customHook/useDebounce ";


const AlphabetForm = () => {
  // List of alphabet options
  const alphabetOptions = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [typedLetter, setTypedLetter] = useState(""); // Input value
  const [selectedLetter, setSelectedLetter] = useState(""); // Selected dropdown letter
  const [showDropdown, setShowDropdown] = useState(false); // To control dropdown visibility

  // Debounced value of typed input
  const debouncedTypedLetter = useDebounce(typedLetter, 300);

  // Sync the debounced typed letter with the selected letter
  const handleTypedLetterChange = (e) => {
    setTypedLetter(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  const handleSelectLetter = (letter, setFieldValue) => {
    setSelectedLetter(letter);
    setTypedLetter(letter);
    setShowDropdown(false); // Hide dropdown when a letter is selected
    setFieldValue("selectedLetter", letter); // Sync selectedLetter with Formik field value
  };

  // Show full alphabet dropdown when input is clicked
  const handleInputClick = () => {
    setShowDropdown(true);
  };

  return (
    <Formik
      initialValues={{
        selectedLetter: selectedLetter || "", // Formik initial value
      }}
      validationSchema={Yup.object({
        selectedLetter: Yup.string().required("Please select a letter."),
      })}
      onSubmit={(values) => {
        alert(`Selected Letter: ${values.selectedLetter}`);
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="typedInput">Type or Select a Letter</label>
            <div
              style={{
                position: "relative",
                display: "block",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              {/* Input box for typing letter */}
              <Field
                as="input"
                id="typedInput"
                name="typedInput"
                type="text"
                placeholder="Type here..."
                maxLength="1"
                value={typedLetter}
                onChange={handleTypedLetterChange}
                onClick={handleInputClick} // Show dropdown on click
                style={{
                  display: "block",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              {/* Dropdown suggestions */}
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderTop: "none",
                    zIndex: 1,
                    maxHeight: "150px",
                    overflowY: "auto",
                  }}
                >
                  {(debouncedTypedLetter ? alphabetOptions.filter((letter) =>
                      letter.toLowerCase().startsWith(debouncedTypedLetter.toLowerCase())
                    ) : alphabetOptions)
                    .map((letter) => (
                      <div
                        key={letter}
                        onClick={() => handleSelectLetter(letter, setFieldValue)}
                        style={{
                          padding: "0.5rem",
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {errors.selectedLetter && touched.selectedLetter && (
              <div style={{ color: "red", marginTop: "0.5rem" }}>
                {errors.selectedLetter}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4682B4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AlphabetForm;
