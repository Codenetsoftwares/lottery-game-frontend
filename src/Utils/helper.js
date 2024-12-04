export const generateSeries = (seriesStart, seriesEnd) => {
    const allLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const letters = allLetters.filter(letter => !["I", "F", "O"].includes(letter));
    const startIndex = letters.indexOf(seriesStart);
    const endIndex = letters.indexOf(seriesEnd);

    console.log("start", startIndex, endIndex, seriesStart, seriesEnd);

    // Check if start or end index is invalid or if startIndex is greater than endIndex
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        console.error(
            "Invalid range: ensure the start and end are within the allowed range and in the correct order."
        );
        return null; // or return an empty array `[]` if preferred
    }

    // Return the sliced array based on the start and end indices
    return letters.slice(startIndex, endIndex + 1);
};



// Generate groups within a specified range
export const generateGroups = (start, end) => {
    return Array.from({ length: Math.abs(end - start) + 1 }, (_, i) =>
        (i + start).toString()
    );
};

export const generateNumbers = (start, end) => {
    const actualStart = Math.min(start, end);
    const actualEnd = Math.max(start, end);
    return Array.from(
        { length: actualEnd - actualStart + 1 },
        (_, i) => i + actualStart
    );
};


// ALL NUMBER SERIES & GROUP IS GENERATED FROM THIS SINGLE UNIFIED FUNCTION 

 export const generateFilterData = ({ type, rangeStart, rangeEnd, excludedChars = [] }) => {
    switch (type) {
      case "group":
        return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => (i + rangeStart).toString().padStart(2, "0"));
  
      case "series":
        return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
          .filter((letter) => !excludedChars.includes(letter));
  
      case "number":
        return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => (i + rangeStart).toString().padStart(5, "0"));
  
      default:
        return [];
    }
  };


  export const convertTimeToISO = () => {
    const slots = [];
    const startHour = 0; // Start from midnight
    const endHour = 23; // End at 11 PM
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        time.setSeconds(0);
  
        // Format as hh:mm AM/PM
        const formattedTime = time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
  
        slots.push(formattedTime);
      }
    }
  
    return slots; // Return an array of formatted time strings
  };
  
  