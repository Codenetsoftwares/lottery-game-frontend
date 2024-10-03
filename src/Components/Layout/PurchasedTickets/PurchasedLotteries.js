import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contextApi/context";
import {
  getPurchasedLotteryTickets,
  PurchasedLotteryTicketsDelete,
} from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { Table, Spinner } from "react-bootstrap";
import "./PurchasedLotteries.css";
import Pagination from "../Common/Pagination";

const PurchasedLotteries = () => {
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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    fetchPurchasedLotteryTickets(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const fetchPurchasedLotteryTickets = async () => {
    const response = await getPurchasedLotteryTickets({
      page: pagination.page,
      limit: pagination.limit,
    });
    console.log('====>>> response from purchased tickets',response)
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
      console.error("Failed to fetch purchased tickets");
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1 on new search
  };

  const filteredTickets = purchasedTickets.filter((ticket) =>
    ticket.sem.toString().includes(searchTerm)
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
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  return (
    <div
      className="container mt-4 p-3"
      style={{
        background: "#e6f7ff",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "#4682B4" }}>Purchased Lottery Tickets</h2>
        <div className="w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search purchased tickets by sem.."
            aria-label="Search tickets" // Bind the input value to the state
            value={searchTerm} // Bind the input value to the state
            onChange={handleSearchChange} 
          />
        </div>
      </div>

      <Table striped hover responsive bordered className="table-sm">
        <thead
          style={{
            backgroundColor: "#4682B4",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <tr>
            <th>Serial Number</th>
            <th>Lottery Name</th>
            <th>Date Purchased</th>
            <th>Draw Time</th>
            <th>Purchased Amount</th>
            <th>SEM</th>
            <th>Ticket Number</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {purchasedTickets && purchasedTickets.length > 0 ? (
            purchasedTickets.map((ticket, index) => (
              <tr key={ticket.purchaseId}>
                <td>{startIndex + index}</td>
                <td>{ticket.name}</td>
                <td>{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                <td>{ticket.drawTime}</td>
                <td>{ticket.purchaseAmount}</td>
                <td>{ticket.sem}</td>
                <td>
                  <div className="dropdown" style={{ position: "relative" }}>
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      onClick={() => toggleDropdown(ticket.purchaseId)}
                    >
                      View Ticket Numbers
                    </button>
                    {dropdownOpen === ticket.purchaseId && (
                      <div className="custom-dropdown-menu">
                        <span className="dropdown-item-text">
                          Ticket Numbers:
                        </span>
                        <div className="dropdown-divider" />
                        {ticket.ticketNumber &&
                        ticket.ticketNumber.length > 0 ? (
                          ticket.ticketNumber.map((number, i) => (
                            <span key={i} className="dropdown-item">
                              {number}
                            </span>
                          ))
                        ) : (
                          <span className="dropdown-item text-muted">
                            No ticket numbers available
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td>{ticket.userName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {purchasedTickets.length > 0 && (
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

export default PurchasedLotteries;
