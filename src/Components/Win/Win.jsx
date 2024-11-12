import React, { useState, useEffect } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { useAppContext } from "../../contextApi/context";
import { CustomWining } from "../../Utils/apiService";
import strings from "../../Utils/constant/stringConstant";

const Win = () => {
  const { store, dispatch } = useAppContext();
  const drawTimes = store.drawTimes || []; // ["1.00 AM", "1.30 AM"]

  // Initialize state for prize amounts and ticket numbers
  const [prizes, setPrizes] = useState({});
  const [errors, setErrors] = useState({}); // State for error messages

 useEffect(() => {
   const initialPrizes = drawTimes.reduce((acc, time) => {
     acc[time] = {
       1: { amount: "", complementaryAmount: "", ticketNumbers: [""] }, // Add complementaryAmount for the 1st prize
       2: { amount: "", ticketNumbers: [""] },
       3: { amount: "", ticketNumbers: Array(10).fill("") },
       4: { amount: "", ticketNumbers: Array(10).fill("") },
       5: { amount: "", ticketNumbers: Array(10).fill("") },
       6: { amount: "", ticketNumbers: Array(50).fill("") },
     };
     return acc;
   }, {});
   setPrizes(initialPrizes);
 }, [drawTimes]);


  // Validation function to check for special characters
  const validateInput = (value) => {
    const invalidCharacters = /[-*#+=@_]/; // Regex to match invalid characters
    return !invalidCharacters.test(value);
  };

  const handlePrizeChange = (time, rank, value) => {
    if (validateInput(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [time]: undefined })); // Clear error if valid
      setPrizes((prevPrizes) => ({
        ...prevPrizes,
        [time]: {
          ...prevPrizes[time],
          [rank]: { ...prevPrizes[time][rank], amount: value },
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [time]: "Invalid input. Please avoid special characters.",
      }));
    }
  };

  const handleTicketChange = (time, rank, index, value) => {
    if (validateInput(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [time]: undefined })); // Clear error if valid
      setPrizes((prevPrizes) => {
        const updatedTickets = [
          ...(prevPrizes[time][rank]?.ticketNumbers || []),
        ];
        updatedTickets[index] = value;
        return {
          ...prevPrizes,
          [time]: {
            ...prevPrizes[time],
            [rank]: {
              ...prevPrizes[time][rank],
              ticketNumbers: updatedTickets,
            },
          },
        };
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [time]: "Invalid input. Please avoid special characters.",
      }));
    }
  };

  const handleComplementaryChange = (time, rank, value) => {
    if (validateInput(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [time]: undefined })); // Clear error if valid
      setPrizes((prevPrizes) => ({
        ...prevPrizes,
        [time]: {
          ...prevPrizes[time],
          [rank]: { ...prevPrizes[time][rank], complementaryAmount: value },
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [time]: "Invalid input. Please avoid special characters.",
      }));
    }
  };


  const submitPrizes = async (time) => {
    for (let rank in prizes[time]) {
      const { amount, complementaryAmount, ticketNumbers } = prizes[time][rank];
      if (amount) {
        const prizeCategory =
          rank === "1"
            ? "First Prize"
            : rank === "2"
            ? "Second Prize"
            : rank === "3"
            ? "Third Prize"
            : rank === "4"
            ? "Fourth Prize"
            : "Fifth Prize";

        const validTickets = ticketNumbers
          .map((ticket) => ticket.trim())
          .filter((ticket) => ticket !== "");

        if (validTickets.length > 0) {
          const requestBody = {
            prizeCategory,
            prizeAmount: parseFloat(amount) || 0,
            ticketNumber: validTickets,
            announceTime: time,
          };

          // Add complementaryPrize to the request body if it's the first prize
          if (rank === "1" && complementaryAmount) {
            requestBody.complementaryPrize =
              parseFloat(complementaryAmount) || 0;
          }

          const response = await CustomWining(requestBody);

          if (response) {
            validTickets.forEach((ticket) => {
              dispatch({
                type: strings.ADD_SUBMITTED_PRIZE,
                payload: {
                  ticketNumber: ticket,
                  prizeCategory,
                  prizeAmount: parseFloat(amount) || 0,
                },
              });
              console.log(
                `Prize for ${ticket} submitted successfully:`,
                response
              );
            });
          }
        }
      }
    }
  };


  const prizeData = {
    1: { rank: "1st", description: "Top prize for the winner" },
    2: { rank: "2nd", description: "Prize for 10 winners" },
    3: { rank: "3rd", description: "Prize for 10 winners" },
    4: { rank: "4th", description: "Prize for 10 winners" },
    5: { rank: "5th", description: "Prize for 50 winners" },
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{
        backgroundColor: "#f4f9fd",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="text-center w-100"
        style={{
          backgroundColor: "#e6f7ff",
          padding: "20px 0",
          borderBottom: "3px solid #4682B4",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="mb-1"
          style={{
            color: "#4682B4",
            fontWeight: "bold",
            letterSpacing: "1px",
            fontSize: "2rem",
          }}
        >
          🎉 Lottery Draw Times and Rankings 🎉
        </h2>
      </div>

      <div
        className="border border-3 rounded-4 shadow-lg p-4"
        style={{ width: "90%", maxWidth: "1000px", backgroundColor: "#ffffff" }}
      >
        {drawTimes.length > 0 ? (
          <div>
            {drawTimes.map((time, index) => (
              <div
                key={index}
                className="mb-4 p-3 rounded-3 shadow-sm"
                style={{ backgroundColor: "#e6f7ff" }}
              >
                <h4 style={{ color: "#007bb5", fontWeight: "bold" }}>{time}</h4>

                {errors[time] && (
                  <div className="text-danger mb-2">{errors[time]}</div>
                )}

                <Accordion defaultActiveKey="0">
                  {Object.entries(prizeData).map(
                    ([key, { rank, description }]) => (
                      <Accordion.Item eventKey={key} key={key}>
                        <Accordion.Header>
                          {rank} Prize - {description}
                        </Accordion.Header>
                        <Accordion.Body>
                          {/* For the 1st Prize, include ticket number input */}
                          {["1"].includes(key) && (
                            <div>
                              <Form.Label
                                style={{ color: "#555", fontSize: "0.9rem" }}
                              >
                                Enter Ticket Number:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  prizes[time]?.[key]?.ticketNumbers[0] || ""
                                }
                                onChange={(e) =>
                                  handleTicketChange(
                                    time,
                                    key,
                                    0,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter ticket number"
                                style={{
                                  borderRadius: "8px",
                                  fontSize: "0.95rem",
                                  marginBottom: "15px",
                                }}
                              />
                              <Form.Label
                                style={{ color: "#555", fontSize: "0.9rem" }}
                              >
                                Enter Complementary Amount:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  prizes[time]?.[key]?.complementaryAmount || ""
                                }
                                onChange={(e) =>
                                  handleComplementaryChange(
                                    time,
                                    key,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter complementary amount"
                                style={{
                                  borderRadius: "8px",
                                  fontSize: "0.95rem",
                                  marginBottom: "15px",
                                }}
                              />
                            </div>
                          )}

                          {/* Prize Amount Input */}

                          <Form.Label
                            style={{ color: "#555", fontSize: "0.9rem" }}
                          >
                            Enter Prize Amount:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={prizes[time]?.[key]?.amount || ""}
                            onChange={(e) =>
                              handlePrizeChange(time, key, e.target.value)
                            }
                            placeholder="Enter amount"
                            style={{
                              borderRadius: "8px",
                              fontSize: "0.95rem",
                              marginBottom: "15px",
                            }}
                          />

                          {/* Ticket Numbers Input for other prizes */}
                          {!["1"].includes(key) && (
                            <div>
                              <Form.Label
                                style={{ color: "#555", fontSize: "0.9rem" }}
                              >
                                Enter Ticket Numbers (
                                {prizeData[key].description}):
                              </Form.Label>
                              <div className="d-flex flex-wrap gap-2 mt-1">
                                {(prizes[time]?.[key]?.ticketNumbers || []).map(
                                  (ticket, idx) => (
                                    <Form.Control
                                      key={idx}
                                      type="text"
                                      value={ticket}
                                      onChange={(e) =>
                                        handleTicketChange(
                                          time,
                                          key,
                                          idx,
                                          e.target.value
                                        )
                                      }
                                      placeholder={`Ticket ${idx + 1}`}
                                      style={{
                                        borderRadius: "8px",
                                        fontSize: "0.85rem",
                                        width: "calc(20% - 10px)",
                                      }}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  )}
                </Accordion>

                <div className="text-center mt-3">
                  <Button
                    variant="primary"
                    onClick={() => submitPrizes(time)} // Pass the correct time
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    Submit Prizes for {time}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No draw times available.</div>
        )}
      </div>
    </div>
  );
};

export default Win;
