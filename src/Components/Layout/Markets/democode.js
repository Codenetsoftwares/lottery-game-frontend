import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

export const getLotteryMarketsInitialState = (body = {}) => {
  return {
    randomToken: body.randomToken ?? "",
    lotteryCards: body.lotteryCards ?? [],
    lotteryId: body.lotteryId ?? "",
    isModalOpen: body.isModalOpen ?? false,
    search: body.search ?? "",
    inputs: body.inputs ?? {
      name: "",
      DateTime: "",
      firstPrize: "",
      sem: "",
      tickets: [],
      price: "",
    },
    showModal: body.showModal ?? false,
    showTicketModal: body.showTicketModal ?? false,
    showEditTicketModal: body.showEditTicketModal ?? false,

    // Pagination fields integrated
    pagination: {
      page: body.pagination?.page ?? 1,
      limit: body.pagination?.limit ?? 10,
      totalPages: body.pagination?.totalPages ?? 0,
      totalItems: body.pagination?.totalItems ?? 0,
    },
    showDeleteModal: body.showDeleteModal ?? false,
    selectedTicketCount: body.selectedTicketCount ?? 5,
  };
};

const LotterySearch = ({ fetchLotteryTickets }) => {
  const [state, setState] = useState(getLotteryMarketsInitialState); // Initialize state with your helper function
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch lottery tickets with pagination and search
  const fetchData = async (searchTerm = state.search, newPage = state.pagination.page) => {
    try {
      setIsLoading(true);
      const response = await fetchLotteryTickets(searchTerm, newPage);
      if (response) {
        const filteredTickets = response.data.filter((item) => item !== null);
        setState((prevState) => ({
          ...prevState,
          lotteryCards: newPage === 1 ? filteredTickets : [...prevState.lotteryCards, ...filteredTickets],
          pagination: {
            ...prevState.pagination,
            totalPages: response.pagination ? response.pagination.totalPages : 0,
            totalItems: response.pagination ? response.pagination.totalItems : 0,
          },
        }));
        setHasMore(newPage < (response.pagination?.totalPages || 0));
      }
    } catch (error) {
      console.error("Error fetching lottery tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search for smoother user experience
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      setState((prevState) => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          page: 1, // Reset page to 1 on new search
        },
      }));
      fetchData(searchTerm, 1); // Fetch new data based on search
    }, 1300),
    []
  );

  useEffect(() => {
    debouncedSearchHandler(state.search);
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [state.search, debouncedSearchHandler]);

  // Handle search input change
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setState((prevState) => ({
      ...prevState,
      search: searchValue,
    }));

    if (!searchValue) {
      setState((prevState) => ({
        ...prevState,
        lotteryCards: [], // Clear the tickets list when the search is empty
      }));
    }
  };

  // Load more data when user scrolls
  const fetchMoreData = () => {
    if (hasMore) {
      setState((prevState) => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          page: prevState.pagination.page + 1, // Increment page number
        },
      }));
    }
  };

  // Fetch more data when page changes
  useEffect(() => {
    if (state.pagination.page > 1) {
      fetchData(state.search, state.pagination.page);
    }
  }, [state.pagination.page]);

  return (
    <div className="lottery-search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Lottery Tickets by SEM"
          className="form-control rounded-pill shadow"
          value={state.search}
          onChange={handleSearch}
          style={{
            padding: "10px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            marginRight: "15px",
            width: "250px",
          }}
        />
      </div>

      {/* Display Lottery Tickets */}
      <div className="lottery-tickets-list">
        {state.lotteryCards.map((ticket, index) => (
          <div key={index} className="lottery-ticket-item">
            {/* Customize the ticket card */}
            <p>{ticket.name}</p>
            {/* Add other ticket details */}
          </div>
        ))}

        {isLoading && <p>Loading...</p>}
      </div>

      {/* Trigger fetchMoreData when user scrolls down */}
      <div>
        {hasMore && (
          <button onClick={fetchMoreData} className="load-more-btn">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default LotterySearch;
