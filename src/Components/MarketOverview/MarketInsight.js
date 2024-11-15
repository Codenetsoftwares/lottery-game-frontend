import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  Badge,
  Button,
  Accordion,
} from "react-bootstrap";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap icons
import "./MarketInsight.css";
import { GetMarketTimings, GetPurchaseOverview } from "../../Utils/apiService";

const MarketInsight = () => {
  const [marketTimes, setMarketTimes] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]); // To store the purchased tickets data

  useEffect(() => {
    const fetchMarketTimings = async () => {
      try {
        const response = await GetMarketTimings();
        if (response.success) {
          setMarketTimes(response.data);
        }
      } catch (error) {
        console.error("Error fetching market timings:", error);
      }
    };

    fetchMarketTimings();
  }, []);

  useEffect(() => {
    if (selectedMarket) {
      const fetchPurchasedTickets = async () => {
        try {
          const response = await GetPurchaseOverview({
            marketId: selectedMarket.marketId,
          });
          if (response.success) {
            setPurchasedTickets(response.data.tickets || []); // Update the state with purchased ticket data
          }
        } catch (error) {
          console.error("Error fetching purchased tickets:", error);
        }
      };

      fetchPurchasedTickets();
    }
  }, [selectedMarket]); // Runs when selectedMarket changes

  const handleMarketClick = (market) => {
    setSelectedMarket(market);
    setShowStats(true);
  };

  return (
    <Container fluid className="alt-dashboard-container">
      {/* Sidebar */}
      <aside className="alt-sidebar p-4">
        <h5 className="text-center text-white">Lottery Markets</h5>
        <div className="market-card-grid">
          {marketTimes.length > 0 ? (
            marketTimes.map((market) => (
              <Card
                key={market.marketId}
                className="market-card shadow"
                onClick={() => handleMarketClick(market)}
              >
                <Card.Body>
                  <Card.Title>{market.marketName}</Card.Title>
                  <Badge bg="light" text="dark" className="mb-2">
                    {`ID: ${market.marketId.slice(-6).toUpperCase()}`}
                  </Badge>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ minHeight: "480px", width: "100%" }}
            >
              <h4 className="text-center fw-bold text-black bg-white p-5 rounded-5">
                No <br />
                Market <br />
                Available
              </h4>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="alt-main-content p-4">
        {showStats && selectedMarket ? (
          <div className="stats-popup">
            <h3 className="market-title text-center mb-4">
              {selectedMarket.marketName} Stats
            </h3>
            <Row>
              {/* Group Range Card */}
              <Col md={6} className="mb-3">
                <Card className="stat-card group-card shadow">
                  <Card.Body className="d-flex align-items-center">
                    <i className="bi bi-people-fill stat-icon me-3"></i>
                    <div>
                      <p className="mb-1">
                        <strong>Group Range</strong>
                      </p>
                      <p>
                        Start: {selectedMarket.group_start} | End:{" "}
                        {selectedMarket.group_end}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Series Range Card */}
              <Col md={6} className="mb-3">
                <Card className="stat-card series-card shadow">
                  <Card.Body className="d-flex align-items-center">
                    <i className="bi bi-bar-chart-fill stat-icon me-3"></i>
                    <div>
                      <p className="mb-1">
                        <strong>Series Range</strong>
                      </p>
                      <p>
                        Start: {selectedMarket.series_start} | End:{" "}
                        {selectedMarket.series_end}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Number Range Card */}
              <Col md={6} className="mb-3">
                <Card className="stat-card number-card shadow">
                  <Card.Body className="d-flex align-items-center">
                    <i className="bi bi-123 stat-icon me-3"></i>
                    <div>
                      <p className="mb-1">
                        <strong>Number Range</strong>
                      </p>
                      <p>
                        Start: {selectedMarket.number_start} | End:{" "}
                        {selectedMarket.number_end}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Time Range Card */}
              <Col md={6} className="mb-3">
                <Card className="stat-card time-card shadow">
                  <Card.Body className="d-flex align-items-center">
                    <i className="bi bi-clock-fill stat-icon me-3"></i>
                    <div>
                      <p className="mb-1">
                        <strong>Time Range</strong>
                      </p>
                      <p>
                        Start:{" "}
                        {moment(selectedMarket.start_time).format("HH:mm")} |
                        End: {moment(selectedMarket.end_time).format("HH:mm")}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Accordion for Purchased Tickets */}

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Purchased Tickets</Accordion.Header>
                <Accordion.Body>
                  {purchasedTickets.length > 0 ? (
                    <div className="ticket-grid">
                      {purchasedTickets.map((ticket, index) => (
                        <div key={index} className="ticket-card">
                          <Card className="ticket-card-item shadow-sm">
                            <Card.Body>
                              {/* Display all ticket numbers in a grid */}
                              <div className="ticket-numbers">
                                {ticket.ticketList.map((ticketNumber, idx) => (
                                  <span key={idx} className="ticket-number">
                                    {ticketNumber}
                                  </span>
                                ))}
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No purchased tickets available for this market.</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Button
              variant="outline-primary"
              className="close-btn mt-4"
              onClick={() => setShowStats(false)}
            >
              Close Details
            </Button>
          </div>
        ) : (
          <Card className="welcome-card shadow-sm">
            <Card.Body>
              <Card.Title className="welcome-title">
                Welcome to the Lottery Market Overview!
              </Card.Title>
              <Card.Text className="welcome-text">
                Select a market from the left sidebar to view its details.
              </Card.Text>
              {marketTimes.length === 0 && !showStats && (
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="text-center text-dark fw-bold">
                    No Market Available
                  </h4>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </main>
    </Container>
  );
};

export default MarketInsight;
