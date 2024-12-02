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