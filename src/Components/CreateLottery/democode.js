import React, { useState, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import useDebounce from "./useDebounce"; // Ensure you have this utility hook

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
  const containerRef = useRef(null); // Ref for the container
  const [containerWidth, setContainerWidth] = useState(0);

  const debouncedFromValue = useDebounce(typedFromValue, 300);
  const debouncedToValue = useDebounce(typedToValue, 300);

  useEffect(() => {
    setTypedFromValue(fromValue);
  }, [fromValue]);

  useEffect(() => {
    setTypedToValue(toValue);
  }, [toValue]);

  useEffect(() => {
    // Set container width dynamically
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  const handleInputClick = (inputName) => {
    setActiveInput(inputName);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (value, inputName) => {
    if (inputName === fromName) {
      setTypedFromValue(value);
      onChangeFrom({ target: { name: fromName, value } });
      setIsDropdownOpen(false);
    } else if (inputName === toName) {
      setTypedToValue(value);
      onChangeTo({ target: { name: toName, value } });
    }
  };

  const filteredOptions =
    activeInput === fromName
      ? options.filter((option) =>
          option.toString().toLowerCase().includes(debouncedFromValue.toLowerCase())
        )
      : options.filter((option) =>
          option.toString().toLowerCase().includes(debouncedToValue.toLowerCase())
        );

  const Row = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex; // 3 columns per row
    if (index >= filteredOptions.length) return null;

    return (
      <button
        style={{
          ...style,
          display: "block",
          margin: "0",
          padding: "8px",
          textAlign: "left",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa",
          transition: "background-color 0.3s",
        }}
        className="btn btn-light btn-sm text-start"
        onClick={() => handleOptionClick(filteredOptions[index], activeInput)}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6f7ff")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
      >
        {filteredOptions[index]}
      </button>
    );
  };

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
            style={{ height: "40px" }}
          />
          <div
            className="text-danger no-cursor d-flex align-items-center mt-1"
            style={{ height: "20px", fontSize: "0.85rem" }}
          >
            {fromError && (
              <>
                <i className="bi bi-info-circle me-1"></i>
                {fromError}
              </>
            )}
          </div>
          {isDropdownOpen && activeInput === fromName && containerWidth > 0 && (
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
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
            >
              {filteredOptions.length > 0 ? (
                <Grid
                  columnCount={3}
                  columnWidth={containerWidth / 3}
                  height={200}
                  rowCount={Math.ceil(filteredOptions.length / 3)}
                  rowHeight={40}
                  width={containerWidth}
                >
                  {Row}
                </Grid>
              ) : (
                <div
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    color: "#999",
                    fontStyle: "italic",
                  }}
                >
                  No matching data found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="position-relative" style={{ flex: 1 }} ref={containerRef}>
          <input
            type="text"
            name={toName}
            className={`form-control ${toError ? "is-invalid" : ""}`}
            placeholder={placeholder}
            value={typedToValue}
            onClick={() => handleInputClick(toName)}
            onBlur={onBlur}
            onChange={handleToChange}
            style={{ height: "40px" }}
          />
          <div
            className="text-danger no-cursor d-flex align-items-center mt-1"
            style={{ height: "20px", fontSize: "0.85rem" }}
          >
            {toError && (
              <>
                <i className="bi bi-info-circle me-1"></i>
                {toError}
              </>
            )}
          </div>
          {isDropdownOpen && activeInput === toName && containerWidth > 0 && (
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
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
            >
              {filteredOptions.length > 0 ? (
                <Grid
                  columnCount={3}
                  columnWidth={containerWidth / 3}
                  height={200}
                  rowCount={Math.ceil(filteredOptions.length / 3)}
                  rowHeight={40}
                  width={containerWidth}
                >
                  {Row}
                </Grid>
              ) : (
                <div
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    color: "#999",
                    fontStyle: "italic",
                  }}
                >
                  No matching data found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
