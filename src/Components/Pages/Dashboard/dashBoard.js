import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Table, Card } from 'react-bootstrap';
import './DashBoard.css'; // Import CSS for animations

const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [sem, setSem] = useState(null);
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [activeSection, setActiveSection] = useState('lotteryMarkets'); // State to control active section
  const [animateCursor, setAnimateCursor] = useState(false); // State for cursor animation

  const handleGenerate = (selectedSem) => {
    setSem(selectedSem);
    const tickets = Array.from({ length: selectedSem }, (_, i) => `TICKET-${i + 1}`);
    setGeneratedTickets(tickets);
    setShowModal(true);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section); // Change the active section
  };

   // Automatically switch sections every 5 seconds
   useEffect(() => {
    const interval = setInterval(() => {
      // Animate cursor to the next section
      setAnimateCursor(true);
      setTimeout(() => {
        setActiveSection((prev) => (prev === 'lotteryMarkets' ? 'purchasedTickets' : 'lotteryMarkets'));
        setAnimateCursor(false);
      }, 500); // Duration matches the CSS transition time
    }, 500); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h5 className="mb-4 text-center">Lottery Admin</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              href="#lotteryMarkets"
              className="nav-link text-white"
              onClick={() => handleSectionChange('lotteryMarkets')}
            >
              Lottery Markets
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#purchasedTickets"
              className="nav-link text-white"
              onClick={() => handleSectionChange('purchasedTickets')}
            >
              Purchased Tickets
            </a>
          </li>
          <li className="nav-item">
            <a href="#analytics" className="nav-link text-white">Analytics</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f7f7f7' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard</h2>
          <Button variant="outline-primary">Logout</Button>
        </div>

        {/* Conditional Rendering of Sections with Animation */}
        <div className={`section ${activeSection === 'lotteryMarkets' ? 'fade-in' : 'fade-out'}`} id="lotteryMarkets">
          <Card className="mb-4 shadow-lg">
            <Card.Body>
              <h4 className="card-title">Generate Ticket Number To Create Lottery Ticket By SEM</h4>
              <p>Select SEM and generate tickets:</p>
              <Dropdown onSelect={handleGenerate}>
                <Dropdown.Toggle variant="primary">
                  {sem ? `SEM: ${sem}` : 'Select SEM'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="5">5</Dropdown.Item>
                  <Dropdown.Item eventKey="10">10</Dropdown.Item>
                  <Dropdown.Item eventKey="25">25</Dropdown.Item>
                  <Dropdown.Item eventKey="50">50</Dropdown.Item>
                  <Dropdown.Item eventKey="100">100</Dropdown.Item>
                  <Dropdown.Item eventKey="200">200</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button 
                variant="primary" 
                className="mt-3"
                onClick={() => handleGenerate(sem)}
                disabled={!sem}
              >
                Generate Tickets
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className={`section ${activeSection === 'purchasedTickets' ? 'fade-in' : 'fade-out'}`} id="purchasedTickets">
          <Card className="shadow-lg">
            <Card.Body>
              <h4 className="card-title">Purchased Tickets</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Number of Tickets</th>
                    <th>SEM Type</th>
                    <th>Date Purchased</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>john.doe@example.com</td>
                    <td>10</td>
                    <td>SEM: 50</td>
                    <td>2024-09-20</td>
                  </tr>
                  {/* Add more rows dynamically */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modal for Ticket Creation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Lottery Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Lottery Name</Form.Label>
              <Form.Control type="text" placeholder="Enter lottery name" />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="formFirstPrize">
              <Form.Label>First Prize</Form.Label>
              <Form.Control type="text" placeholder="Enter prize amount" />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter ticket price" />
            </Form.Group>
            <p><strong>SEM: </strong>{sem}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Create Lottery
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashBoard;
