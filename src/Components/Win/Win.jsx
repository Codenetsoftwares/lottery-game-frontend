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

  useEffect(() => {
    // Initialize prize state based on drawTimes
    const initialPrizes = drawTimes.reduce((acc, time) => {
      acc[time] = {
        1: { amount: "", ticketNumbers: [""] },
        2: { amount: "", ticketNumbers: Array(10).fill("") },
        3: { amount: "", ticketNumbers: Array(10).fill("") },
        4: { amount: "", ticketNumbers: Array(10).fill("") },
        5: { amount: "", ticketNumbers: Array(50).fill("") },
      };
      return acc;
    }, {});
    setPrizes(initialPrizes);
  }, [drawTimes]);

  const handlePrizeChange = (time, rank, value) => {
    setPrizes((prevPrizes) => ({
      ...prevPrizes,
      [time]: {
        ...prevPrizes[time],
        [rank]: { ...prevPrizes[time][rank], amount: value },
      },
    }));
  };

  const handleTicketChange = (time, rank, index, value) => {
    setPrizes((prevPrizes) => {
      const updatedTickets = [...(prevPrizes[time][rank]?.ticketNumbers || [])];
      updatedTickets[index] = value;
      return {
        ...prevPrizes,
        [time]: {
          ...prevPrizes[time],
          [rank]: { ...prevPrizes[time][rank], ticketNumbers: updatedTickets },
        },
      };
    });
  };

  const submitPrizes = async (time) => {
    // Only submit prizes for the current draw time
    for (let rank in prizes[time]) {
      const { amount, ticketNumbers } = prizes[time][rank];
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

        // Filter out any empty ticket numbers and trim whitespace
        const validTickets = ticketNumbers
          .map(ticket => ticket.trim())
          .filter(ticket => ticket !== "");

        if (validTickets.length > 0) {
          const requestBody = {
            prizeCategory,
            prizeAmount: parseFloat(amount) || 0,
            ticketNumber: validTickets, // Include all valid ticket numbers in an array
            announceTime: time, // Add the respective draw time to the request body
          };

          // Send the request with the prize data
          const response = await CustomWining(requestBody);

          if (response) {
            validTickets.forEach(ticket => {
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

                <Accordion defaultActiveKey="0">
                  {Object.entries(prizeData).map(
                    ([key, { rank, description }]) => (
                      <Accordion.Item eventKey={key} key={key}>
                        <Accordion.Header>
                          {rank} Prize - {description}
                        </Accordion.Header>
                        <Accordion.Body>
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

                          {key !== "1" && (
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
                      backgroundColor: "#4682B4",
                      borderColor: "#4682B4",
                    }}
                  >
                    Submit Prizes for {time}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4 style={{ color: "#555" }}>No Draw Times Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Win;
