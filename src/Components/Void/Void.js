import React, { useState, useEffect } from "react";
import "./void.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Accordion } from "react-bootstrap";
import Pagination from "../Common/Pagination";
import { GetVoidMarketData } from "../../Utils/apiService";

const Void = () => {
  const [voidMarkets, setVoidMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });

  useEffect(() => {
    fetchVoidMarkets();
  }, [pagination.page, pagination.limit, searchTerm]);

  const fetchVoidMarkets = async () => {
    try {
      setIsLoading(true);
      const response = await GetVoidMarketData({
        page: pagination.page,
        limit: pagination.limit,
        searchTerm: searchTerm,
      });
      if (response.success) {
        setVoidMarkets(response.data);
        setPagination({
          page: response?.pagination?.page || pagination.page,
          limit: response?.pagination?.limit || pagination.limit,
          totalPages: response.pagination.totalPages || 0,
          totalItems: response.pagination.totalItems || 0,
        });
      } else {
        setError(response.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
    setPagination((prev) => ({ ...prev, page: 1 })); 
  };

  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div
          className="card-header text-center p-3"
          style={{ backgroundColor: "#0E1A35", color: "#FFFFFF" }}
        >
          <h3 className="mb-0 fw-bold fs-5">Void Game</h3>
        </div>
        <div className="card-body p-3">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div>
          ) : (
            <>
              {/* Search and Pagination Controls */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      borderRadius: "30px",
                      border: "2px solid #6c757d",
                      paddingLeft: "15px",
                    }}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange} 
                  />
                </div>
              </div>

              {/* Market Data Table */}
              <div
                className="mb-5"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)" }}
              >
                <table
                  className="table table-striped table-hover rounded-table"
                  style={{
                    border: "2px solid #6c757d",
                    borderRadius: "10px",
                  }}
                >
                  <tbody>
                    {voidMarkets.map((market, index) => (
                      <tr key={market.id}>
                        <Accordion>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                              <strong>{market.marketName}</strong>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Row>
                                <Col md={6} className="mb-3">
                                  <Card className="stat-card group-card shadow">
                                    <Card.Body className="d-flex align-items-center">
                                      <i className="bi bi-people-fill stat-icon me-3"></i>
                                      <div>
                                        <p className="mb-1 fw-bold text-dark">
                                          <strong>Group Range</strong>
                                        </p>
                                        <p>
                                          Start: {market.group_start} | End:{" "}
                                          {market.group_end}
                                        </p>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <Card className="stat-card group-card shadow">
                                    <Card.Body className="d-flex align-items-center">
                                      <i className="bi bi-bar-chart-fill stat-icon me-3"></i>
                                      <div>
                                        <p className="mb-1 fw-bold text-dark">
                                          <strong>Series Range</strong>
                                        </p>
                                        <p>
                                          Start: {market.series_start} | End:{" "}
                                          {market.series_end}
                                        </p>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <Card className="stat-card group-card shadow">
                                    <Card.Body className="d-flex align-items-center">
                                      <i className="bi bi-123 stat-icon me-3"></i>
                                      <div>
                                        <p className="mb-1 fw-bold text-dark">
                                          <strong>Number Range</strong>
                                        </p>
                                        <p>
                                          Start: {market.number_start} | End:{" "}
                                          {market.number_end}
                                        </p>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <Card className="stat-card group-card shadow">
                                    <Card.Body className="d-flex align-items-center">
                                      <i className="bi bi-currency-rupee stat-icon me-5"></i>
                                      <div>
                                        <p className="mb-1 fw-bold text-dark">
                                          <strong>Price</strong>
                                        </p>
                                        <p>{market.price}</p>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <Card className="stat-card group-card shadow">
                                    <Card.Body className="d-flex align-items-center">
                                      <i className="bi bi-clock-fill stat-icon me-3"></i>
                                      <div>
                                        <p className="mb-1 fw-bold text-dark">
                                          <strong>Date</strong>
                                        </p>
                                        <p>{market.date}</p>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {voidMarkets.length > 0 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  handlePageChange={handlePageChange}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalData={pagination.totalItems}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Void;