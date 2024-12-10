import React, { useState, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";

const AlphabetForm = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const generateNumbers = () => {
      const result = new Array(99999);
      for (let i = 0; i < 99999; i++) {
        result[i] = (i + 1).toString().padStart(5, "0");
      }
      return result;
    };

    setNumbers(generateNumbers());
  }, []);

  return (
    <div>
      <h1>Generated Numbers</h1>
      <div style={{ height: "400px", width: "300px" }}>
        {numbers.length > 0 && (
          <Grid
            columnCount={3} // Number of columns in the grid
            columnWidth={100} // Width of each column
            height={400} // Height of the grid container
            rowCount={Math.ceil(numbers.length / 3)} // Number of rows (divide total by columns)
            rowHeight={35} // Height of each row
            width={300} // Width of the grid container
          >
            {({ columnIndex, rowIndex, style }) => {
              const index = rowIndex * 3 + columnIndex; // Calculate the correct index for the grid
              return (
                <div style={style}>
                  {index < numbers.length ? numbers[index] : ""}
                </div>
              );
            }}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AlphabetForm;
