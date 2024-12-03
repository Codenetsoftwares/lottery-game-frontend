import * as Yup from "yup";

export const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    marketName: Yup.string().required("Market name is required"),
    groupFrom: Yup.string().required("Group From is required"),
    groupTo: Yup.string().required("Group To is required"),
    seriesFrom: Yup.string().required("Series From is required"),
    seriesTo: Yup.string().required("Series To is required"),
    numberFrom: Yup.string().required("Number From is required"),
    numberTo: Yup.string().required("Number To is required"),
    timerFrom: Yup.string().required("Timer From is required"),
    timerTo: Yup.string().required("Timer To is required"),
    priceForEach: Yup.number().required("Price is required"),
});
