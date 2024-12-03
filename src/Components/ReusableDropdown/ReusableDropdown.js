import React from "react";
import "./ReusableDropdown.css"; 

const ReusableDropdown = ({
    label,
    name,
    options = [],
    value,
    onChange,
    onBlur,
    error,
    placeholder = "Select an option",
    className = "",
}) => (
    <div className={`form-group mb-3 ${className}`}>
        <label className="form-label">{label}</label>
        {/* <div className="picker-dropdown"> */}
        <select
            name={name}
            className="form-control"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <div className="text-danger">{error}</div>}
        </div>
    // </div>
   
);

export default ReusableDropdown;
