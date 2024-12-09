import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

// last updated needs to be changed accordingly on 9/12/2024

export const FromToInput = ({
  placeholder,
  fromName,
  toName,
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
  onBlur,
  fromError,
  toError,
  options,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [typedFromValue, setTypedFromValue] = useState(fromValue);
  const [typedToValue, setTypedToValue] = useState(toValue);
  const dropdownRef = useRef(null);

  const debouncedFromValue = useDebounce(typedFromValue, 300);
  const debouncedToValue = useDebounce(typedToValue, 300);

  // Synchronize local state with formik values
  useEffect(() => {
    setTypedFromValue(fromValue);
  }, [fromValue]);

  useEffect(() => {
    setTypedToValue(toValue);
  }, [toValue]);

  const handleInputClick = (inputName) => {
    setActiveInput(inputName);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (value, inputName) => {
    if (inputName === fromName) {
      setTypedFromValue(value);
      onChangeFrom({ target: { name: fromName, value } });
    } else if (inputName === toName) {
      setTypedToValue(value);
      onChangeTo({ target: { name: toName, value } });
    }
    setIsDropdownOpen(false);
  };

  const renderGrid = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>No options available</div>;
    }
    const columns = 5;
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

  const filteredFromOptions = options.filter((option) =>
    option.toString().includes(debouncedFromValue)
  );
  const filteredToOptions = options.filter((option) =>
    option.toString().includes(debouncedToValue)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFromChange = (e) => setTypedFromValue(e.target.value);
  const handleToChange = (e) => setTypedToValue(e.target.value);

  return (
    <div className="form-group mb-3">
      <div className="d-flex gap-2">
        {/* From Input */}
        <div className="position-relative" style={{ flex: 1 }}>
          <input
            type="text"
            name={fromName}
            className={`form-control ${fromError ? "is-invalid" : ""}`}
            placeholder={placeholder}
            value={typedFromValue}
            onClick={() => handleInputClick(fromName)}
            onBlur={onBlur}
            onChange={handleFromChange}
          />
          {fromError && (
            <div className="text-danger mt-1">
              <i className="bi bi-info-circle me-1"></i>
              {fromError}
            </div>
          )}
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
              {renderGrid(filteredFromOptions)}
            </div>
          )}
        </div>

        {/* To Input */}
        <div className="position-relative" style={{ flex: 1 }}>
          <input
            type="text"
            name={toName}
            className={`form-control ${toError ? "is-invalid" : ""}`}
            placeholder={placeholder}
            value={typedToValue}
            onClick={() => handleInputClick(toName)}
            onBlur={onBlur}
            onChange={handleToChange}
          />
          {toError && (
            <div className="text-danger mt-1">
              <i className="bi bi-info-circle me-1"></i>
              {toError}
            </div>
          )}
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
              {renderGrid(filteredToOptions)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
