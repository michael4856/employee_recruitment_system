import { Container } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Profile_Dropdown from "./Profile_Dropdown";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFormik } from "formik";
import axios from "axios";
import { editUsernameSchema } from "C:/Users/meles/Documents/GitHub/Job-recruitement-system/job-recruitement-system/src/schemas/profileSettingSchema";

function ProfileAside({ searchBy, username }) {
  const [showLogin, setShowLogin] = useState(false);
  const containerRef = useRef(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [changeAccount, setChangeAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  //Fetch user from DB
  const fetchUser = () => {
    axios
      .post(`http://localhost:4000/users/getUserByUsername`, {
        username: username,
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
          setData({
            username: response.data.user.username,
            email: response.data.user.email,
            password: response.data.user.password,
          });
        }
      })
      .catch((err) => {});
  };

  //Offcanvas controling functions
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    //Edit user
    axios
      .post(`http://localhost:4000/users/editAccount`, {
        username: username,
        currentPassword: currentPassword,
        data: data,
      })
      .then((response) => {
        if (response.data.success) {
          setSuccess(true);
        } else {
          setErr(true);
          setMsg(response.data.msg);
        }
      })
      .catch((err) => {
        setMsg("Account Not Edited!");
      });
  }, [changeAccount]);

  // Handle submitting the form data
  const handleSubmit = (values, actions) => {
    try {
      values.name &&
        setData((prevPostsData) => ({
          ...prevPostsData,
          username: values.name,
        }));
      values.email &&
        setData((prevPostsData) => ({
          ...prevPostsData,
          email: values.email,
        }));
      values.newPWD &&
        setData((prevPostsData) => ({
          ...prevPostsData,
          password: values.newPWD,
        }));
      setCurrentPassword(values.currentPWD);

      setChangeAccount(!changeAccount);
    } catch (error) {
      setMsg("Couldn't Edit");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      currentPWD: "",
      newPWD: "",
    },
    validationSchema: editUsernameSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = () => setShowLogin(false);
  return (
    <Container fluid>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <>
            <Button
              variant="outline-secondary"
              style={{ border: "none" }}
              onClick={handleShowOffcanvas}
              className="navbar-toggler"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </Button>

            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
              <Offcanvas.Header
                closeButton
                className=" bg-dark text-white text-bg-dark"
              >
                <Offcanvas.Title
                  style={{
                    marginLeft: "40%",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {username.toUpperCase()}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className=" bg-dark text-bg-dark">
                <aside>
                  <div className="profile-navbar">
                    <div className="user-logo" style={{ border: "1px" }}>
                      <img src="https://e7.pngegg.com/pngimages/409/621/png-clipart-computer-icons-avatar-male-user-profile-others-logo-monochrome.png" />
                    </div>
                    <nav>
                      <ul>
                        <li
                          style={{ marginTop: "10px" }}
                          className="li"
                          name="home"
                          onClick={() => {
                            window.location.reload(true);
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "fs-2",
                            }}
                          >
                            <Link to="/login">
                              <AiOutlineHome
                                style={{ cursor: "pointer", title: "Sign In" }}
                              />
                            </Link>
                          </IconContext.Provider>

                          <span
                            style={{ marginLeft: "15px", marginTop: "5px" }}
                          >
                            Home
                          </span>
                        </li>
                        <li
                          name="resume"
                          style={{ marginTop: "15px" }}
                          className="li"
                          onClick={() => {
                            setShowLogin(true);
                            fetchUser();
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "fs-2",
                            }}
                          >
                            <Link to="/login">
                              <CiEdit
                                style={{ cursor: "pointer", title: "Sign In" }}
                              />
                            </Link>
                          </IconContext.Provider>
                          <span
                            style={{ marginLeft: "15px", marginTop: "5px" }}
                          >
                            Settings
                          </span>
                        </li>
                        <li
                          name="about"
                          style={{ marginTop: "15px" }}
                          className="li"
                        >
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "fs-3",
                            }}
                          >
                            <Link to="#">
                              <CgProfile
                                style={{ cursor: "pointer", title: "Sign In" }}
                              />
                            </Link>
                            <span
                              style={{ marginLeft: "15px", marginTop: "5px" }}
                            >
                              About Me
                            </span>
                          </IconContext.Provider>
                        </li>
                        <li
                          name="contact"
                          style={{ marginTop: "15px" }}
                          className="li"
                        >
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "fs-2",
                            }}
                          >
                            <Link to="#">
                              <BiLogOut
                                style={{ cursor: "pointer", title: "Sign In" }}
                              />
                            </Link>
                          </IconContext.Provider>
                          <span
                            style={{ marginLeft: "15px", marginTop: "5px" }}
                          >
                            LogOut
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>
              </Offcanvas.Body>
            </Offcanvas>
          </>

          <Profile_Dropdown searchBy={searchBy} />
        </div>
      </nav>
      <div ref={containerRef}>
        <Modal show={showLogin} onHide={handleClose}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Modal.Header closeButton variant="danger">
              <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Change Username</Accordion.Header>
                  <Accordion.Body>
                    <p className="d-flex justify-content-center">
                      Current Username Is
                      <span
                        style={{
                          color: "blue",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {username}
                      </span>
                    </p>
                    <div>
                      <input
                        id="name"
                        type="text"
                        ref={containerRef}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Username"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.errors.name && formik.touched.name && (
                        <p className="error">{formik.errors.name}</p>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Change Email Address </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <label htmlFor="email">Enter New Email Address: </label>
                      <input
                        id="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Email"
                        className={
                          formik.errors.email && formik.touched.email
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p className="error">{formik.errors.email}</p>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header style={{ color: "green" }}>
                    Change Password
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <label htmlFor="currentPWD">
                        Enter Current Password:
                      </label>
                      <input
                        id="currentPWD"
                        type="password"
                        value={formik.values.currentPWD}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Current Password"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPWD">New Password: </label>
                      <input
                        id="newPWD"
                        type="password"
                        value={formik.values.newPWD}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your New Password"
                        className={
                          formik.errors.newPWD && formik.touched.newPWD
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.errors.newPWD && formik.touched.newPWD && (
                        <p className="error">{formik.errors.newPWD}</p>
                      )}
                    </div>
                  </Accordion.Body>
                  {/* <p
                    style={{ textAlign: "center" }}
                    className={err ? "text-danger" : "text-success"}
                  >
                    {msg && msg} {success && !err ? "Account Edited!" : ""}
                  </p> */}
                </Accordion.Item>
              </Accordion>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-info"
                className="justify-content-end"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </Container>
  );
}

export default ProfileAside;
