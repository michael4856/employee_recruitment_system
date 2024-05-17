import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineReadMore } from "react-icons/md";
import Tesseract from "tesseract.js";
import { Formik, Form, Field } from "formik";
import Congratulation from "./Congratulation";
import "../css/Effects.css";

function Job({ jobData, username }) {
  const [org, setOrg] = useState({});
  const [document, setDocument] = useState({
    username: username,
    orgId: org.id,
    departement: "Other",
    cgpa: "",
    infoText: "No info added.",
  });
  const [image1, setImage1] = useState("");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [succesMsg, setSuccessMsg] = useState("");
  const [isCorrectCGPA, setIsCorrectCGPA] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .post("http://localhost:4000/org/findOrg", { PK: jobData.OrgId })
      .then((response) => {
        setOrg(response.data.org);
        setDocument({ ...document, orgId: response.data.org.id });
      })
      .catch((err) => {
        navigate(`/profile/${username}`);
      });
  }, []);

  //Handle submision fo form data
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Tesseract.recognize(image1, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        setErrMsg(
          "Error occured while reading image, please provide clear image"
        );
        navigate(`/profile/${username}`);
      })
      .then((result) => {
        let CGPAText = result.data.text.toUpperCase().trim();
        let cgpaCheck = CGPAText.includes(`CGPA:${document.cgpa}`);

        if (
          (document.cgpa > 0) &
          (document.cgpa <= 4) &
          (document.cgpa >= jobData.min_cgpa) &
          (document.departement.toUpperCase() ==
            jobData.departement.toUpperCase())
        ) {
          setSuccess(true);
          axios
            .post("http://localhost:4000/worker_org/add_worker_org", {
              username: username,
              orgId: document.orgId,
              cv: result.data.text,
              why_apply_info: document.infoText,
            })
            .then((response) => {
              setSuccessMsg(
                `Congratulation!!! you are accepted to work with ${org.name}.`
              );
            })
            .catch((err) => {
              setIsLoading(false);
            });
        } else {
          setErrMsg("Request is not successfull");
        }
      });
  };

  return (
    <div
      style={{
        marginLeft: "0.3%",
        marginRight: "0.3%",
        width: "19.4%",
        marginTop: "10px",
      }}
    >
      <div
        style={{ borderStyle: "ridge", padding: "3px", borderRadius: "10px" }}
      >
        <div className="img-wrapper">
          <div className="img-cont">
            <img
              src="https://thumbs.dreamstime.com/b/colorful-acrylic-ink-water-isolated-white-abstract-background-color-explosion-liquid-cloud-motion-91873826.jpg"
              alt="Image"
              width="100%"
              height="100%"
              style={{ borderRadius: "5px", display: "block", margin: "auto" }}
            />

            <div
              className="button-cont mx-0 my-0"
              style={{ width: "100%", height: "100%" }}
            >
              <button
                className="btn btn-outline-info mt-5 px-4"
                data-bs-toggle="modal"
                data-bs-target="#orgModal"
                onClick={() => {}}
              >
                SEE MORE
                <MdOutlineReadMore
                  style={{
                    fontSize: "30px",
                    fontStyle: "italic",
                    paddingLeft: "5px",
                    color: "white",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <h5
          style={{
            marginTop: "20px",
            color: "white",
            marginLeft: "5px",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {org.name}
        </h5>

        <p style={{ paddingLeft: "15px", color: "wheat", fontStyle: "italic" }}>
          - {jobData.title}
        </p>
        <div className="d-grid gap-2 ">
          <button
            className="btn btn-outline-success"
            style={{ width: "100%" }}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Apply
          </button>
          <div
            className="modal fade bg-dark text-bg-dark"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog bg-dark modal-fullscreen-xxl-down">
              <div className="modal-content">
                <div className="modal-body bg-dark">
                  <div
                    style={{
                      marginTop: "2%",
                      marginBottom: "2%",
                      backgroundColor: "dark",
                      color: "white",
                    }}
                  >
                    {isLoading && !success && (
                      <p
                        className="text-center py-3 mt-1"
                        style={{
                          color: "green",
                          fontSize: "30px",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        Wait the response
                        <span style={{ color: "white" }}> {progress}</span>%
                      </p>
                    )}
                    {!isLoading && !text && (
                      <div className="d-flex justify-content-around ">
                        <div style={{ width: "70%" }}>
                          <Formik>
                            <Form onSubmit={handleSubmit}>
                              <div className="form-group ">
                                <label htmlFor={`departement${jobData.id}`}>
                                  Departement:
                                </label>
                                <Field
                                  component="select"
                                  id={`departement${jobData.id}`}
                                  onChange={(e) =>
                                    setDocument({
                                      ...document,
                                      departement: e.target.value,
                                    })
                                  }
                                  className="form-select"
                                  aria-label="Health Care"
                                  style={{ boxShadow: "none", width: "100%" }}
                                >
                                  <option>Other</option>
                                  <option>Health care</option>
                                  <option>Computer science</option>
                                  <option>Engineering</option>
                                  <option>Politics</option>
                                </Field>
                              </div>
                              <div style={{ marginTop: "8%" }}>
                                <div>
                                  <label
                                    htmlFor={`cv${jobData.id}`}
                                    className="form-label"
                                  >
                                    Upload your CV
                                  </label>
                                  <Field
                                    className="form-control form-control-md"
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "20px",
                                      paddingLeft: "5px",
                                    }}
                                    id={`cv${jobData.id}`}
                                    onChange={(e) => {
                                      setImage1(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                    }}
                                    type="file"
                                    required
                                  />
                                </div>
                              </div>
                              <div style={{ marginTop: "8%" }}>
                                <label
                                  htmlFor={`cgpa${jobData.id}`}
                                  style={{ color: "white" }}
                                >
                                  Your CGPA result in number
                                </label>
                                <Field
                                  id={`cgpa${jobData.id}`}
                                  type="number"
                                  required
                                  style={{
                                    fontSize: "20px",
                                    borderRadius: "10px",
                                    paddingLeft: "10px",
                                  }}
                                  onChange={(e) =>
                                    setDocument({
                                      ...document,
                                      cgpa: e.target.value,
                                    })
                                  }
                                  className="form-control"
                                />
                              </div>
                              <div style={{ marginTop: "8%" }}>
                                <label
                                  htmlFor={`experience${jobData.id}`}
                                  style={{ color: "white" }}
                                >
                                  Have Experience? If Have, Give Us Your
                                  Certeficate.
                                </label>
                                <Field
                                  style={{
                                    fontSize: "20px",
                                    borderRadius: "10px",
                                    paddingLeft: "10px",
                                  }}
                                  id={`experience${jobData.id}`}
                                  type="file"
                                  onChange={(e) =>
                                    setDocument({
                                      ...document,
                                      experience: URL.createObjectURL(
                                        e.target.files[0]
                                      ),
                                    })
                                  }
                                  className="form-control"
                                />
                              </div>
                              <div style={{ marginTop: "8%" }}>
                                <label
                                  htmlFor={`reason${jobData.id}`}
                                  style={{ color: "white" }}
                                >
                                  Why Apply For The Job?
                                </label>
                                <textarea
                                  name={`reason${jobData.id}`}
                                  id={`reason${jobData.id}`}
                                  cols="30"
                                  rows="4"
                                  onChange={(e) =>
                                    setDocument({
                                      ...document,
                                      infoText: e.target.value,
                                    })
                                  }
                                  style={{
                                    width: "100%",
                                    paddingLeft: "10px",
                                    paddingTop: "5px",
                                    borderRadius: "10px",
                                  }}
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-outline-primary mt-3 mb-5"
                                style={{ width: "100%" }}
                              >
                                GO
                              </button>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    )}

                    <div>
                      <p style={{ color: "red", textAlign: "center" }}>
                        {errMsg && errMsg}
                      </p>

                      <p style={{ color: "green", textAlign: "center" }}>
                        {success && <Congratulation />}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-dark d-flex justify-content-end"
                  style={{ paddingRight: "10%", paddingBottom: "20px" }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary text-white"
                    data-bs-dismiss="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setSuccess(false);
                      setIsLoading(false);
                      setProgress(0);
                    }}
                  >
                    <BiArrowBack style={{ fontSize: "25px" }} /> Back Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Org Modal */}
      <div
        className="modal fade "
        id="orgModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content see-more-modal">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 see-more-header"
                id="exampleModaororlLabel"
              >
                {jobData.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body see-more-body">
              <p>
                {" "}
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingRight: "2%",
                    fontStyle: "normal",
                  }}
                >
                  Job posted date:{" "}
                </span>
                {jobData.createdAt}
              </p>
              <p>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingRight: "10%",
                  }}
                >
                  Description:{" "}
                </span>
                {jobData.description}
              </p>
              <p>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingRight: "6%",
                    fontStyle: "normal",
                  }}
                >
                  Departement:{" "}
                </span>
                {jobData.departement}
              </p>
              <p>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingRight: "16%",
                    fontStyle: "normal",
                  }}
                >
                  Outdate:{" "}
                </span>
                {jobData.outdate}
              </p>
              <p>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingRight: "4%",
                    fontStyle: "normal",
                  }}
                >
                  Minimum CGPA :
                </span>
                {jobData.min_cgpa}
              </p>
            </div>
            <div className="modal-footer see-more-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
