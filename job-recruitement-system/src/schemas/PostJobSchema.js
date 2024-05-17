import * as yup from "yup";

export const PostJobSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required!"),
  numberOfWorkers: yup
    .number()
    .positive("Number of workers must be positive number.")
    .integer("Number of workers must be integer.")
    .required("Number of workers is required field."),
  outdate: yup.date().default(() => new Date()),
  min_cgpa: yup
    .number("CGPA must be a number")
    .positive("CGPA must be positive number."),
});
