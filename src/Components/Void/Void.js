import React from "react";
import "./void.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Void = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="card shadow-sm">
          <div
            className="card-header"
            style={{
              backgroundColor: "#7D7D7D",
              color: "#FFFFFF",
            }}
          >
            <h3 className="mb-0 fw-bold fs-5">Void Game</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6 position-relative">
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{
                    paddingLeft: "40px",
                    borderRadius: "30px",
                    border: "2px solid #6c757d",
                  }}
                />
              </div>

              <div className="col-md-6 text-end">
                <label className="me-2 fw-bold">Show</label>
                <select
                  className="form-select rounded-pill d-inline-block w-auto"
                  style={{
                    borderRadius: "50px",
                    border: "2px solid #6c757d",
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label className="ms-2 fw-bold">Entries</label>
              </div>
            </div>

            <div
              className=" mb-5 "
              style={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)",
              }}
            >
              <table
                className="table table-striped table-hover rounded-table"
                style={{
                  border: "2px solid #6c757d",
                  borderRadius: "10px",
                }}
              >
                <thead
                  className="table-primary"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th style={{ width: "25%" }}>Serial Number</th>
                    <th style={{ width: "20%" }}>Game Name</th>
                    <th style={{ width: "20%" }}>Market Name</th>
                    <th style={{ width: "35%" }}></th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr>
                    <td colSpan="4" style={{ padding: 0 }}>
                      <div
                        className="accordion accordion-flush "
                        id="accordionFlushExample"
                        style={{
                          width: "100%",
                          border: "1px solid #6c757d",
                        }}
                      >
                        <div className="accordion-item p-3 border-2 border">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Accordion Item #1
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse border-2 border"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div
                              className="accordion-body"
                              style={{
                                width: "100%",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              Placeholder content for this accordion, which is
                              intended to demonstrate the full-width accordion
                              behavior.
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Void;
