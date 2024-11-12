import React, { useEffect, useState } from "react";
import "./CreateMarket.css"; // Import custom styles
import { generateLotteryNumber } from "../../Utils/apiService";
import { toast } from "react-toastify";

const CreateMarket = () => {
  const [groupFrom, setGroupFrom] = useState("");
  const [groupTo, setGroupTo] = useState("");
  const [isGroupFromPickerVisible, setIsGroupFromPickerVisible] = useState(false);
  const [isGroupToPickerVisible, setIsGroupToPickerVisible] = useState(false);
  
  const [seriesFrom, setSeriesFrom] = useState("");
  const [seriesTo, setSeriesTo] = useState("");
  const [isSeriesFromPickerVisible, setIsSeriesFromPickerVisible] = useState(false);
  const [isSeriesToPickerVisible, setIsSeriesToPickerVisible] = useState(false);
  
  const [numberFrom, setNumberFrom] = useState("");
  const [numberTo, setNumberTo] = useState("");
  const [isNumberFromPickerVisible, setIsNumberFromPickerVisible] = useState(false);
  const [isNumberToPickerVisible, setIsNumberToPickerVisible] = useState(false);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // Date state
  const [timerFrom, setTimerFrom] = useState("");
  const [timerTo, setTimerTo] = useState("");
  
  const [dropdownFromVisible, setDropdownFromVisible] = useState(false);
  const [dropdownToVisible, setDropdownToVisible] = useState(false);
  
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
    if (!groupFrom || !groupTo || !seriesFrom || !seriesTo || !numberFrom || !numberTo || !timerFrom || !timerTo) {
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

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const requestBody = {
      group: { min: parseInt(groupFrom), max: parseInt(groupTo) },
      series: { start: seriesFrom, end: seriesTo },
      number: { min: numberFrom, max: numberTo },
      timer: { from: timerFrom, to: timerTo },
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

  const generateTimeOptions = () => {
    const options = [];
    const today = new Date().toISOString().split("T")[0];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinute = minute.toString().padStart(2, "0");
        const period = hour < 12 ? "AM" : "PM";
        const displayTime = `${formattedHour}:${formattedMinute} ${period}`;
        const isoTime = new Date(`${today}T${hour.toString().padStart(2, "0")}:${formattedMinute}:00`).toISOString();
        options.push({ displayTime, isoTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleManualInput = (value, setter) => {
    setter(value);
    setDropdownFromVisible(false);
    setDropdownToVisible(false);
  };

  const handleSelectTime = (selectedTime, setterFrom, setterTo) => {
    setterFrom(selectedTime.displayTime);
    setterTo(selectedTime.displayTime);
    setDropdownFromVisible(false);
    setDropdownToVisible(false);
  };

  const renderGroupGrid = (type) => {
    const groups = Array.from({ length: 62 }, (_, i) => (i + 38).toString());
    return (
      <div className="calendar-grid group-grid">
        {groups.map((group) => (
          <button key={group} className="calendar-cell" onClick={() => handleGroupSelect(group, type)}>
            {group}
          </button>
        ))}
      </div>
    );
  };

  const renderSeriesGrid = (type) => {
    const letters = ["A", "B", "C", "D", "E", "G", "H", "J", "K", "L"];
    return (
      <div className="calendar-grid series-grid">
        {letters.map((letter) => (
          <button key={letter} className="calendar-cell" onClick={() => handleSeriesSelect(letter, type)}>
            {letter}
          </button>
        ))}
      </div>
    );
  };

  const renderNumberGrid = (type, rangeStart = 0, rangeEnd = 99999, isFormatted = true) => {
    const numbers = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
    return (
      <div className="calendar-grid number-grid">
        {numbers.map((number) => (
          <button key={number} className="calendar-cell" onClick={() => handleNumberSelect(isFormatted ? number.toString().padStart(5, "0") : number.toString(), type)}>
            {isFormatted ? number.toString().padStart(5, "0") : number.toString()}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="create-market">
      <div className="row">
        <div className="col">
          <label className="text-light">Group (From)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={groupFrom}
              onChange={(e) => handleManualInput(e.target.value, setGroupFrom)}
              onFocus={() => setIsGroupFromPickerVisible(true)}
              placeholder="Select Group From"
            />
            {isGroupFromPickerVisible && renderGroupGrid("from")}
          </div>
        </div>

        <div className="col">
          <label className="text-light">Group (To)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={groupTo}
              onChange={(e) => handleManualInput(e.target.value, setGroupTo)}
              onFocus={() => setIsGroupToPickerVisible(true)}
              placeholder="Select Group To"
            />
            {isGroupToPickerVisible && renderGroupGrid("to")}
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="text-light">Series (From)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={seriesFrom}
              onChange={(e) => handleManualInput(e.target.value, setSeriesFrom)}
              onFocus={() => setIsSeriesFromPickerVisible(true)}
              placeholder="Select Series From"
            />
            {isSeriesFromPickerVisible && renderSeriesGrid("from")}
          </div>
        </div>

        <div className="col">
          <label className="text-light">Series (To)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={seriesTo}
              onChange={(e) => handleManualInput(e.target.value, setSeriesTo)}
              onFocus={() => setIsSeriesToPickerVisible(true)}
              placeholder="Select Series To"
            />
            {isSeriesToPickerVisible && renderSeriesGrid("to")}
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="text-light">Number (From)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={numberFrom}
              onChange={(e) => handleManualInput(e.target.value, setNumberFrom)}
              onFocus={() => setIsNumberFromPickerVisible(true)}
              placeholder="Select Number From"
            />
            {isNumberFromPickerVisible && renderNumberGrid("from")}
          </div>
        </div>

        <div className="col">
          <label className="text-light">Number (To)</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={numberTo}
              onChange={(e) => handleManualInput(e.target.value, setNumberTo)}
              onFocus={() => setIsNumberToPickerVisible(true)}
              placeholder="Select Number To"
            />
            {isNumberToPickerVisible && renderNumberGrid("to")}
          </div>
        </div>
      </div>

      {/* <div className="row mt-2">
        <div className="col">
          <label className="text-light">Timer From</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={timerFrom}
              onChange={(e) => handleManualInput(e.target.value, setTimerFrom)}
              onFocus={() => setDropdownFromVisible(true)}
              placeholder="Select Timer From"
            />
            {dropdownFromVisible && (
              <div className="dropdown-options">
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

        <div className="col">
          <label className="text-light">Timer To</label>
          <div className="position-relative">
            <input
              className="form-control"
              type="text"
              value={timerTo}
              onChange={(e) => handleManualInput(e.target.value, setTimerTo)}
              onFocus={() => setDropdownToVisible(true)}
              placeholder="Select Timer To"
            />
            {dropdownToVisible && (
              <div className="dropdown-options">
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
      </div> */}
      {/* Timer From */}
<div className="mx-1" style={{ width: "40%", position: "relative" }}>
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
          onClick={() => handleSelectTime(time, setTimerFrom, setTimerTo, true)} // Pass true for 'From'
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
    onChange={(e) => handleManualInput(e.target.value, setTimerTo)}
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
          onClick={() => handleSelectTime(time, setTimerFrom, setTimerTo, false)} // Pass false for 'To'
        >
          {time.displayTime}
        </button>
      ))}
    </div>
  )}
</div>


      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Generate Lottery Numbers
        </button>
      </div>
    </div>
  );
};

export default CreateMarket;
