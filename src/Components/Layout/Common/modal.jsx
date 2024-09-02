import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomModal = ({ showModal, onClose, heading, bodyContent, buttonLabel, onButtonClick }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{heading}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{bodyContent}</p>
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
