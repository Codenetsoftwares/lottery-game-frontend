import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../../Utils/validationSchema";
import { initialCreateMarketFormStates } from "../../Utils/initialState";
import { FromToInput, ReusableInput } from "../ReusableInput/ReusableInput";
import { generateFilterData } from "../../Utils/helper";

const CreateMarkets = () => {
  const [formState, setFormState] = useState(initialCreateMarketFormStates);
  const formik = useFormik({
    initialValues: formState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  // Memoize the dropdown options for better performance
  const groupOptions = useMemo(() => {
    return generateFilterData({
      type: "group",
      rangeStart: 1,
      rangeEnd: 99,
    });
  }, []);

  const seriesOptions = useMemo(() => {
    return generateFilterData({
      type: "series",
    });
  }, []);

  const numberOptions = useMemo(() => {
    return generateFilterData({
      type: "number",
      rangeStart: 1,
      rangeEnd: 99999,
    });
  }, []);

  // Configuration for single inputs
  const inputConfig = [
    { placeholder: "Select Date", type: "date", name: "date" },
    { placeholder: "Market Name", name: "marketName" },
    { placeholder: "Price For Each SEM", type: "number", name: "priceForEach" },
  ];

  // Configuration for from-to inputs
  const fromToInputConfig = [
    {
      placeholder: "Group (From - To)",
      fromName: "groupFrom",
      toName: "groupTo",
      options: groupOptions,
    },
    {
      placeholder: "Series (From - To)",
      fromName: "seriesFrom",
      toName: "seriesTo",
      options: seriesOptions,
    },
    {
      placeholder: "Number (From - To)",
      fromName: "numberFrom",
      toName: "numberTo",
      options: numberOptions,
    },
    {
      placeholder: "Enter Timer (hh:mm AM/PM)",
      fromName: "timerFrom",
      toName: "timerTo",
    },
  ];

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "#f0f0f0",
        minHeight: "75vh",
      }}
    >
      <div
        className="container mt-3 p-4 shadow rounded"
        style={{
          background: "#fff",
          border: "2px solid black",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "900px",
          padding: "20px",
          width: "100%",
          height: "auto",
          maxHeight: "650px",
        }}
      >
        <h3 className="text-center mb-4">Create Lottery Markets</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Render single inputs dynamically */}
          {inputConfig.map((input) => (
            <ReusableInput
              key={input.name}
              placeholder={input.placeholder}
              type={input.type || "text"}
              name={input.name}
              value={formik.values[input.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[input.name] && formik.errors[input.name]}
            />
          ))}

          {/* Render from-to inputs dynamically */}
          {fromToInputConfig.map((input) => (
            <FromToInput
              key={input.fromName}
              placeholder={input.placeholder}
              fromName={input.fromName}
              toName={input.toName}
              options={input.options}
              fromValue={formik.values[input.fromName]}
              toValue={formik.values[input.toName]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fromError={
                formik.touched[input.fromName] && formik.errors[input.fromName]
              }
              toError={formik.touched[input.toName] && formik.errors[input.toName]}
            />
          ))}

          <div className="text-center mt-3">
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
    </div>
  );
};

export default CreateMarkets;
