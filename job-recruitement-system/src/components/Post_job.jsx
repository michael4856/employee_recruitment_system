import { Container } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import OrgNavigation from "./subComponents/OrgNavigation";
import { PostJobSchema } from "../schemas/PostJobSchema";
import "../css/PostJOb.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Post_job() {
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [recentlyPosted, setRecentlyPosted] = useState({
    title: "",
    numberOfWorkers: "",
    description: "",
    departement: "Health Care",
    outdate: "2023-05-25",
    min_cgpa: 2.2,
  });
  const [twoStates, setTwoStates] = useState({ departement: "", outdate: "" });
  const [showEditForm, setShowEditForm] = useState(false);
  const [id, setId] = useState(-1);
  const navigate = useNavigate();
  const [orgId, setOrgId] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    
    axios
      .get("http://localhost:4000/org/orgCookies")
      .then((response) => {
        if (response.data.valid) {
          setOrgId(response.data.orgId);
        } else {
          navigate("/orgs/login");
        }
      })
      .catch((err) => {
        navigate("/orgs/login");
      });
  }, []);

  // Handle submitting the form data
  const handleSubmit = async (values, actions) => {
    await setTimeout(() => {}, 3000);
    await setRecentlyPosted({
      title: values.title,
      description: values.description,
      numberOfWorkers: values.numberOfWorkers,
      min_cgpa: values.min_cgpa,
    });
    await axios
      .post("http://localhost:4000/org/postJob", {
        title: values.title,
        departement: values.departement,
        description: values.description,
        outdate: values.outdate,
        numberOfWorkers: values.numberOfWorkers,
        OrgId: orgId,
        min_cgpa: values.min_cgpa,
      })
      .then(function (response) {
        setRecentlyPosted({
          ...recentlyPosted,
          title: values.title,
          description: values.description,
          numberOfWorkers: values.numberOfWorkers,
        });
        setMsg("Job posted.");
        actions.resetForm();
        setShowForm(!showForm);
      })
      .catch(function (error) {
        setMsg("Error occured, please try again.");
      })
      .finally(function () {
        // always executed
      });
  };

  //Edit recently posted job

  const handleEditJob = async (values, actions) => {
    await setTimeout(() => {}, 3000);
    await axios
      .post(`http://localhost:4000/org/findJob`, {
        title: recentlyPosted.title,
        description: recentlyPosted.description,
        numberOfWorkers: recentlyPosted.numberOfWorkers,
      })
      .then(function (response) {
        console.log(response.data.id);
        setId(response.data.id);
      })
      .catch(function (error) {
        setMsg("Error occured, please try again.");
      })
      .finally(function () {
        // always executed
      });

    await axios
      .put(`http://localhost:4000/org/editJob/${id}`, {
        title: values.title,
        departement: twoStates.departement,
        description: values.description,
        outdate: twoStates.outdate,
        numberOfWorkers: values.numberOfWorkers,
      })
      .then(function (response) {
        setRecentlyPosted({
          ...recentlyPosted,
          title: values.title,
          description: values.description,
          numberOfWorkers: values.numberOfWorkers,
        });
        setMsg("Job edited.");
        actions.resetForm();
      })
      .catch(function (error) {
        setMsg("Error occured, please try again.");
      })
      .finally(function () {
        // always executed
      });
  };

  //Delete Recently Posted Job
  const deletePost = async () => {
    await axios
      .delete("http://localhost:4000/org/deleteRecentJob", {
        data: {
          title: recentlyPosted.title,
          description: recentlyPosted.description,
        },
      })
      .then(function (response) {
        setMsg("Job Deleted.");
        setShowForm(!showForm);
      })
      .catch(function (error) {
        setMsg("Error occured, please try again.");
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <Container>
      <OrgNavigation />
      {showForm && (
        <Formik
          initialValues={{
            title: "",
            departement: "Other",
            description: "",
            outdate: "2023-05-25",
            numberOfWorkers: "",
          }}
          validationSchema={PostJobSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" placeholder="Ex...Google" />
                <div className="error">
                  {errors.title && touched.title ? <p>{errors.title}</p> : null}
                </div>
              </div>
              <div>
                <label htmlFor="inputState">Departement</label>
                <Field
                  component="select"
                  id="departement"
                  name="departement"
                  className="form-select"
                  aria-label="Health Care"
                  style={{ boxShadow: "none" }}
                >
                  <option>Other</option>
                  <option>Health Care</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Politics</option>
                </Field>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  autoComplete="off"
                  placeholder="Write something about job"
                />
                <div className="error">
                  {errors.description && touched.description ? (
                    <p>{errors.description}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="outdate">Outdate</label>
                <Field id="outdate" name="outdate" type="date" />
                <div className="error">
                  {errors.outdate && touched.outdate ? (
                    <p>{errors.outdate}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="numberOfWorkers">Number of workers</label>
                <Field
                  id="numberOfWorkers"
                  name="numberOfWorkers"
                  type="number"
                />
                <div className="error">
                  {errors.numberOfWorkers && touched.numberOfWorkers ? (
                    <p>{errors.numberOfWorkers}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="min-cgpa">Minimum CGPA</label>
                <Field id="min-cgpa" name="min_cgpa" type="number" />
                <div className="error">
                  {errors.min_cgpa && touched.min_cgpa ? (
                    <p>{errors.min_cgpa}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  className="admin-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {!showForm && (
        <Container fluid className="d-flex mt-5">
          <Container style={{ width: "60%", marginTop: "3%" }} fluid>
            <button
              className="bg-success btn border-success-subtle"
              style={{ width: "100%", fontWeight: "bold", color: "white" }}
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              Add New Job
            </button>
            <div
              className="my-5 py-3 px-5"
              style={{ border: "1px solid black" }}
            >
              <div>
                <h4
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Recently Posted
                </h4>
                <div style={{ marginTop: "5%" }} className="px-5">
                  <p style={{ fontWeight: "bold" }}>
                    Title:{" "}
                    <span style={{ color: "pink" }}>
                      {recentlyPosted.title}
                    </span>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Departement:{" "}
                    <span style={{ color: "pink" }}>
                      {recentlyPosted.departement}
                    </span>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Description:{" "}
                    <span style={{ color: "pink" }}>
                      {recentlyPosted.description}
                    </span>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Outdate:{" "}
                    <span style={{ color: "pink" }}>
                      {recentlyPosted.outdate}
                    </span>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    Nomber of workers:{" "}
                    <span style={{ color: "pink" }}>
                      {recentlyPosted.numberOfWorkers}
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "10%" }}
              >
                <button
                  className="bg-warning btn border-warning"
                  style={{ width: "45%", fontWeight: "bold" }}
                  onClick={() => {
                    setShowEditForm(!showEditForm);
                  }}
                >
                  {showEditForm ? "Hide Edit Form" : "Edit Post"}
                </button>
                <button
                  className="bg-danger btn border-danger"
                  style={{ width: "45%", fontWeight: "bold" }}
                  onClick={deletePost}
                >
                  Remove Job
                </button>
              </div>
            </div>
          </Container>
          {showEditForm && (
            <Container style={{ width: "40%", marginLeft: "5%" }}>
              <Formik
                initialValues={{
                  title: "",
                  departement: "",
                  description: "",
                  outdate: "",
                  numberOfWorkers: "",
                }}
                validationSchema={PostJobSchema}
                onSubmit={handleEditJob}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor="title">Title</label>
                      <Field
                        id="title"
                        name="title"
                        placeholder="Ex...Google"
                      />
                      <div className="error">
                        {errors.title && touched.title ? (
                          <p>{errors.title}</p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="inputState">Departement</label>
                      <Field
                        component="select"
                        id="departement"
                        name="departement"
                        className="form-select"
                        aria-label="Health Care"
                        onChange={(e) => {
                          setRecentlyPosted({
                            ...recentlyPosted,
                            departement: e.target.value,
                          });
                          setTwoStates({
                            ...twoStates,
                            departement: e.target.value,
                          });
                        }}
                        style={{ boxShadow: "none" }}
                      >
                        <option>Health Care</option>
                        <option>Computer Science</option>
                        <option>Engineering</option>
                        <option>Politics</option>
                        <option>Other</option>
                      </Field>
                    </div>
                    <div>
                      <label htmlFor="description">Description</label>
                      <Field
                        id="description"
                        name="description"
                        autoComplete="off"
                        placeholder="Write something about job"
                      />
                      <div className="error">
                        {errors.description && touched.description ? (
                          <p>{errors.description}</p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="outdate">Outdate</label>
                      <Field
                        id="outdate"
                        name="outdate"
                        type="date"
                        onChange={(e) => {
                          setRecentlyPosted({
                            ...recentlyPosted,
                            outdate: e.target.value,
                          });
                          setTwoStates({
                            ...twoStates,
                            outdate: e.target.value,
                          });
                        }}
                      />
                      <div className="error">
                        {errors.outdate && touched.outdate ? (
                          <p>{errors.outdate}</p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="numberOfWorkers">Number of workers</label>
                      <Field
                        id="numberOfWorkers"
                        name="numberOfWorkers"
                        type="number"
                      />
                      <div className="error">
                        {errors.numberOfWorkers && touched.numberOfWorkers ? (
                          <p>{errors.numberOfWorkers}</p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="min-cgpa">Number of workers</label>
                      <Field id="min-cgpa" name="min_cgpa" type="number" />
                      <div className="error">
                        {errors.min_cgpa && touched.min_cgpa ? (
                          <p>{errors.min_cgpa}</p>
                        ) : null}
                      </div>
                    </div>
                    <button
                      className="admin-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                  </Form>
                )}
              </Formik>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
}

export default Post_job;
