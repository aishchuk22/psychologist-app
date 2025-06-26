import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please, enter a correct email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password should not contain more than 30 characters")
    .required("Password is required"),
});