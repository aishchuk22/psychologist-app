import * as yup from "yup";

export const appointmentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+380\d{9}$/, "Phone must start with +380 and have 9 digits after"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().required("Comment is required").max(500, "Comment can't exceed 500 characters"),
});
