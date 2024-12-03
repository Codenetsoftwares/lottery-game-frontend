import React from "react";
import { useFormik } from "formik";
import { initialCreateMarketFormStates } from "../../Utils/initialState";
import { validationSchema } from "../../Utils/validationSchema";
import { generateFilterData } from "../../Utils/helper";
import ReusableInput from "../ReusableInput/ReusableInput";
import ReusableDropdown from "../ReusableDropdown/ReusableDropdown";

const CreateMarkets = () => {
  const formik = useFormik({
    initialValues: initialCreateMarketFormStates,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  // Generate dropdown options
  const groupOptions = generateFilterData({
    type: "group",
    rangeStart: 1,
    rangeEnd: 10,
  });
  const seriesOptions = generateFilterData({
    type: "series",
    excludedChars: ["I", "O", "F"],
  });
  const numberOptions = generateFilterData({
    type: "number",
    rangeStart: 1,
    rangeEnd: 99999,
  });

  return (
    <div
      className="container mt-5 p-4 shadow rounded"
      style={{ background: "#e6f7ff" }}
    >
      <h3 className="text-center mb-4">Create Market</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Single Inputs */}
        <ReusableInput
          label="Select Date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && formik.errors.date}
        />
        <ReusableInput
          label="Market Name"
          name="marketName"
          value={formik.values.marketName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.marketName && formik.errors.marketName}
        />
        <ReusableInput
          label="Price For Each SEM"
          name="priceForEach"
          type="number"
          value={formik.values.priceForEach}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.priceForEach && formik.errors.priceForEach}
        />

        {/* Dropdowns for From-To Inputs */}
        {[{ label: "Group", fromName: "groupFrom", toName: "groupTo", options: groupOptions },
          { label: "Series", fromName: "seriesFrom", toName: "seriesTo", options: seriesOptions },
          { label: "Number", fromName: "numberFrom", toName: "numberTo", options: numberOptions },
        ].map(({ label, fromName, toName, options }) => (
          <div key={fromName} className="d-flex flex-column gap-3">
            <div className="from-to-input-wrapper">
              <ReusableDropdown
                label={`${label} From`}
                name={fromName}
                options={options}
                value={formik.values[fromName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[fromName] && formik.errors[fromName]}
              />
              <ReusableDropdown
                label={`${label} To`}
                name={toName}
                options={options}
                value={formik.values[toName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[toName] && formik.errors[toName]}
              />
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary px-4"
            style={{ background: "#4682B4" }}
          >
            Create Market
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMarkets;
