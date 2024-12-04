import React, { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../../Utils/validationSchema";
import { initialCreateMarketFormStates } from "../../Utils/initialState";
import { FromToInput, ReusableInput } from "../ReusableInput/ReusableInput";
import { convertTimeToISO, generateFilterData } from "../../Utils/helper";
import { generateLotteryNumber } from "../../Utils/apiService";

const CreateMarkets = () => {
    const [formState, setFormState] = useState(initialCreateMarketFormStates);
  
    const formik = useFormik({
      initialValues: formState,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const startTimeISO = convertTimeToISO(values.timerFrom, values.date);
        const endTimeISO = convertTimeToISO(values.timerTo, values.date);
  
        const requestBody = {
          date: new Date(values.date).toISOString(),
          marketName: values.marketName,
          group: {
            min: parseInt(values.groupFrom, 10),
            max: parseInt(values.groupTo, 10),
          },
          series: {
            start: values.seriesFrom,
            end: values.seriesTo,
          },
          number: {
            min: parseInt(values.numberFrom, 10),
            max: parseInt(values.numberTo, 10),
          },
          start_time: startTimeISO,
          end_time: endTimeISO,
          price: parseFloat(values.priceForEach),
        };
  
        const response = await generateLotteryNumber(requestBody);
  
        if (response.success) {
          console.log("Market created successfully!");
          formik.resetForm();
        } else {
          console.error("Error creating market:", response.message);
        }
      },
    });
  
    const groupOptions = useMemo(
      () => generateFilterData({ type: "group", rangeStart: 1, rangeEnd: 99 }),
      []
    );
    const seriesOptions = useMemo(
      () => generateFilterData({ type: "series" }),
      []
    );
    const numberOptions = useMemo(
      () => generateFilterData({ type: "number", rangeStart: 1, rangeEnd: 5000 }),
      []
    );
  
    const timerOptions = useMemo(() => {
        const allSlots = convertTimeToISO() || []; // Ensure this returns an array of time strings
        const now = new Date();
        const istNow = new Date(
          now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        );
      
        return allSlots.filter((slot) => {
          if (!slot) return false; // Skip invalid slots
          const [time, meridiem] = slot.split(" ");
          const [hours, minutes] = time.split(":").map(Number);
      
          const slotDate = new Date();
          slotDate.setHours(meridiem === "PM" && hours < 12 ? hours + 12 : hours);
          slotDate.setMinutes(minutes);
          slotDate.setSeconds(0, 0);
      
          return slotDate > istNow; // Exclude past times
        });
      }, []);
      
  
    const inputConfig = [
      { placeholder: "Select Date", type: "date", name: "date" },
      { placeholder: "Market Name", name: "marketName" },
      { placeholder: "Price For Each SEM", type: "number", name: "priceForEach" },
    ];
  
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
        options: timerOptions,
      },
    ];
  
    useEffect(() => {
      setFormState((prevState) => ({
        ...prevState,
        groupOptions,
        seriesOptions,
        numberOptions,
      }));
    }, [groupOptions, seriesOptions, numberOptions]);
  
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
  
            {fromToInputConfig.map((input) => (
              <FromToInput
                key={input.fromName}
                placeholder={input.placeholder}
                fromName={input.fromName}
                toName={input.toName}
                fromValue={formik.values[input.fromName]}
                toValue={formik.values[input.toName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fromError={
                  formik.touched[input.fromName] && formik.errors[input.fromName]
                }
                toError={
                  formik.touched[input.toName] && formik.errors[input.toName]
                }
                options={input.options}
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
