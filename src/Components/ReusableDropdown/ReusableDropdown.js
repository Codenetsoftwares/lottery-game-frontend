import React from "react";

const ReusableDropdown = ({ label, name, options, value, onChange, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <div className="text-danger">{error}</div>}
  </div>
);

export default ReusableDropdown;
