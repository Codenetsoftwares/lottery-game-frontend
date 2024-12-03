import React from "react";

const ReusableInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    placeholder = "",
    isFromTo = false, 
    fromName,
    toName,
    fromValue,
    toValue,
    fromPlaceholder = "From",
    toPlaceholder = "To",
    fromError,
    toError,
}) => {
    return (
        <div className="form-group mb-3">
            <label className="form-label">{label}</label>
            {isFromTo ? (
                <div className="d-flex gap-2">
                    <input
                        type={type}
                        name={fromName}
                        className="form-control"
                        placeholder={fromPlaceholder}
                        value={fromValue}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    <input
                        type={type}
                        name={toName}
                        className="form-control"
                        placeholder={toPlaceholder}
                        value={toValue}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            )}
            {error && !isFromTo && <div className="text-danger">{error}</div>}
            {isFromTo && fromError && <div className="text-danger">{fromError}</div>}
            {isFromTo && toError && <div className="text-danger">{toError}</div>}
        </div>
    );
};

export default ReusableInput;
