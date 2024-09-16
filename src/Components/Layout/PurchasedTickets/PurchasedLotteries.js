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
import CustomModal from "../Common/modal";

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

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // State to manage modal data
  useEffect(() => {
    fetchPurchasedLotteryTickets();
  }, [pagination.page, pagination.limit]);

  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  const fetchPurchasedLotteryTickets = async () => {
    const response = await getPurchasedLotteryTickets({
      page: pagination.page,
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
    });
    console.log('line 43',response);
    if (response && response.success) {
      setPurchasedTickets(response.data);
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      });
      dispatch({
        type: strings.PURCHASED_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch purchased tickets");
    }
    setLoading(false); // Set loading to false after the data is fetched
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    // Fetch or filter data based on the new page number here
  };

  const handleDelete = (ticket) => {
    console.log(`Delete ticket with id: ${ticket}`);

    setModalData(ticket); // Set the ticket data to be used in the modal
    setShowModal(true); //
  };

  const handleConfirmDelete = async () => {
    if (modalData) {
      const response = await PurchasedLotteryTicketsDelete(
        modalData.purchaseId
      );
      if (response && response.success) {
        // Remove deleted ticket from the list
        setPurchasedTickets((prev) =>
          prev.filter((ticket) => ticket.purchaseId !== modalData.purchaseId)
        );
        setShowModal(false); // Hide the modal
        console.log(`Deleted ticket with id: ${modalData.purchaseId}`);
      } else {
        console.error("Failed to delete ticket");
      }
    }
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
    <div
      className="container mt-4 p-3"
      style={{
        background: "#e6f7ff",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header with delete icon */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ position: "relative" }}
      >
        <h2 style={{ color: "#4682B4" }}>Purchased Lottery Tickets</h2>
        <i
          // className="fas fa-trash-alt"
          className="fas fa-trash"
          style={{
            cursor: "pointer",
            fontSize: "2rem",
            // color: "#e74c3c",
            position: "absolute",
            right: "0",
          }}
          title="Delete all purchased history"
          onClick={() => handleDelete()}
          // onClick={handleDeleteAll} // Add your delete all logic here
        ></i>
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
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {purchasedTickets.length > 0 ? (
            purchasedTickets.map((ticket, index) => (
              <tr key={ticket.purchaseId}>
                <td>{startIndex + index}</td>
                <td>{ticket.name}</td>
                <td>{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                <td>{new Date(ticket.drawTime).toLocaleTimeString()}</td>
                <td>{ticket.purchaseAmount}</td>
                <td>{ticket.sem}</td>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.userName}</td>
                {/* <td>
                  <i
                    className="fas fa-trash"
                    onClick={() => handleDelete(ticket)}
                    // style={{ cursor: 'pointer', color: '#e74c3c' }}
                  />
                </td> */}
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
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        handlePageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={pagination.totalItems}
      />

      <CustomModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        heading={
          <span
            className="text-danger "
            style={{ fontWeight: "900", fontSize: "1.5rem" }}
          >
            Alert !
          </span>
        }
        inputs={[
          {
            label: (
              <>
                Are you sure you want to delete all the purchase history of
                users?
              </>
            ),
          },
        ]}
        buttonLabel="Delete"
        onButtonClick={handleConfirmDelete}
        cancelButtonLabel="Cancel"
        textOnly={true}
      />
    </div>
  );
};

export default PurchasedLotteries;
