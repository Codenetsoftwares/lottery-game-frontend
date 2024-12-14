import * as Yup from "yup";

export const validationSchema = Yup.object({
  date: Yup.string()
    .required("Date is required")
    .test("future-date", "Date cannot be in the past", function (value) {
      if (!value) return true; // Skip validation if no date is provided
      const selectedDate = new Date(value); // Parse the user-selected date
      const today = new Date(); // Get the current date
      today.setHours(0, 0, 0, 0); // Set the current date to midnight for accurate comparison
      return selectedDate >= today; // Ensure the selected date is today or in the future
    }),

  marketName: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, "Market name can only contain letters, numbers, and spaces")
    .required("Market name is required"),

  groupFrom: Yup.number().required("Group From is required"),
  groupTo: Yup.number()
    .required("Group To is required")
    .test(
      "greater-group",
      "Group From should be less than Group To",
      function (value) {
        const { groupFrom } = this.parent;
        if (!value || !groupFrom) return true;
        return groupFrom < value;
      }
    )
    .test(
      "no-same-group",
      "Group From and Group To cannot be the same",
      function (value) {
        const { groupFrom } = this.parent;
        if (!value || !groupFrom) return true;
        return groupFrom !== value;
      }
    ),

  seriesFrom: Yup.string()
    .required("Series From is required")
    .test("valid-series", "Invalid series selection", function (value) {
      return /^[A-Za-z]+$/.test(value);
    }),
  seriesTo: Yup.string()
    .required("Series To is required")
    .test(
      "valid-series-range",
      "Series To should be at least 10 letters greater than Series From",
      function (value) {
        const { seriesFrom } = this.parent;
        if (!value || !seriesFrom) return true;

        const diff = value.charCodeAt(0) - seriesFrom.charCodeAt(0);
        return diff >= 10; // Minimum 10 series difference
      }
    )
    .test(
      "no-same-series",
      "Series From and Series To cannot be the same",
      function (value) {
        const { seriesFrom } = this.parent;
        if (!value || !seriesFrom) return true;
        return seriesFrom !== value;
      }
    ),

  numberFrom: Yup.number().required("Number From is required"),
  numberTo: Yup.number()
    .required("Number To is required")
    .test(
      "greater-number",
      "Number To should be greater than Number From",
      function (value) {
        const { numberFrom } = this.parent;
        return value > numberFrom;
      }
    )
    .test(
      "no-same-number",
      "Number From and Number To cannot be the same",
      function (value) {
        const { numberFrom } = this.parent;
        if (!value || !numberFrom) return true;
        return numberFrom !== value;
      }
    ),

  timerFrom: Yup.string().required("Timer From is required"),
  timerTo: Yup.string()
    .required("Timer To is required")
    .test(
      "valid-timer-range",
      "Timer To should be greater than Timer From",
      function (value) {
        const { timerFrom } = this.parent;
        if (!value || !timerFrom) return true;

        return value > timerFrom; // Ensuring logical range
      }
    ),

  priceForEach: Yup.number().required("Price is required"),
});
