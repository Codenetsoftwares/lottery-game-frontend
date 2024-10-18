import React, { useState } from "react";
import './CreateMarket.css'; // Import custom styles

const CreateMarket = () => {
  const [groupFrom, setGroupFrom] = useState('');
  const [groupTo, setGroupTo] = useState('');
  const [isGroupFromPickerVisible, setIsGroupFromPickerVisible] = useState(false);
  const [isGroupToPickerVisible, setIsGroupToPickerVisible] = useState(false);

  const [seriesFrom, setSeriesFrom] = useState('');
  const [seriesTo, setSeriesTo] = useState('');
  const [isSeriesFromPickerVisible, setIsSeriesFromPickerVisible] = useState(false);
  const [isSeriesToPickerVisible, setIsSeriesToPickerVisible] = useState(false);

  const [numberFrom, setNumberFrom] = useState('');
  const [numberTo, setNumberTo] = useState('');
  const [isNumberFromPickerVisible, setIsNumberFromPickerVisible] = useState(false);
  const [isNumberToPickerVisible, setIsNumberToPickerVisible] = useState(false);

  const handleGroupSelect = (value, type) => {
    if (type === 'from') {
      setGroupFrom(value);
      setIsGroupFromPickerVisible(false);
    } else {
      setGroupTo(value);
      setIsGroupToPickerVisible(false);
    }
  };

  const handleSeriesSelect = (value, type) => {
    if (type === 'from') {
      setSeriesFrom(value);
      setIsSeriesFromPickerVisible(false);
    } else {
      setSeriesTo(value);
      setIsSeriesToPickerVisible(false);
    }
  };

  const handleNumberSelect = (value, type) => {
    if (type === 'from') {
      setNumberFrom(value);
      setIsNumberFromPickerVisible(false);
    } else {
      setNumberTo(value);
      setIsNumberToPickerVisible(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prepare the data to send
    const requestBody = {
      groupRange: `${groupFrom}-${groupTo}`,
      seriesRange: `${seriesFrom}-${seriesTo}`,
      numberRange: `${numberFrom}-${numberTo}`
    };

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle success (e.g., show a success message or redirect)

    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  // Group Grid (38 to 99)
  const renderGroupGrid = (type) => {
    const groups = Array.from({ length: 62 }, (_, i) => (i + 38).toString()); // Generate groups from 38 to 99
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

  // Series Grid (A to L, excluding I and F)
  const renderSeriesGrid = (type) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'J', 'K', 'L'];
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
  const renderNumberGrid = (type, rangeStart = 0, rangeEnd = 99999, isFormatted = true) => {
    const numbers = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);

    return (
      <div className="calendar-grid number-grid">
        {numbers.map((number) => (
          <button
            key={number}
            className="calendar-cell"
            onClick={() => handleNumberSelect(isFormatted ? number.toString().padStart(5, '0') : number.toString(), type)} 
          >
            {isFormatted ? number.toString().padStart(5, '0') : number.toString()} {/* Show as 5 digits for numbers */}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '75vh', backgroundColor: "#f0f4f8" }}>
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
            <h3 className="mb-3" style={{ color: "#4682B4", fontWeight: "bold" }}>
              Choose Your Group, Series, and Number
            </h3>

            {/* Group From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderGroupGrid('from', 38, 99, false)} {/* Display range 38 to 99 without formatting */}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>-</span>
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderGroupGrid('to', 38, 99, false)} {/* Display range 38 to 99 without formatting */}
                    </div>
                  )}
                </div>
              </div>
              <small className="text-muted mb-4">Group range from 38 to 99</small>
            </div>

            {/* Series From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderSeriesGrid('from')}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>-</span>
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderSeriesGrid('to')}
                    </div>
                  )}
                </div>
              </div>
              <small className="text-muted mb-4">Series range from A to L (excluding I and F)</small>
            </div>

            {/* Number From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderNumberGrid('from')}
                    </div>
                  )}
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>-</span>
                <div className="position-relative mx-1" style={{ width: "40%" }}>
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
                      {renderNumberGrid('to')}
                    </div>
                  )}
                </div>
              </div>
              <small className="text-muted mb-4">Number range from 0 to 99999</small>
            </div>

            {/* Create Market Button */}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Create Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarket;
