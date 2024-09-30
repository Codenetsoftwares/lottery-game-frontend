import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contextApi/context";
import {
  getPurchasedLotteryTickets,
  PurchasedLotteryTicketsDelete,
} from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { Table, Spinner ,Form,Button} from "react-bootstrap";
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
  const [searchParams, setSearchParams] = useState({
    purchaseDate: "",
    sem: "",
    
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
    setLoading(true);
    const response = await getPurchasedLotteryTickets({     ///api/allPurchase-Lotteries
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      totalPages: pagination.totalPages || 0,
      totalItems: pagination.totalItems || 0,
      sem: searchParams.sem,
     purchaseDate: searchParams.purchaseDate,
    });
    console.log('line 43',response);
    if (response && response.success) {
      setPurchasedTickets(response.data);
      setPagination({
        page: response?.pagination?.page,
        limit: response?.pagination?.limit,
        totalPages: response?.pagination?.totalPages,
        totalItems: response?.pagination?.totalItems,
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

  useEffect(() => {
    if (searchParams.sem || searchParams.purchaseDate) {
      fetchPurchasedLotteryTickets(); // Call the API when either sem or date has a value
    }
  }, [searchParams.sem, searchParams.purchaseDate]);

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
   
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPurchasedTickets([]);  // Clear the old data
    setPagination((prev) => ({ ...prev, page: 1 }));  // Reset to first page on search
   fetchPurchasedLotteryTickets();  // Fetch new data
  // window.location.reload();
  };
  const inputStyle = {
    width: "150px",
    border: searchParams.sem ? "2px solid blue" : "1px solid #ccc", // Change border color when input is not empty
    backgroundColor: searchParams.sem ? "#e6ffe6" : "white", // Change background color when input has value
    padding: "10px",
    borderRadius: "4px",
    boxShadow: searchParams.sem ? "0 0 10px rgba(0, 255, 0, 0.5)" : "none", // Add box-shadow when input is not empty
    transition: "all 0.3s ease", // Smooth transition when styles change
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
          <div className="d-flex justify-content-center w-100">
      <h2 style={{ color: "#4682B4",  }}>Purchased Lottery Tickets</h2>
      </div>
     {/* Only show the search dropdown when no search type is selected */}
     <div>
        {!searchParams.searchType && (
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group className="d-flex">
              {/* Search Criteria Dropdown */}
              <Form.Control
                as="select"
                name="searchType"
                value={searchParams.searchType}
                onChange={handleSearchInputChange}
                className="mr-2"
                style={{ width: "200px" }}
              >
                <option value="">Select Criteria</option>
                <option value="sem">Search by SEM</option>
                <option value="purchaseDate">Search by Purchase Date</option>
              </Form.Control>
              
            </Form.Group>
          </Form>
        )}

        {/* Conditionally Render the Input based on Selected Criteria */}
        {searchParams.searchType === "sem" && (
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                name="sem"
                value={searchParams.sem}
                onChange={handleSearchInputChange}
                placeholder="Enter SEM"
                className="mr-2"
                style={inputStyle}
              />
             
            </Form.Group>
          </Form>
        )}

        {searchParams.searchType === "purchaseDate" && (
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group className="d-flex">
              <Form.Control
                type="date"
                name="purchaseDate"
                value={searchParams.purchaseDate}
                onChange={handleSearchInputChange}
                className="mr-2"
                style={inputStyle} 
              />
              
            </Form.Group>
          </Form>
        )} 
        </div>    {/* <i
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
        ></i> */}
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
          {purchasedTickets && purchasedTickets?.length > 0? (
            purchasedTickets.map((ticket, index) => (
              <tr key={ticket.purchaseId}>
                <td>{startIndex + index}</td>
                <td>{ticket.name}</td>
                <td>{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                <td>{new Date(ticket.drawTime).toLocaleTimeString()}</td>
                <td>{ticket.purchaseAmount}</td>
                <td>{ticket.sem}</td>
                <td>
           
            <select>
              {Array.isArray(ticket.ticketNumber)  //if ticketno is array
                ? ticket.ticketNumber.map((ticketNum, idx) => (
                    <option key={idx} value={ticketNum}>
                      {ticketNum}
                    </option>
                  ))
                : ticket.ticketNumber
                    ?.split(" ") // Split if it's a string(split is nt work wth array)
                    .map((ticketNum, idx) => (
                      <option key={idx} value={ticketNum}>
                        {ticketNum}
                      </option>
                    ))}
            </select>
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
