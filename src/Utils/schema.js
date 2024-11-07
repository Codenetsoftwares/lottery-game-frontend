import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .min(4, "Username must be at least 4 characters")
        .max(25, "Username must not exceed 25 characters")
        .matches(/^\S*$/, "User Name must not contain spaces")
        .required("Username is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});