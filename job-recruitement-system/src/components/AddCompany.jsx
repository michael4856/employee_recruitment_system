import { Container } from "react-bootstrap";
import AdminNavigation from "./subComponents/AdminNavigation";
import { useFormik } from "formik";
import { basicSchema } from "C:/Users/meles/Documents/GitHub/Job-recruitement-system/job-recruitement-system/src/schemas";
import "../css/AdminSchema.css";
import { useState } from "react";
import axios from "axios";

function AddCompany() {
  const [errMsg, setErrMsg] = useState("");
  const [isResSuccess, setIsResSuccess] = useState(false);

  // Handle submitting the form data
  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      // new Promise((resolve) => setTimeout(resolve, 2000));
      await axios
        .post("http://localhost:4000/admin/addOrg", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setErrMsg(response.data[0]);
          setIsResSuccess(response.data[1]);

          actions.resetForm();
        });
    } catch (error) {
      error && setErrMsg("Error occured, please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPWD: "",
    },
    validationSchema: basicSchema,
    onSubmit: handleSubmit,
  });

  // Styles
  const styles = {
    inputGroup: {
      display: "flex",
    },
  };

  return (
    <Container fluid>
      <AdminNavigation />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="name">Company Name: </label>
          <input
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.name && formik.touched.name ? "input-error" : ""
            }
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Company Email: </label>
          <input
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email && formik.touched.email ? "input-error" : ""
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? "input-error"
                : ""
            }
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="repeatPWD">repeat Password:</label>
          <input
            id="repeatPWD"
            type="password"
            value={formik.values.repeatPWD}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.repeatPWD && formik.touched.repeatPWD
                ? "input-error"
                : ""
            }
          />
          {formik.errors.repeatPWD && formik.touched.repeatPWD && (
            <p className="error">{formik.errors.repeatPWD}</p>
          )}
        </div>
        <div>
          <label for="image" class="form-label">
            Upload Image
          </label>
          <input
            class="form-control form-control-md"
            style={{
              borderRadius: "10px",
              fontSize: "20px",
              paddingLeft: "5px",
            }}
            id="image"
            onChange={(e) => {}}
            type="file"
            required
          />
        </div>
        <button
          className="admin-btn"
          disabled={formik.isSubmitting}
          type="submit"
        >
          Save
        </button>
      </form>
      <p className={isResSuccess ? "success-msg msg" : "err-msg msg"}>
        {errMsg}
      </p>
    </Container>
  );
}

export default AddCompany;
