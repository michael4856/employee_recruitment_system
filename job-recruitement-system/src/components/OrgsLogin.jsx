import { Container } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrgsLogin() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Handle submitting the form data
  const handleSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMsg("");

    try {
      await axios
        .post("http://localhost:4000/org/getOrg", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          if (response.data[1]) {
            navigate(`/orgs/${response.data[2].name}`);
          } else {
          }
        });
    } catch (error) {
      error && setMsg("Error occured, please try again.");
    }
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Container fluid>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="password"
          />
        </div>
        <button
          className="admin-btn"
          disabled={formik.isSubmitting}
          type="submit"
        >
          Login
        </button>
      </form>

      <p style={{ backgoundColor: "red" }}>{msg && msg}</p>
    </Container>
  );
}

export default OrgsLogin;
