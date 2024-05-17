import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const editUsernameSchema = yup.object().shape({
  name: yup.string().min(3),
  email: yup.string().email("Please enter valid email."),
  newPWD: yup
    .string()
    .min(8, "New password must be at least 8 characters.")
    .matches(passwordRules, { message: "Please create a strong password." }),
});
