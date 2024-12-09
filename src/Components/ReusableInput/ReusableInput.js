import React, { useRef, useState , useEffect } from "react";
import useDebounce from "../../Utils/customHook/useDebounce ";

export const ReusableInput = ({ placeholder, name, type = "text", value, onChange, onBlur, error }) => (
    <div className="form-group mb-3">
        <input
            type={type}
            name={name}
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder={placeholder}  // Using placeholder instead of label
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
        <div
            className="text-danger d-flex align-items-center  mt-1"
            style={{ minHeight: "20px", fontSize: "0.85rem" }} // Reserves space for error messages
           
        >
        
            {error && (
                <>
                    <i className="bi bi-info-circle me-1"></i>
                    <span>{error}</span>
                </>
            )}
        </div>
    </div>
);



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
  const [activeInput, setActiveInput] = useState(null); // Track which input is active
  const [typedFromValue, setTypedFromValue] = useState(fromValue); // For debouncing 'from' input
  const [typedToValue, setTypedToValue] = useState(toValue); // For debouncing 'to' input
  const dropdownRef = useRef(null);

  // Debounced values
  const debouncedFromValue = useDebounce(typedFromValue, 300);
  const debouncedToValue = useDebounce(typedToValue, 300);

  const handleInputClick = (inputName) => {
    setActiveInput(inputName);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (value, inputName) => {
    if (inputName === fromName) {
      setTypedFromValue(value); // Update typed value immediately
      onChangeFrom({ target: { name: fromName, value } }); // Notify parent of change
    } else if (inputName === toName) {
      setTypedToValue(value); // Update typed value immediately
      onChangeTo({ target: { name: toName, value } }); // Notify parent of change
    }
    setIsDropdownOpen(false); // Close dropdown after selection
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

  // Filter options based on the debounced value
  const filteredFromOptions = options.filter(option =>
    option.toString().includes(debouncedFromValue)
  );

  const filteredToOptions = options.filter(option =>
    option.toString().includes(debouncedToValue)
  );

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

  // Handle changes for 'from' input and apply debouncing
  const handleFromChange = (e) => {
    setTypedFromValue(e.target.value);
  };

  // Handle changes for 'to' input and apply debouncing
  const handleToChange = (e) => {
    setTypedToValue(e.target.value);
  };

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
            value={typedFromValue} // Reflect typed value in the input
            onClick={() => handleInputClick(fromName)}
            onBlur={onBlur}
            onChange={handleFromChange}
          />
          <div
            className="text-danger no-cursor d-flex align-items-center mt-1"
            style={{ minHeight: "20px", fontSize: "0.85rem" }}
            readOnly
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
            value={typedToValue} // Reflect typed value in the input
            onClick={() => handleInputClick(toName)}
            onBlur={onBlur}
            onChange={handleToChange}
          />
          <div
            className="text-danger no-cursor  d-flex align-items-center mt-1"
            style={{ minHeight: "20px", fontSize: "0.85rem" }}
            readOnly
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
              {renderGrid(filteredToOptions)} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

