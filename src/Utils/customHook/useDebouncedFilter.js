import { useRef, useCallback } from "react";

function useDebouncedFilter() {
    const debounceTimeoutRef = useRef(null);

    const debouncedFilter = useCallback((value, func, time, onFiltered) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear the previous timeout
        }

        debounceTimeoutRef.current = setTimeout(() => {
            let filtered = [];
            if (value) {
                filtered = func().filter((num) => num.toString().startsWith(value));
                onFiltered(filtered); // Pass filtered results via callback
            } else {
                // If input is empty, reset using the provided function

                onFiltered(func());
            }
        }, time);
    }, []);

    return {
        debouncedFilter,
    };
}

export default useDebouncedFilter;
