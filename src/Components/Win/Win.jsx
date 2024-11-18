import React, { useState, useEffect } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { useAppContext } from "../../contextApi/context";
import { AllActiveLotteryMarkets, CustomWining } from "../../Utils/apiService";
import strings from "../../Utils/constant/stringConstant";

const Win = () => {
  const { store, dispatch } = useAppContext();
  const drawTimes = store.drawTimes || []; // ["1.00 AM", "1.30 AM"]

  // Initialize state for prize amounts and ticket numbers
  const [prizes, setPrizes] = useState({});
  const [allActiveMarket, setAllActiveMarket] = useState([]);
  const [errors, setErrors] = useState({}); // State for error messages

  useEffect(() => {
    handleGetAllLotteryMarket();
  }, []);

  useEffect(() => {
    if (allActiveMarket.length > 0) {
      const initialPrizes = allActiveMarket.reduce((acc, market) => {
        acc[market.marketName] = {
          1: { amount: "", complementaryAmount: "", ticketNumbers: [""] },
          2: { amount: "", ticketNumbers: Array(10).fill("") },
          3: { amount: "", ticketNumbers: Array(10).fill("") },
          4: { amount: "", ticketNumbers: Array(10).fill("") },
          5: { amount: "", ticketNumbers: Array(50).fill("") },
        };
        return acc;
      }, {});
      setPrizes(initialPrizes);
    }
  }, [allActiveMarket]);

  console.log("prizes", prizes);

  const handleGetAllLotteryMarket = async () => {
    try {
      const allmarket = await AllActiveLotteryMarkets();
      console.log("allmarket", allmarket);
      setAllActiveMarket(allmarket.data);
    } catch (error) {
      console.error("Error fetching lottery markets:", error);
    }
  };

  console.log("prizeData", prizes);

  // Validation function to check for special characters
  const validateInput = (value) => {
    const invalidCharacters = /[-*#+=@_]/; // Regex to match invalid characters
    return !invalidCharacters.test(value);
  };

  const handlePrizeChange = (time, rank, value) => {
    if (validateInput(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [time]: undefined }));
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
      setErrors((prevErrors) => ({ ...prevErrors, [time]: undefined }));
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

  const submitPrizes = async (time, id) => {
    // Check if the provided time exists as a key in the prizes object
    if (prizes.hasOwnProperty(time)) {
      // Store the data for the matching time into a variable
      const timeData = prizes[time];

      // Array to store the structured data
      const resultArray = [];

      for (let rank in timeData) {
        const { amount, complementaryAmount, ticketNumbers } = timeData[rank];
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
            };

            // Add complementaryPrize to the request body if it's the first prize
            if (rank === "1" && complementaryAmount) {
              requestBody.complementaryPrize =
                parseFloat(complementaryAmount) || 0;
            }

            // Push the formatted data into the result array
            resultArray.push(requestBody);
          }
        }
      }

      // Log the structured array
      console.log(JSON.stringify(resultArray, null, 2));

      // Send each result to the CustomWining API
      try {
        const response = await CustomWining({ resultArray, marketId:id});
        console.log(
          `API call successful for ${resultArray.prizeCategory}:`,
          response
        );
      } catch (error) {
        console.error(
          `API call failed for ${resultArray.prizeCategory}:`,
          error
        );
      }

      return resultArray;
    } else {
      console.log(`No data found for the specified time: ${time}`);
      return [];
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
        {allActiveMarket.length > 0 ? (
          <div>
            {allActiveMarket.map((data, index) => (
              <div
                key={index}
                className="mb-4 p-3 rounded-3 shadow-sm"
                style={{ backgroundColor: "#e6f7ff" }}
              >
                <h4 style={{ color: "#007bb5", fontWeight: "bold" }}>
                  {data.marketName}
                </h4>

                {/* {errors[time] && (
                  <div className="text-danger mb-2">{errors[time]}</div>
                )} */}

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
                                  prizes[data.marketName]?.[key]
                                    ?.ticketNumbers[0] || ""
                                }
                                onChange={(e) =>
                                  handleTicketChange(
                                    data.marketName,
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
                                  prizes[data.marketName]?.[key]
                                    ?.complementaryAmount || ""
                                }
                                onChange={(e) =>
                                  handleComplementaryChange(
                                    data.marketName,
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
                            value={prizes[data.marketName]?.[key]?.amount || ""}
                            onChange={(e) =>
                              handlePrizeChange(
                                data.marketName,
                                key,
                                e.target.value
                              )
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
                                {(
                                  prizes[data.marketName]?.[key]
                                    ?.ticketNumbers || []
                                ).map((ticket, idx) => (
                                  <Form.Control
                                    key={idx}
                                    type="text"
                                    value={ticket}
                                    onChange={(e) =>
                                      handleTicketChange(
                                        data.marketName,
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
                                ))}
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
                    onClick={() => submitPrizes(data.marketName, data.marketId)} // Pass the correct time
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    Submit Prizes for {data.marketName}
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
