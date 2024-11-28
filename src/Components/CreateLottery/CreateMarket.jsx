import React, { useEffect, useRef, useState } from "react";
import "./CreateMarket.css"; // Import custom styles
import { generateLotteryNumber } from "../../Utils/apiService";
import { toast } from "react-toastify";
import useDebouncedFilter from "../../Utils/customHook/useDebouncedFilter";
import { generateNumbers, generateSeries } from "../../Utils/helper";

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

  const [filterGroupFrom, setFilterGroupFrom] = useState([]);
  const [filterSeriesFrom, setFilterSeriesFrom] = useState([]);
  const [filterNumberFrom, setFilterNumberFrom] = useState([]);
  const [filterGroupTo, setFilterGroupTo] = useState([]);
  const [filterSeriesTo, setFilterSeriesTo] = useState([]);
  const [filterNumberTo, setFilterNumberTo] = useState([]);
  // const [selectedDate, setSelectedDate] = useState("")
  const [price, setPrice] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const rangeStart = 0;
  const rangeEnd = 99999;
  const { debouncedFilter } = useDebouncedFilter();
  const [marketName, setMarketName] = useState("");
  const [marketNameError, setMarketNameError] = useState("");

  const [timerFrom, setTimerFrom] = useState(""); // New state for timer from
  const [timerTo, setTimerTo] = useState(""); // New state for timer to
  const [dropdownFromVisible, setDropdownFromVisible] = useState(false); // Track dropdown visibility for From
  const [dropdownToVisible, setDropdownToVisible] = useState(false); // Track dropdown visibility for To
  const [activePicker, setActivePicker] = useState(null);
  const [errors, setErrors] = useState("");
  const groupFromRef = useRef(null);
  const groupToRef = useRef(null);
  const seriesFromRef = useRef(null);
  const seriesToRef = useRef(null);
  const numberFromRef = useRef(null);
  const numberToRef = useRef(null);
  const timerFromRef = useRef(null);
  const timerToRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    // Set today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      // window.location.reload();
    }
  }, [isSubmitted]);

  useEffect(() => {
    // Groups: 38 to 99
    const groupsTo = Array.from({ length: 99 }, (_, i) => (i + 1).toString());
    setFilterGroupFrom(groupsTo);
    const groupsFrom = Array.from({ length: 99 }, (_, i) => (i + 1).toString());
    setFilterGroupTo(groupsFrom);

    // Series: A to L, excluding I and F
    const lettersFrom = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    setFilterSeriesFrom(lettersFrom);
    const lettersTo = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    setFilterSeriesTo(lettersTo);

    // Numbers: 0 to 99999 (or any specified range)
    const numbersFrom = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => (i + rangeStart).toString().padStart(5, "0")
    );
    setFilterNumberFrom(numbersFrom);
    const numbersTo = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => (i + rangeStart).toString().padStart(5, "0")
    );
    setFilterNumberTo(numbersTo);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        groupFromRef.current &&
        !groupFromRef.current.contains(event.target) &&
        groupToRef.current &&
        !groupToRef.current.contains(event.target) &&
        seriesFromRef.current &&
        !seriesFromRef.current.contains(event.target) &&
        seriesToRef.current &&
        !seriesToRef.current.contains(event.target) &&
        numberFromRef.current &&
        !numberFromRef.current.contains(event.target) &&
        numberToRef.current &&
        !numberToRef.current.contains(event.target) &&
        timerFromRef.current &&
        !timerFromRef.current.contains(event.target) &&
        timerToRef.current &&
        !timerToRef.current.contains(event.target)
      ) {
        setActivePicker(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleGroupFromInputChange = (e) => {
    const inputValue = e.target.value;
    setGroupFrom(inputValue);

    debouncedFilter(
      inputValue,
      () => Array.from({ length: 99 }, (_, i) => (i + 1).toString()),
      1500,
      setFilterGroupFrom
    ); // Pass type as "group"
  };

  const handleGroupToInputChange = (e) => {
    const inputValue = e.target.value;
    setGroupTo(inputValue);

    debouncedFilter(
      inputValue,
      () => Array.from({ length: 99 }, (_, i) => (i + 1).toString()),
      1500,
      setFilterGroupTo
    ); // Pass type as "group"
  };

  const handleSeriesFromInputChange = (e) => {
    const inputValue = e.target.value;
    setSeriesFrom(inputValue);

    debouncedFilter(
      inputValue,
      () => {
        const lettersFrom = Array.from({ length: 26 }, (_, i) =>
          String.fromCharCode(65 + i)
        );
        return lettersFrom;
      },
      1500,
      setFilterSeriesFrom
    );
    // Pass type as "series"
  };

  const handleSeriesToInputChange = (e) => {
    const inputValue = e.target.value;
    setSeriesTo(inputValue);

    debouncedFilter(
      inputValue,
      () => {
        const lettersFrom = Array.from({ length: 26 }, (_, i) =>
          String.fromCharCode(65 + i)
        );
        return lettersFrom;
      },
      1500,
      setFilterSeriesTo
    );
    // Pass type as "series"
  };

  const handleNumberFromInputChange = (e) => {
    const inputValue = e.target.value;
    setNumberFrom(inputValue);

    debouncedFilter(
      inputValue,
      () =>
        Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) =>
          (i + rangeStart).toString().padStart(5, "0")
        ),
      1500,
      setFilterNumberFrom
    ); // Pass type as "number"
  };

  const handleNumberToInputChange = (e) => {
    const inputValue = e.target.value;
    setNumberTo(inputValue);

    debouncedFilter(
      inputValue,
      () =>
        Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) =>
          (i + rangeStart).toString().padStart(5, "0")
        ),
      1500,
      setFilterNumberTo
    ); // Pass type as "number"
  };

  const validateForm = () => {
    if (
      !groupFrom ||
      !groupTo ||
      !seriesFrom ||
      !seriesTo ||
      !numberFrom ||
      !numberTo ||
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
  const validateFields = () => {
    const handleError = {};

    // Clear previous errors
    setErrors({});

    // Validation checks
    if (!groupFrom) handleError.groupFrom = "Group From is required";
    if (!groupTo) handleError.groupTo = "Group To is required";
    if (!seriesFrom) handleError.seriesFrom = "Series From is required";
    if (!seriesTo) handleError.seriesTo = "Series To is required";
    if (!numberFrom) handleError.numberFrom = "Number From is required";
    if (!numberTo) handleError.numberTo = "Number To is required";
    if (!timerFrom) handleError.timerFrom = "Timer From is required";
    if (!timerTo) handleError.timerTo = "Timer To is required";


    if (Object.keys(handleError).length > 0) {
      setErrors(handleError);
      return false;
    }
    return true;
  };

  // Function to format a date to "YYYY-MM-DD"
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to convert "hh:mm AM/PM" format to ISO datetime string
  const convertToISODateTime = (time, date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }

    const match = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (!match) {
      throw new Error("Invalid time format. Expected format: hh:mm AM/PM");
    }

    const [_, hours, minutes, period] = match;
    const isPM = period.toUpperCase() === "PM";
    const adjustedHours = (parseInt(hours) % 12) + (isPM ? 12 : 0);

    const dateTimeString = `${date}T${adjustedHours
      .toString()
      .padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
    const dateTime = new Date(dateTimeString);

    if (isNaN(dateTime)) {
      throw new Error(
        "Invalid time value. Failed to create a valid Date object."
      );
    }

    const isoDateTime = new Date(
      dateTime.getTime() - dateTime.getTimezoneOffset() * 60000
    ).toISOString();
    console.log("Converted time to ISO:", isoDateTime);
    return isoDateTime;
  };

  // Your handleSubmit function
  const handleSubmit = async () => {
    try {
      // Validate fields before making the request
      if (!validateFields()) return;

      const error = validateForm();
      if (error) {
        setMarketNameError(error); // Show validation error below the field
        return;
      }

      // const seriesLength = generateSeries(seriesFrom, seriesTo);
      // if (seriesLength.length < 10) {
      //   setMarketNameError("Series must have a minimum range of 10 alphabets");
      //   return;
      // }

      // Format today's date as "YYYY-MM-DD"
      const selectedDate = formatDateToYYYYMMDD(new Date());
      const isoDate = new Date(selectDate).toISOString();

      // Prepare the request payload
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
        price: Number(price),
        date: isoDate,
        start_time: convertToISODateTime(timerFrom, selectedDate),
        end_time: convertToISODateTime(timerTo, selectedDate),
        marketName: marketName,
      };

      console.log("Request Body:", requestBody);

      // Make the API call
      const response = await generateLotteryNumber(requestBody);

      if (response.success) {
        // Clear the form and reset state
        setMarketNameError(""); // Clear any previous error
        setIsSubmitted(true);
        setGroupFrom("");
        setGroupTo("");
        setSeriesFrom("");
        setSeriesTo("");
        setNumberFrom("");
        setNumberTo("");
        setTimerFrom("");
        setTimerTo("");
        setMarketName("");
        setPrice("");
        setSelectDate("");
      } else if (response.responseCode === 400) {
        // Handle backend validation error
        setMarketNameError(response.errMessage); // Show backend error below the input field
      } else {
        // Show unexpected error below the field
        setMarketNameError("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Show error below the input field
      setMarketNameError("A market with this name already exists for the selected date.");
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
        const isoTime = new Date(
          `${today}T${hour.toString().padStart(2, "0")}:${formattedMinute}:00`
        ).toISOString();

        options.push({ displayTime, isoTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Handle change in manual input and synchronize with the dropdown options
  const handleManualInput = (value, setter) => {
    console.log("====>>> value on onchange", value);
    setter(value); // Ensure that setter directly updates the state
    console.log("====>>> value after setter", value);
    setDropdownFromVisible(false); // Close the dropdown on manual input for From
    setDropdownToVisible(false); // Close the dropdown on manual input for To
  };

  const handleSelectTime = (selectedTime, setterFrom, setterTo, isFrom) => {
    console.log("===>> line316", selectedTime, setterFrom, setterTo, isFrom);
    if (isFrom) {
      setterFrom(selectedTime.displayTime); // Set the selected time in the 'From' input
    } else {
      setterTo(selectedTime.displayTime); // Set the selected time in the 'To' input
    }
    setDropdownFromVisible(false); // Close dropdown after selecting a time for 'From'
    setDropdownToVisible(false); // Close dropdown after selecting a time for 'To'
  };

  // Group Grid (01 to 99)
  const renderGroupFromGrid = (type) => {
    return (
      <div className="calendar-grid group-grid">
        {filterGroupFrom.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => {
              handleGroupSelect(group, type);
              setActivePicker(null);
            }}
          >
            {group}
          </button>
        ))}
      </div>
    );
  };

  const renderGroupToGrid = (type) => {
    return (
      <div className="calendar-grid group-grid">
        {filterGroupTo.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => {
              handleGroupSelect(group, type);
              setActivePicker(null);
            }}
          >
            {group}
          </button>
        ))}
      </div>
    );
  };

  // Series Grid (A to L, excluding I and F)
  const renderSeriesFromGrid = (type) => {
    return (
      <div className="calendar-grid series-grid">
        {filterSeriesFrom.map((letter) => (
          <button
            key={letter}
            className="calendar-cell"
            onClick={() => {
              handleSeriesSelect(letter, type);
              setActivePicker(null);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  const renderSeriesToGrid = (type) => {
    return (
      <div className="calendar-grid series-grid">
        {filterSeriesTo.map((letter) => (
          <button
            key={letter}
            className="calendar-cell"
            onClick={() => {
              handleSeriesSelect(letter, type);
              setActivePicker(null);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  // Numbers grid picker (00000 to 99999)
  const renderNumberFromGrid = (type, isFormatted = true) => {
    return (
      <div className="calendar-grid number-grid">
        {filterNumberFrom.map((number) => (
          <button
            key={number}
            className="calendar-cell"
            onClick={() => {
              handleNumberSelect(
                isFormatted
                  ? number.toString().padStart(5, "0")
                  : number.toString(),
                type
              );
              setActivePicker(null);
            }}
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

  const renderNumberToGrid = (type, isFormatted = true) => {
    return (
      <div className="calendar-grid number-grid">
        {filterNumberTo.map((number) => (
          <button
            key={number}
            className="calendar-cell"
            onClick={() => {
              handleNumberSelect(
                isFormatted
                  ? number.toString().padStart(5, "0")
                  : number.toString(),
                type
              );
              setActivePicker(null);
            }}
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
        style={{ padding: "42px 0" }}
      >
        <div
          className="shadow-lg rounded-4"
          style={{
            padding: "50px",
            width: "100%",
            maxWidth: "800px",
            backgroundColor: " rgb(230, 247, 255)",
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
            <div className="mb-0">
              <label
                htmlFor="date"
                className="form-label"
                style={{ color: "#4682B4" }}
              >
                Select Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={selectDate}
                min={currentDate}
                defaultValue={currentDate}
                onFocus={(e) => (e.target.type = "date")}
                onChange={(e) => setSelectDate(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                id="marketName"
                className={`form-control ${marketNameError ? "is-invalid" : ""}`} // Adds red border if error exists
                placeholder="Market Name"
                value={marketName}
                onChange={(e) => {
                  setMarketName(e.target.value);
                  setMarketNameError(""); // Clear the error when the user starts typing
                }}
              />
              {/* Show the error message dynamically below the input field */}
              {marketNameError && <div className="invalid-feedback">{marketNameError}</div>}
            </div>

            {/* <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  style={{ width: "83%" }}
                >
                  <input
                    type="date"
                    className="form-control"
                    min={currentDate} 
                    defaultValue={currentDate} 
                    onFocus={(e) => (e.target.type = "date")} // Ensure proper display on focus
                  />
                </div>
              </div>
            </div> */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  ref={groupFromRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="From"
                    className="form-control"
                    value={groupFrom}
                    onFocus={() => setActivePicker("groupFrom")}
                    onClick={() => setIsGroupFromPickerVisible(true)}
                    onChange={handleGroupFromInputChange}
                  />
                  {activePicker === "groupFrom" && (
                    <div className="picker-dropdown">
                      {renderGroupFromGrid("from", 38, 99, false)}{" "}
                    </div>
                  )}
                  {errors.groupFrom && (
                    <small className="text-danger">{errors.groupFrom}</small>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  ref={groupToRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="To"
                    className="form-control"
                    value={groupTo}
                    onFocus={() => setActivePicker("groupTo")}
                    onClick={() => setIsGroupToPickerVisible(true)}
                    onChange={handleGroupToInputChange}
                  />
                  {activePicker === "groupTo" && (
                    <div className="picker-dropdown">
                      {renderGroupToGrid("to", 38, 99, false)}{" "}
                    </div>
                  )}
                  {errors.groupTo && (
                    <small className="text-danger">{errors.groupTo}</small>
                  )}
                </div>
              </div>
            </div>

            {/* Series From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  ref={seriesFromRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Series From"
                    className="form-control"
                    value={seriesFrom}
                    onFocus={() => setActivePicker("seriesFrom")}
                    onClick={() => setIsSeriesFromPickerVisible(true)}
                    onChange={handleSeriesFromInputChange}
                  />
                  {activePicker === "seriesFrom" && (
                    <div className="picker-dropdown">
                      {renderSeriesFromGrid("from")}
                    </div>
                  )}
                  {errors.seriesFrom && (
                    <small className="text-danger">{errors.seriesFrom}</small>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  ref={seriesToRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Series To"
                    className="form-control"
                    value={seriesTo}
                    onFocus={() => setActivePicker("seriesTo")}
                    onClick={() => setIsSeriesToPickerVisible(true)}
                    onChange={handleSeriesToInputChange}
                  />
                  {activePicker === "seriesTo" && (
                    <div className="picker-dropdown">
                      {renderSeriesToGrid("to")}
                    </div>
                  )}
                  {errors.seriesTo && (
                    <small className="text-danger">{errors.seriesTo}</small>
                  )}
                </div>
              </div>
            </div>

            {/* Number From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  ref={numberFromRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Number From"
                    className="form-control"
                    value={numberFrom}
                    onFocus={() => setActivePicker("numberFrom")}
                    onClick={() => setIsNumberFromPickerVisible(true)}
                    onChange={handleNumberFromInputChange}
                  />
                  {activePicker === "numberFrom" && (
                    <div className="picker-dropdown">
                      {renderNumberFromGrid("from", 0, 99999, true)}{" "}
                    </div>
                  )}
                  {errors.numberFrom && (
                    <small className="text-danger">{errors.numberFrom}</small>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"
                  ref={numberToRef}
                  style={{ width: "40%" }}
                >
                  <input
                    type="text"
                    placeholder="Number To"
                    className="form-control"
                    value={numberTo}
                    onFocus={() => setActivePicker("numberTo")}
                    onClick={() => setIsNumberToPickerVisible(true)}
                    onChange={handleNumberToInputChange}
                  />
                  {activePicker === "numberTo" && (
                    <div className="picker-dropdown">
                      {renderNumberToGrid("to", 0, 99999, true)}{" "}
                    </div>
                  )}
                  {errors.numberTo && (
                    <small className="text-danger">{errors.numberTo}</small>
                  )}
                </div>
              </div>
              {/* <small className="text-muted mb-4">Number range from 00000 to 99999</small> */}
            </div>
            {/* Timer From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                {/* Timer From */}
                <div
                  className="mx-1"
                  ref={timerFromRef}
                  style={{ width: "40%", position: "relative" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Timer From (hh:mm AM/PM)"
                    value={timerFrom}
                    onFocus={() => setActivePicker("timerFrom")}
                    onClick={() => setDropdownFromVisible(true)} // Show dropdown for From when clicked
                    onChange={(e) =>
                      handleManualInput(e.target.value, setTimerFrom)
                    }
                    style={{ width: "100%" }}
                  />
                  {/* Dropdown Below the Input */}
                  {activePicker === "timerFrom" && (
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
                          onClick={() =>
                            handleSelectTime(
                              time,
                              setTimerFrom,
                              setTimerTo,
                              true
                            )
                          }
                        >
                          {time.displayTime}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.timerFrom && (
                    <small className="text-danger">{errors.timerFrom}</small>
                  )}
                </div>

                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>

                {/* Timer To */}
                <div
                  className="mx-1"
                  ref={timerToRef}
                  style={{ width: "40%", position: "relative" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Timer To (hh:mm AM/PM)"
                    value={timerTo}
                    onFocus={() => setActivePicker("timerTo")}
                    onClick={() => setDropdownToVisible(true)} // Show dropdown for To when clicked
                    onChange={(e) =>
                      handleManualInput(e.target.value, setTimerTo, false)
                    }
                    style={{ width: "100%" }}
                  />
                  {/* Dropdown Below the Input */}
                  {activePicker === "timerTo" && (
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
                          onClick={() =>
                            handleSelectTime(time, setTimerFrom, setTimerTo)
                          }
                        >
                          {time.displayTime}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.timerTo && (
                    <small className="text-danger">{errors.timerTo}</small>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1"
                  style={{ width: "84%" }}
                >
                  <input
                    type="text" value={price}
                    placeholder="Price For Each SEM"
                    className="form-control" onChange={(e) => setPrice(e.target.value)}
                  />
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
