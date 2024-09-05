import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomModal = ({ showModal, onClose, heading,inputs = [], buttonLabel, onButtonClick }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <div className="modal-header" style={{ backgroundColor: "#4682B4", color: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}>
            <h5 className="modal-title">{heading}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#fff", backdropFilter: "blur(10px)" }}>
          {inputs.length > 0 ? (
              inputs.map((input, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={input.id} className="form-label">
                    {input.label}
                  </label>
                  <input
                    type={input.type || "text"}
                    className="form-control"
                    id={input.id}
                    value={input.value}
                    onChange={(e) => input.onChange(e.target.value)}
                    readOnly={input.readOnly || false}
                  />
                </div>
              ))
            ) : (
              <p>No input fields to display</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onButtonClick}>
              {buttonLabel}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
