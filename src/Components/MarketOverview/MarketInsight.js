import React, { useState } from 'react';
import { Card, Col, Row, Container, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MarketInsight.css';

const MarketInsight = () => {
  const drawTimes = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Market Draw ${i + 1}`,
  }));

  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const userStatsTemplate = [
    { icon: 'fas fa-users', title: 'Total Players', value: '50,000' },
    { icon: 'fas fa-trophy', title: 'Total Winnings', value: '$2,500,000' },
    { icon: 'fas fa-chart-line', title: 'Active Players', value: '3,200' },
  ];

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
          {drawTimes.map((market) => (
            <Card
              key={market.id}
              className="market-card"
              onClick={() => handleMarketClick(market)}
            >
              <Card.Body>
                <Card.Title>{market.name}</Card.Title>
                <Badge bg="light" text="dark">
                  {Math.floor(Math.random() * 1000 + 100)} players
                </Badge>
              </Card.Body>
            </Card>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="alt-main-content p-4">
        {showStats && selectedMarket ? (
          <div className="stats-popup">
            <h3 className="market-title">{selectedMarket.name} Stats</h3>
            <Row className="stats-grid">
              {userStatsTemplate.map((stat, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card className="stat-card">
                    <Card.Body>
                      <i className={`bi ${stat.icon} stat-icon`}></i>
                      <Card.Title className="stat-title">{stat.title}</Card.Title>
                      <Card.Text className="stat-value">{stat.value}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Button
              variant="outline-primary"
              className="close-btn mt-4"
              onClick={() => setShowStats(false)}
            >
              Close Stats
            </Button>
          </div>
        ) : (
          <Card className="welcome-card shadow-sm">
            <Card.Body>
              <Card.Title className="welcome-title">
                Welcome to the Lottery Dashboard!
              </Card.Title>
              <Card.Text className="welcome-text">
                Select a market from the sidebar to view its statistics.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </main>
    </Container>
  );
};

export default MarketInsight;
