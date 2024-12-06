import React, { useEffect, useRef, useState } from "react";

export const FromToInput = ({
  placeholder,
  fromName,
  toName,
  fromValue,
  toValue,
  onChange,
  onBlur,
  fromError,
  toError,
  options,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Track which input is active
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const handleInputClick = (inputName) => {
    setActiveInput(inputName);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (value, inputName) => {
    onChange({ target: { name: inputName, value } });
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });
  };

  const renderGrid = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>No options available</div>;
    }

    const columns = 5; // Set the number of columns in the grid
    const rows = Math.ceil(data.length / columns);
    const gridItems = [];

    for (let i = 0; i < rows; i++) {
      gridItems.push(
        <div className="d-flex justify-content-between" key={i}>
          {data.slice(i * columns, (i + 1) * columns).map((item, index) => (
            <button
              key={index}
              className="btn btn-light btn-sm w-100"
              onClick={() => handleOptionClick(item, activeInput)}
            >
              {item}
            </button>
          ))}
        </div>
      );
    }

    return gridItems;
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-group mb-3">
      <div className="d-flex gap-2">
        <div className="position-relative" style={{ flex: 1 }}>
          <input
            type="text"
            name={fromName}
            className={`form-control ${fromError ? "is-invalid" : ""}`}
            placeholder={`${placeholder} From`}
            value={fromValue}
            onClick={() => handleInputClick(fromName)}
            onBlur={onBlur}
            onChange={handleInputChange} // Allow manual input
          />
          <div
            className="text-danger d-flex align-items-center mt-1"
            style={{ minHeight: "20px", fontSize: "0.85rem" }}
          >
            {fromError && (
              <>
                <i className="bi bi-info-circle me-1"></i>
                <span>{fromError}</span>
              </>
            )}
          </div>

          {isDropdownOpen && activeInput === fromName && (
            <div
              ref={dropdownRef}
              className="dropdown-grid"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {renderGrid(options)}
            </div>
          )}
        </div>

        <div className="position-relative" style={{ flex: 1 }}>
          <input
            type="text"
            name={toName}
            className={`form-control ${toError ? "is-invalid" : ""}`}
            placeholder={`${placeholder} To`}
            value={toValue}
            onClick={() => handleInputClick(toName)}
            onBlur={onBlur}
            onChange={handleInputChange} // Allow manual input
          />
          <div
            className="text-danger d-flex align-items-center mt-1"
            style={{ minHeight: "20px", fontSize: "0.85rem" }}
          >
            {toError && (
              <>
                <i className="bi bi-info-circle me-1"></i>
                <span>{toError}</span>
              </>
            )}
          </div>

          {isDropdownOpen && activeInput === toName && (
            <div
              ref={dropdownRef}
              className="dropdown-grid"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {renderGrid(options)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
