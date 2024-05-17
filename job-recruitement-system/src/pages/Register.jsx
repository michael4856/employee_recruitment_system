import React, { useState } from "react";
import axios from "axios";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { FaKey, FaUserAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Login from "./Login";
import { Button, Form } from "react-bootstrap";

function Register() {
  // States
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatPWD: "",
    save: false,
  });
  const [message, setMessage] = useState("");

  // Functions
  function handleSubmit(e) {
    e.preventDefault();
    if (user.password === user.repeatPWD) {
      axios
        .post("http://localhost:4000/users/addUser", {
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          setUser({
            username: "",
            email: "",
            password: "",
            repeatPWD: "",
            save: false,
          });
          setMessage(response.data);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          setMessage("Internal server error, please try later.");
        });
    } else {
      setMessage("Passwords must be the same!");
    }
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // Styling icons
  const iconStyles = {
    fontSize: "22px",
    marginRight: "30px",
    marginTop: "27px",
    marginBottom: "20px",
  };

  // Styling container
  const container = {
    boxShadow: " 0 0 1px 1px rgba(26, 26, 26, 0.955)",
    marginBottom: "20px",
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black mt-3" style={container}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="15"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <h4 className="text-center h1 fw-bold mx-1 mx-md-2">Sign up</h4>

              <Form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <FaUserAlt style={iconStyles} />
                  <MDBInput
                    autoComplete="off"
                    required
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Your Name"
                    type="text"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <TfiEmail style={iconStyles} />
                  <MDBInput
                    autoComplete="off"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    type="email"
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <RiLockPasswordFill style={iconStyles} />
                  <MDBInput
                    autoComplete="off"
                    required
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FaKey style={iconStyles} />
                  <MDBInput
                    autoComplete="off"
                    required
                    name="repeatPWD"
                    value={user.repeatPWD}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    type="password"
                  />
                </div>

                <p style={{ color: "red" }}>{message}</p>

                <div className="mb-4">
                  <MDBCheckbox
                    name="save"
                    value={user.save}
                    onChange={handleChange}
                    label="Remember me later"
                  />
                </div>

                <div>
                  <Button
                    className="mb-4"
                    type="submit"
                    style={{
                      width: "100%",
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "green",
                    }}
                  >
                    Register
                  </Button>
                  <p>
                    Have already an account?{" "}
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setShowLogin(!showLogin);
                      }}
                    >
                      Sign in
                    </Link>
                  </p>

                  <p>
                    <Link to="/">Home</Link>
                  </p>
                </div>
              </Form>
            </MDBCol>
            {showLogin && (
              <div
                className="modal fade"
                id="exampleModal"
                style={{ marginLeft: "30%" }}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <Login />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline-primary">
                        Save changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
