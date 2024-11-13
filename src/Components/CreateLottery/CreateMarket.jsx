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
  const [selectedDate, setSelectedDate] = useState(""); // Date state
  const [timerFrom, setTimerFrom] = useState(""); // New state for timer from
  const [timerTo, setTimerTo] = useState("");     // New state for timer to
  const [dropdownFromVisible, setDropdownFromVisible] = useState(false); // Track dropdown visibility for From
  const [dropdownToVisible, setDropdownToVisible] = useState(false); // Track dropdown visibility for To
  const [activePicker, setActivePicker] = useState(null);
  const groupFromRef = useRef(null);
  const groupToRef = useRef(null);
  const seriesFromRef = useRef(null);
  const seriesToRef = useRef(null);
  const numberFromRef = useRef(null);
  const numberToRef = useRef(null);
  const timerFromRef = useRef(null);
  const timerToRef = useRef(null);


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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        groupFromRef.current && !groupFromRef.current.contains(event.target) &&
        groupToRef.current && !groupToRef.current.contains(event.target) &&
        seriesFromRef.current && !seriesFromRef.current.contains(event.target) &&
        seriesToRef.current && !seriesToRef.current.contains(event.target) &&
        numberFromRef.current && !numberFromRef.current.contains(event.target) &&
        numberToRef.current && !numberToRef.current.contains(event.target) &&
        timerFromRef.current && !timerFromRef.current.contains(event.target) &&
        timerToRef.current && !timerToRef.current.contains(event.target)
      ) {
        console.log("clicked")
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
  const renderGroupFromGrid = (type) => {
    return (
      <div className="calendar-grid group-grid">
        {filterGroupFrom.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => {
              handleGroupSelect(group, type); // Call your existing selection handler
              setActivePicker(null); // Close the dropdown after selection
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
            onClick={() => { handleGroupSelect(group, type); setActivePicker(null);}}
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
            onClick={() => {handleSeriesSelect(letter, type); setActivePicker(null);}}
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
             onClick={() => {handleSeriesSelect(letter, type); setActivePicker(null)}}
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
            onClick={() => {handleNumberSelect(
              isFormatted
                ? number.toString().padStart(5, "0")
                : number.toString(),
              type
            ); setActivePicker(null)}
              
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
          onClick={() => {handleNumberSelect(
            isFormatted
              ? number.toString().padStart(5, "0")
              : number.toString(),
            type
          ); setActivePicker(null)}
            
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
            {/* Date Input */}
            <div className="mb-3">
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
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Group From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1" ref={groupFromRef}
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
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1" ref={groupToRef}
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
                </div>
              </div>
            </div>

            {/* Series From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1" ref={seriesFromRef}
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
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1"  ref={seriesToRef}
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
                </div>
              </div>
            </div>

            {/* Number From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="position-relative mx-1" ref={numberFromRef}
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
                </div>
                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>
                <div
                  className="position-relative mx-1" ref={numberToRef}
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
                </div>
              </div>
              {/* <small className="text-muted mb-4">Number range from 00000 to 99999</small> */}
            </div>
            {/* Timer From and To */}
            <div className="mb-3">
              <div className="d-flex justify-content-center mb-2">
                {/* Timer From */}
                <div
                  className="mx-1" ref={timerFromRef}
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
                </div>

                <span className="mx-1" style={{ lineHeight: "2.4rem" }}>
                  -
                </span>

                {/* Timer To */}
                <div
                  className="mx-1" ref={timerToRef}
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
