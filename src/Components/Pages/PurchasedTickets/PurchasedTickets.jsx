import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../contextApi/context';
import { PurchasedTicketsHistory } from '../../../Utils/apiService';
import strings from '../../../Utils/constant/stringConstant';
import { Table, Spinner } from 'react-bootstrap';
import './PurchasedLotteries.css';
import Pagination from '../../Common/Pagination';

const PurchasedTickets = () => {
  const { dispatch } = useAppContext();
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    fetchPurchasedLotteryTickets();
  }, [pagination.page, pagination.limit]);

  const fetchPurchasedLotteryTickets = async () => {
    const response = await PurchasedTicketsHistory({
      page: pagination.page,
      limit: pagination.limit,
    });
    console.log('====>>> response from purchased tickets', response);
    if (response && response.success) {
      setPurchasedTickets(response.data || []);
      setPagination({
        page: response?.pagination?.page || pagination.page,
        limit: response?.pagination?.limit || pagination.limit,
        totalPages: response?.pagination?.totalPages || 0,
        totalItems: response?.pagination?.totalItems || 0,
      });
      dispatch({
        type: strings.PURCHASED_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error('Failed to fetch purchased tickets');
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Filter tickets based on draw date (you might want to change this logic)
  const filteredTickets = purchasedTickets.filter((ticket) =>
    ticket.drawDate.toString().includes(searchTerm)
  );

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(pagination.page * pagination.limit, pagination.totalItems);
  
  return (
    <div
      className="container mt-4 p-3"
      style={{
        background: '#e6f7ff',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: '#4682B4' }}>Purchased Lottery Tickets</h2>
        <div className="w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search purchased tickets by draw date.."
            aria-label="Search tickets"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Table striped hover responsive bordered className="table-sm">
        <thead
          style={{
            backgroundColor: '#4682B4',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          <tr>
            <th>Serial Number</th>
            <th>Draw Date</th>
            <th>Tickets</th>
            <th>Price</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
              <tr key={index}>
                <td>{startIndex + index}</td>
                <td>{ticket.drawDate}</td>
                <td>
                  <div className="dropdown" style={{ position: 'relative' }}>
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      onClick={() => toggleDropdown(index)}
                    >
                      View Tickets
                    </button>
                    {dropdownOpen === index && (
                      <div className="custom-dropdown-menu">
                        <span className="dropdown-item-text">Ticket Numbers:</span>
                        <div className="dropdown-divider" />
                        {ticket.tickets.length > 0 ? (
                          ticket.tickets.map((number, i) => (
                            <span key={i} className="dropdown-item">
                              {number}
                            </span>
                          ))
                        ) : (
                          <span className="dropdown-item text-muted">No ticket numbers available</span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td>{ticket.price}</td>
                <td>{ticket.userName || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {filteredTickets.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalData={pagination.totalItems}
        />
      )}
    </div>
  );
};

export default PurchasedTickets;
