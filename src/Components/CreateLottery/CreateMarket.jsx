import React, { useEffect, useRef, useState } from "react";
import "./CreateMarket.css"; // Import custom styles
import { generateLotteryNumber } from "../../Utils/apiService";
import { toast } from "react-toastify";

const CreateMarket = () => {
  const [groupFrom, setGroupFrom] = useState("");
  const [groupTo, setGroupTo] = useState("");
  const [isGroupFromPickerVisible, setIsGroupFromPickerVisible] =
    useState(false);
  const [isGroupToPickerVisible, setIsGroupToPickerVisible] = useState(false);

  const [seriesFrom, setSeriesFrom] = useState("");
  const [seriesTo, setSeriesTo] = useState("");
  const [isSeriesFromPickerVisible, setIsSeriesFromPickerVisible] =
    useState(false);
  const [isSeriesToPickerVisible, setIsSeriesToPickerVisible] = useState(false);

  const [numberFrom, setNumberFrom] = useState("");
  const [numberTo, setNumberTo] = useState("");
  const [isNumberFromPickerVisible, setIsNumberFromPickerVisible] =
    useState(false);
  const [isNumberToPickerVisible, setIsNumberToPickerVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to trigger reload
  const [selectedDate, setSelectedDate] = useState(""); // Date state
  const [timerFrom, setTimerFrom] = useState(""); // New state for timer from
  const [timerTo, setTimerTo] = useState("");     // New state for timer to
  const [dropdownFromVisible, setDropdownFromVisible] = useState(false); // Track dropdown visibility for From
  const [dropdownToVisible, setDropdownToVisible] = useState(false); // Track dropdown visibility for To


  useEffect(() => {
    if (isSubmitted) {
      // window.location.reload();
    }
  }, [isSubmitted]);

  const handleGroupSelect = (value, type) => {
    if (type === "from") {
      setGroupFrom(value);
      setIsGroupFromPickerVisible(false);
    } else {
      setGroupTo(value);
      setIsGroupToPickerVisible(false);
    }
  };

  const handleSeriesSelect = (value, type) => {
    if (type === "from") {
      setSeriesFrom(value);
      setIsSeriesFromPickerVisible(false);
    } else {
      setSeriesTo(value);
      setIsSeriesToPickerVisible(false);
    }
  };

  const handleNumberSelect = (value, type) => {
    if (type === "from") {
      setNumberFrom(value);
      setIsNumberFromPickerVisible(false);
    } else {
      setNumberTo(value);
      setIsNumberToPickerVisible(false);
    }
  };

  const validateForm = () => {
    if (
      !groupFrom ||
      !groupTo ||
      !seriesFrom ||
      !seriesTo ||
      !numberFrom ||
      !numberTo|| 
      !timerFrom || 
      !timerTo
    ) {
      return "All fields must be filled out.";
    }

    if (parseInt(groupTo) < parseInt(groupFrom)) {
      return "Group 'To' must be greater than or equal to Group 'From'.";
    }

    if (seriesTo.toUpperCase() < seriesFrom.toUpperCase()) {
      return "Series 'To' must be greater than or equal to Series 'From'.";
    }

    if (parseInt(numberTo) < parseInt(numberFrom)) {
      return "Number 'To' must be greater than or equal to Number 'From'.";
    }
    if (parseInt(timerTo) < parseInt(timerFrom)) {
      return "Timer 'To' must be greater than or equal to Timer 'From'.";
    }

    return null;
  };

  // Function to handle form submission

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const requestBody = {
      group: {
        min: parseInt(groupFrom),
        max: parseInt(groupTo),
      },
      series: {
        start: seriesFrom,
        end: seriesTo,
      },
      number: {
        min: numberFrom,
        max: numberTo,
      },

      timer: {
        from: timerFrom,
        to: timerTo,
      },
      date: selectedDate,
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await generateLotteryNumber(requestBody);
      console.log("Success:", response);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Generate time options for every minute in a 12-hour format (AM/PM)
  const generateTimeOptions = () => {
    const options = [];
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinute = minute.toString().padStart(2, "0");
        const period = hour < 12 ? "AM" : "PM";
        const displayTime = `${formattedHour}:${formattedMinute} ${period}`;

        // Format for ISO
        const isoTime = new Date(`${today}T${hour.toString().padStart(2, "0")}:${formattedMinute}:00`).toISOString();
        
        options.push({ displayTime, isoTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

    // Handle change in manual input and synchronize with the dropdown options
    const handleManualInput = (value, setter) => {
      setter(value);
      setDropdownFromVisible(false); // Close the dropdown on manual input for From
      setDropdownToVisible(false); // Close the dropdown on manual input for To
    };

    const handleSelectTime = (selectedTime, setterFrom, setterTo, isFrom) => {
      if (isFrom) {
        setterFrom(selectedTime.displayTime); // Set the selected time in the 'From' input
      } else {
        setterTo(selectedTime.displayTime); // Set the selected time in the 'To' input
      }
      setDropdownFromVisible(false); // Close dropdown after selecting a time for 'From'
      setDropdownToVisible(false); // Close dropdown after selecting a time for 'To'
    };
  // Group Grid (01 to 99)
  const renderGroupGrid = (type) => {
    const groups = Array.from({ length: 99 }, (_, i) => (i + 1).toString()); // Generate groups from 38 to 99
    return (
      <div className="calendar-grid group-grid">
        {groups.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => handleGroupSelect(group, type)}
          >
            {group}
          </button>
        ))}
      </div>
    );
  };

  // Series Grid (A to Z)
  const renderSeriesGrid = (type) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // Generates letters A to Z
    return (
      <div className="calendar-grid series-grid">
        {letters.map((letter) => (
          <button
            key={letter}
            className="calendar-cell"
            onClick={() => handleSeriesSelect(letter, type)}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  // Numbers grid picker (0 to 99999)
  const renderNumberGrid = (
    type,
    rangeStart = 0,
    rangeEnd = 99999,
    isFormatted = true
  ) => {
    const numbers = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => i + rangeStart
    );

    return (
      <div className="calendar-grid number-grid">
        {numbers.map((number) => (
          <button
            key={number}
            className="calendar-cell"
            onClick={() =>
              handleNumberSelect(
                isFormatted
                  ? number.toString().padStart(5, "0")
                  : number.toString(),
                type
              )
            }
          >
            {isFormatted
              ? number.toString().padStart(5, "0")
              : number.toString()}{" "}
            {/* Show as 5 digits for numbers */}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "75vh", backgroundColor: "#f0f4f8" }}>
      {/* Custom Header */}
      <div
        className="text-center"
        style={{
          backgroundColor: "#e6f7ff",
          padding: "10px 0",
          borderBottom: "2px solid #4682B4",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          width: "100%",
        }}
      >
        <h2
          className="mb-1"
          style={{ color: "#4682B4", fontWeight: "bold", letterSpacing: "1px" }}
        >
          🎟️ Lottery Market
        </h2>
      </div>

      {/* Main Content */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "calc(75vh - 75px)", padding: "50px 0" }}
      >
        <div
          className="shadow-lg rounded-3"
          style={{
            padding: "50px",
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Body Content */}
          <div className="text-center">
            <h3
              className="mb-3"
              style={{ color: "#4682B4", fontWeight: "bold" }}
            >
              Choose Your Group, Series, and Number
            </h3>
              {/* Date Input */}
              <div className="mb-3">
              <label htmlFor="date" className="form-label" style={{ color: "#4682B4" }}>
                Select Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Group From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="From"
                    className="form-control"
                    value={groupFrom}
                    onFocus={() => setIsGroupFromPickerVisible(true)}
                    readOnly
                  />
                  {isGroupFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderGroupGrid("from", 38, 99, false)}{" "}
                      {/* Display range 38 to 99 without formatting */}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="To"
                    className="form-control"
                    value={groupTo}
                    onFocus={() => setIsGroupToPickerVisible(true)}
                    readOnly
                  />
                  {isGroupToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderGroupGrid("to", 38, 99, false)}{" "}
                      {/* Display range 38 to 99 without formatting */}
                    </div>
                  )}
                </div>
              </div>
              {/* <small className="text-muted mb-4">Group range from 38 to 99</small> */}
            </div>

            {/* Series From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Series From"
                    className="form-control"
                    value={seriesFrom}
                    onFocus={() => setIsSeriesFromPickerVisible(true)}
                    readOnly
                  />
                  {isSeriesFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderSeriesGrid("from")}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Series To"
                    className="form-control"
                    value={seriesTo}
                    onFocus={() => setIsSeriesToPickerVisible(true)}
                    readOnly
                  />
                  {isSeriesToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderSeriesGrid("to")}
                    </div>
                  )}
                </div>
              </div>
              {/* <small className="text-muted mb-4">Series range from A to L (excluding I & F)</small> */}
            </div>

            {/* Number From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Number From"
                    className="form-control"
                    value={numberFrom}
                    onFocus={() => setIsNumberFromPickerVisible(true)}
                    readOnly
                  />
                  {isNumberFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderNumberGrid("from", 0, 99999, true)}{" "}
                      {/* Display range 0 to 99999 with formatting */}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Number To"
                    className="form-control"
                    value={numberTo}
                    onFocus={() => setIsNumberToPickerVisible(true)}
                    readOnly
                  />
                  {isNumberToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderNumberGrid("to", 0, 99999, true)}{" "}
                      {/* Display range 0 to 99999 with formatting */}
                    </div>
                  )}
                </div>
              </div>
              {/* <small className="text-muted mb-4">Number range from 00000 to 99999</small> */}
            </div>
    {/* Timer From and To */}
    <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                {/* Timer From */}
                <div className="mx-1" style={{ width: "40%", position: "relative"}}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Timer From (hh:mm AM/PM)"
                    value={timerFrom}
                    onClick={() => setDropdownFromVisible(true)} // Show dropdown for From when clicked
                    onChange={(e) => handleManualInput(e.target.value, setTimerFrom)}
                    style={{ width: "100%" }}
                  />
                  {/* Dropdown Below the Input */}
                  {dropdownFromVisible && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        width: "100%",
                        height: "200px", // Fixed height
                        overflowY: "auto", // Scrollable dropdown
                      }}
                    >
                      {timeOptions.map((time, index) => (
                        <button
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleSelectTime(time, setTimerFrom, setTimerTo, true)}
                        >
                          {time.displayTime}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>-</span>

                {/* Timer To */}
                <div className="mx-1" style={{ width: "40%", position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Timer To (hh:mm AM/PM)"
                    value={timerTo}
                    onClick={() => setDropdownToVisible(true)} // Show dropdown for To when clicked
                    onChange={(e) => handleManualInput(e.target.value, setTimerTo, false )}
                    style={{ width: "100%" }}
                  />
                  {/* Dropdown Below the Input */}
                  {dropdownToVisible && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        width: "100%",
                        height: "200px", // Fixed height
                        overflowY: "auto", // Scrollable dropdown
                      }}
                    >
                      {timeOptions.map((time, index) => (
                        <button
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleSelectTime(time, setTimerFrom, setTimerTo)}
                        >
                          {time.displayTime}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary btn-block mt-4"
              style={{ backgroundColor: "#4682B4", border: "none" }}
              onClick={handleSubmit}
            >
              Create Market
            </button>
          </div>
        </div>
      </div>
      {/* Footer with Marquee */}
      <div
        style={{
          backgroundColor: "#4682B4",
          padding: "10px",
          color: "#ffffff",
        }}
      >
        <marquee
          behavior="scroll"
          direction="left"
          style={{ fontSize: "1.2rem", whiteSpace: "nowrap" }}
        >
          🎉 Exciting updates are on the way! Stay connected for the latest news
          on our lottery market! 🎉
        </marquee>
      </div>
    </div>
  );
};

export default CreateMarket;
