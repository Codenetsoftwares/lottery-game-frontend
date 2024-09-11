import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contextApi/context";
import { getPurchasedLotteryTickets } from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { Table, Spinner } from 'react-bootstrap';
import './PurchasedLotteries.css';

const PurchasedLotteries = () => {
  const { dispatch } = useAppContext();
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPurchasedLotteryTickets();
  }, []);

  const fetchPurchasedLotteryTickets = async () => {
    const response = await getPurchasedLotteryTickets();
    console.log(response);
    if (response && response.success) {
      setPurchasedTickets(response.data);
      dispatch({
        type: strings.PURCHASED_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch purchased tickets");
    }
    setLoading(false);  // Set loading to false after the data is fetched
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  return (
    <div className="container mt-4 p-3" style={{ background: '#e6f7ff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
    <h2 className='text-center mb-4' style={{ color: '#4682B4' }}>Purchased Lottery Tickets</h2>
    <Table striped hover responsive bordered className='table-sm'>
      <thead  style={{ backgroundColor: '#4682B4', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        <tr>
          <th>Serial Number</th>
          <th>Lottery Name</th>
          <th>Date Purchased</th>
          <th>Purchased Amount</th>
          <th>SEM</th>
          <th>Ticket Number</th>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody  style={{ textAlign: 'center' }}>
        {purchasedTickets.length > 0 ? (
          purchasedTickets.map((ticket, index) => (
            <tr key={ticket.purchaseId}>
              <td>{index + 1}</td>
              <td>{ticket.name}</td>
              <td>{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
              <td>{ticket.purchaseAmount}</td>
              <td>{ticket.sem}</td>
              <td>{ticket.ticketNumber}</td>
              <td>{ticket.userName}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No tickets found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  );
};

export default PurchasedLotteries;
