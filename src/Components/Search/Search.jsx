import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Search.css";
import { LotteryRange, SearchLotteryTicket } from "../../Utils/apiService";
import { getLotteryRange } from "../../Utils/getInitialState";
import {
  generateGroups,
  generateNumbers,
  generateSeries,
} from "../../Utils/helper";
import useDebouncedFilter from "../../Utils/customHook/useDebouncedFilter";

const Search = ({
  filteredNumbers,
  filteredGroups,
  filteredSeries,
  setFilteredNumbers,
  setFilteredGroups,
  setFilteredSeries,
  lotteryRange,
}) => {
  console.log(
    "filteredNumbers",
    filteredNumbers,
    filteredGroups,
    filteredSeries
  );
  const [sem, setSem] = useState("");
  const [group, setGroup] = useState("");
  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");
  const [isGroupPickerVisible, setIsGroupPickerVisible] = useState(false);
  const [isSeriesPickerVisible, setIsSeriesPickerVisible] = useState(false);
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [errors, setErrors] = useState({});

  const { debouncedFilter } = useDebouncedFilter();

  const handleNumberInputChange = (e) => {
    const inputValue = e.target.value;
    setNumber(inputValue);

    debouncedFilter(
      inputValue,
      () => generateNumbers(lotteryRange.number_start, lotteryRange.number_end),
      1500,
      setFilteredNumbers
    ); // Pass type as "number"
  };

  const handleGroupInputChange = (e) => {
    const inputValue = e.target.value;
    setGroup(inputValue);

    debouncedFilter(
      inputValue,
      () => generateNumbers(lotteryRange.group_start, lotteryRange.group_end),
      1500,
      setFilteredGroups
    ); // Pass type as "group"
  };

  const handleSeriesInputChange = (e) => {
    const inputValue = e.target.value;
    setSeries(inputValue);

    debouncedFilter(
      inputValue,
      () => generateSeries(lotteryRange.series_start, lotteryRange.series_end),
      1500,
      setFilteredSeries
    ); // Pass type as "series"
  };

  // Validation function
  const validateFields = () => {
    const newErrors = {};
    if (!sem) newErrors.sem = "SEM is required.";
    if (!group) newErrors.group = "Group is required.";
    if (!series) newErrors.series = "Series is required.";
    if (!number || number.length !== 5)
      newErrors.number = "A valid 5-digit number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeOtherPickers = (activePicker) => {
    if (activePicker !== "group") setIsGroupPickerVisible(false);
    if (activePicker !== "series") setIsSeriesPickerVisible(false);
    if (activePicker !== "number") setIsNumberPickerVisible(false);
  };

  const groupLength =
    Math.abs(lotteryRange.group_end - lotteryRange.group_start) + 1;

  const renderGroupGrid = () => {
    const groups = Array.from({ length: groupLength }, (_, i) =>
      (i + lotteryRange.group_start).toString()
    );
    return (
      <div className="calendar-grid">
        {filteredGroups.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => handleGroupSelect(group)}
          >
            {group}
          </button>
        ))}
      </div>
    );
  };

  const renderNumberGrid = () => {
    return (
      <div className="calendar-grid">
        {filteredNumbers.length === 0 ? (
          <div className="text-center">No Results</div>
        ) : (
          filteredNumbers.map((num) => (
            <button
              key={num}
              className="calendar-cell"
              onClick={() =>
                handleNumberSelect(num.toString().padStart(5, "0"))
              }
            >
              {num.toString().padStart(5, "0")}
            </button>
          ))
        )}
      </div>
    );
  };

  const renderSeriesGrid = () => {
    return (
      <div className="calendar-grid">
        {filteredSeries.length === 0 ? (
          <div className="text-center">No Results</div>
        ) : (
          filteredSeries.map((letter) => (
            <button
              key={letter}
              className="calendar-cell"
              onClick={() => handleSeriesSelect(letter)}
            >
              {letter}
            </button>
          ))
        )}
      </div>
    );
  };

  const handleSemChange = (e) => {
    setSem(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, sem: undefined }));
    }
  };

  const handleGroupSelect = (value) => {
    setGroup(value);
    setIsGroupPickerVisible(false);
    closeOtherPickers("group");
  };

  const handleSeriesSelect = (value) => {
    setSeries(value);
    setIsSeriesPickerVisible(false);
    closeOtherPickers("series");
  };

  const handleNumberSelect = (value) => {
    setNumber(value);
    setIsNumberPickerVisible(false);
    closeOtherPickers("number");
  };

  const handleSearch = async () => {
    if (!validateFields()) return; // Validate before searching

    const requestBody = {
      group: group ? String(group) : null,
      series: series ? String(series) : null,
      number: number ? String(number) : null,
      sem: sem ? String(sem) : null,
    };

    try {
      const response = await SearchLotteryTicket(requestBody);
      setResponseData(response.data);
      setShowSearch(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ minHeight: "55vh", backgroundColor: "#f0f4f8" }}
    >
      <div
        className="border border-3 rounded-3 shadow-lg"
        style={{
          padding: "40px",
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
        }}
      >
        {showSearch ? (
          <>
            <div className="text-center mb-4">
              <h2
                className="mb-1"
                style={{
                  color: "#4682B4",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                🔍 Search Lottery Tickets
              </h2>
            </div>

            {/* SEM Input Field */}
            <div className="mb-4">
              <label
                htmlFor="sem"
                className="form-label"
                style={{ color: "#4682B4", fontWeight: "bold" }}
              >
                Select SEM
              </label>
              <select
                id="sem"
                className="form-select"
                value={sem}
                onChange={handleSemChange}
              >
                <option value="">Choose SEM</option>
                <option value="5">5 SEM</option>
                <option value="10">10 SEM</option>
                <option value="25">25 SEM</option>
                <option value="50">50 SEM</option>
                <option value="100">100 SEM</option>
                <option value="200">200 SEM</option>
              </select>
              {errors.sem && (
                <small className="text-danger">{errors.sem}</small>
              )}
            </div>

            {/* Group Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Group"
                  className="form-control"
                  value={group}
                  onFocus={() => {
                    setIsGroupPickerVisible(true);
                    closeOtherPickers("group"); // Close other dropdowns
                  }}
                  onChange={handleGroupInputChange}
                />
                {isGroupPickerVisible && (
                  <div className="picker-dropdown">{renderGroupGrid()}</div>
                )}
                {errors.group && (
                  <small className="text-danger">{errors.group}</small>
                )}
              </div>
            </div>

            {/* Series Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Series"
                  className="form-control"
                  value={series}
                  onFocus={() => {
                    setIsSeriesPickerVisible(true);
                    closeOtherPickers("series"); // Close other dropdowns
                  }}
                  onChange={handleSeriesInputChange}
                />
                {isSeriesPickerVisible && (
                  <div className="picker-dropdown">{renderSeriesGrid()}</div>
                )}
                {errors.series && (
                  <small className="text-danger">{errors.series}</small>
                )}
              </div>
            </div>

            {/* Number Input */}
            <div className="mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Number"
                  className="form-control"
                  value={number}
                  onFocus={() => {
                    setIsNumberPickerVisible(true);
                    closeOtherPickers("number"); // Close other dropdowns
                  }}
                  onChange={handleNumberInputChange}
                />
                {isNumberPickerVisible && (
                  <div className="picker-dropdown">{renderNumberGrid()}</div>
                )}
                {errors.number && (
                  <small className="text-danger">{errors.number}</small>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                style={{ backgroundColor: "#4682B4" }}
              >
                Search
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>
              Search Results:
            </h4>
            <div
              className="mt-3"
              style={{
                maxHeight:
                  responseData &&
                  responseData.tickets &&
                  responseData.tickets.length > 8
                    ? "150px"
                    : "auto", // Apply max height for scrolling only if there are more than 8 tickets
                overflowY:
                  responseData &&
                  responseData.tickets &&
                  responseData.tickets.length > 8
                    ? "auto"
                    : "visible", // Enable Y-scroll if more than 8 tickets
              }}
            >
              {responseData &&
              responseData.tickets &&
              responseData.tickets.length > 0 ? (
                <>
                  <h5>Tickets:</h5>
                  <ul>
                    {responseData.tickets.map((ticket, index) => (
                      <li key={index} style={{ color: "#3b6e91" }}>
                        {ticket}
                      </li>
                    ))}
                  </ul>
                  <h5>
                    Price:{" "}
                    <span style={{ color: "#3b6e91" }}>
                      ₹{responseData.price}
                    </span>
                  </h5>
                  <h5>
                    SEM:{" "}
                    <span style={{ color: "#3b6e91" }}>{responseData.sem}</span>
                  </h5>
                </>
              ) : (
                <h5 style={{ color: "#3b6e91" }}>
                  {responseData
                    ? responseData.message || "No tickets found."
                    : "No data available."}
                </h5>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
