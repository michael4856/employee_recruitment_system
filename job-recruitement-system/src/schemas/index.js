import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email("Please enter valid email.").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password." })
    .required("Required"),

  repeatPWD: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
