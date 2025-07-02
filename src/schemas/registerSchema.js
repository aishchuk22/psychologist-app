import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must not exceed 30 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Please, enter a correct email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must include at least one capital letter")
    .matches(/[a-z]/, "Password must include at least one small letter")
    .matches(/[0-9]/, "Password must include at least one digit")
    .matches(/[@$!%*?&]/, "Password must include at least one special symbol (@$!%*?&)")
    .required("Password is required"),
});
