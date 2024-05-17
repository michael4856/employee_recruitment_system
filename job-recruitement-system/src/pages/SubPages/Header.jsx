import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import Login from "../Login";
import "C:/Users/meles/Documents/GitHub/Job-recruitement-system/job-recruitement-system/src/css/Header.css";

function Header() {
  // Search modal controlling hook
  const [lgShow, setLgShow] = useState(false);

  // Nav styling
  const navStyling = ({ isActive }) => {
    if (isActive) {
      return {
        color: "#0fe11e",
      };
    } else return { textDecoration: "none", color: "White" };
  };

  return (
    <Navbar expand="lg" className="navbar-area">
      <Container fluid>
        <Container className="logo-container" fluid>
          <Navbar.Brand className="fs-2 fw-bold text-info" href="#home">
            LOGO
          </Navbar.Brand>
        </Container>
        <Container
          className="nav-container"
          style={{ marginLeft: "15%" }}
          fluid
        >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeight: "100px", displayContent: "space-between" }}
              navbarScroll
            >
              <div
                style={{
                  justifyContent: "space-between",
                  marginTop: "7px",
                  marginLeft: "50%",
                }}
              >
                <NavLink to="/" style={navStyling}>
                  Home
                </NavLink>
                <NavLink to="/news" className=" mx-3" style={navStyling}>
                  News
                </NavLink>

                <NavLink to="/about" style={navStyling}>
                  About
                </NavLink>
              </div>

              <NavLink
                className="text-white text-decoration-none"
                style={navStyling}
              >
                <NavDropdown
                  title="Community"
                  id="navbarScrollingDropdown"
                  className="text-light"
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <Container className="d-flex account-buttons" fluid>
          <Button
            variant="outline-success rounded-pill px-4"
            style={{ marginRight: "3%" }}
          >
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign up
            </Link>
          </Button>
          <IconContext.Provider
            value={{
              color: "rgb(0, 156, 55)",
              className: "fs-2",
            }}
          >
            <Link
              to="/login"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <FaUserAlt style={{ cursor: "pointer", title: "Sign In" }} />
            </Link>
          </IconContext.Provider>
        </Container>
        <div
          className="modal fade"
          id="exampleModal"
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
      </Container>
    </Navbar>
  );
}

export default Header;
