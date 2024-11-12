import React, { useEffect, useRef, useState } from "react";
import "./CreateMarket.css"; // Import custom styles
import { generateLotteryNumber } from "../../Utils/apiService";
import { toast } from "react-toastify";
import useDebouncedFilter from "../../Utils/customHook/useDebouncedFilter";
import { generateNumbers } from "../../Utils/helper";

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

  const rangeStart = 1;
  const rangeEnd = 99999;

  const { debouncedFilter } = useDebouncedFilter();

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
    const lettersFrom = ["A", "B", "C", "D", "E", "G", "H", "J", "K", "L"];
    setFilterSeriesFrom(lettersFrom);
    const lettersTo = ["A", "B", "C", "D", "E", "G", "H", "J", "K", "L"];
    setFilterSeriesTo(lettersTo);

    // Numbers: 0 to 99999 (or any specified range)
    const numbersFrom = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => i + rangeStart
    );
    setFilterNumberFrom(numbersFrom);
    const numbersTo = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => i + rangeStart
    );
    setFilterNumberTo(numbersTo);
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
       () => Array.from({ length: 62 }, (_, i) => (i + 38).toString()),
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
         const lettersFrom = ["A", "B", "C", "D", "E", "G", "H", "J", "K", "L"];
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
         const lettersFrom = ["A", "B", "C", "D", "E", "G", "H", "J", "K", "L"];
         return lettersFrom;
       },
       1500,
       setFilterSeriesFrom
     );
 // Pass type as "series"
  };

  const handleNumberFromInputChange = (e) => {
    const inputValue = e.target.value;
     setNumberFrom(inputValue);

     debouncedFilter(
       inputValue,
       () =>
         Array.from(
           { length: rangeEnd - rangeStart + 1 },
           (_, i) => i + rangeStart
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
          Array.from(
            { length: rangeEnd - rangeStart + 1 },
            (_, i) => i + rangeStart
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
      !numberTo
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

  // Group Grid (38 to 99)
  const renderGroupFromGrid = (type) => {
    return (
      <div className="calendar-grid group-grid">
        {filterGroupFrom.map((group) => (
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

  const renderGroupToGrid = (type) => {
    return (
      <div className="calendar-grid group-grid">
        {filterGroupTo.map((group) => (
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
  const renderSeriesFromGrid = (type) => {
    return (
      <div className="calendar-grid series-grid">
        {filterSeriesFrom.map((letter) => (
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

   const renderSeriesToGrid = (type) => {
     return (
       <div className="calendar-grid series-grid">
         {filterSeriesFrom.map((letter) => (
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
  const renderNumberFromGrid = (type, isFormatted = true) => {
    return (
      <div className="calendar-grid number-grid">
        {filterNumberFrom.map((number) => (
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

const renderNumberToGrid = (type, isFormatted = true) => {
  return (
    <div className="calendar-grid number-grid">
      {filterNumberTo.map((number) => (
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
          {isFormatted ? number.toString().padStart(5, "0") : number.toString()}{" "}
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
                    onChange={handleGroupFromInputChange}
                  />
                  {isGroupFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderGroupFromGrid("from", 38, 99, false)}{" "}
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
                    onChange={handleGroupToInputChange}
                  />
                  {isGroupToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderGroupToGrid("to", 38, 99, false)}{" "}
                    </div>
                  )}
                </div>
              </div>
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
                    onChange={handleSeriesFromInputChange}
                  />
                  {isSeriesFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderSeriesFromGrid("from")}
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
                    onChange={handleSeriesToInputChange}
                  />
                  {isSeriesToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderSeriesToGrid("to")}
                    </div>
                  )}
                </div>
              </div>
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
                    onChange={handleNumberFromInputChange}
                  />
                  {isNumberFromPickerVisible && (
                    <div className="picker-dropdown">
                      {renderNumberFromGrid("from", 0, 99999, true)}{" "}
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
                    onChange={handleNumberToInputChange}
                  />
                  {isNumberToPickerVisible && (
                    <div className="picker-dropdown">
                      {renderNumberToGrid("to", 0, 99999, true)}{" "}
                    </div>
                  )}
                </div>
              </div>
              {/* <small className="text-muted mb-4">Number range from 00000 to 99999</small> */}
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
