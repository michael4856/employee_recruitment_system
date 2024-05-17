import { FaFacebookF, FaTelegram, FaInstagram } from "react-icons/fa";
import { Container, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "C:/Users/meles/Documents/GitHub/Job-recruitement-system/job-recruitement-system/src/css/Footer.css";

function Footer() {
  const style = {
    container: {
      textAlign: "end",
      marginBottom: "40px",
    },
  };
  return (
    <div>
      <div className="footer mb-1">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <div className="first">
                <h4>My Skills</h4>
                <p> Analytical Skills</p>
                <p> Problem-solving skills</p>
                <p> Critical-thinking skills</p>
                <p> Detail-oriented</p>
                <p> Multitasking</p>
                <p> Self-motivated</p>
              </div>
            </div>

            <div className="col-md-4 col-xs-12">
              <div className="second">
                <h4> Navigate</h4>
                <ul>
                  <li>
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Projects</Link>
                  </li>
                  <li>
                    <Link to="#">About</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 col-xs-12">
              <div className="third">
                <h4> Contact</h4>
                <ul>
                  <li>Andreea Mihaela Bunget </li>
                  <li></li>

                  <li>
                    <i className="far fa-envelope"></i>{" "}
                    andreea@andreeabunget.co.uk
                  </li>
                  <li>
                    <i className="far fa-envelope"></i> email@yahoo.com
                  </li>

                  <li>
                    <i className="fas fa-map-marker-alt"></i> London, UK{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="line mb-5"></div>
              <Container>
                <Button variant="outline-success text-light rounded-pill mb-4 fs-5 px-5 ">
                  Sign up for free
                </Button>
                <p style={{ color: "rgb(152, 149, 149)" }}>
                  Already have an account ?{" "}
                  <a style={{ fontSize: "20px" }} href="#signin">
                    {" "}
                    Sign in
                  </a>
                </p>
              </Container>

              <Container style={style.container}>
                <IconContext.Provider value={{ className: "fs-2" }}>
                  <a style={{ color: "blue" }} href="http://facebook.com/">
                    <FaFacebookF href="#facebook" />
                  </a>
                  <a style={{ color: "#37f8f8" }} href="http://telegram.com/">
                    <FaTelegram href="#telegram" className="mx-4" />
                  </a>
                  <a
                    style={{ color: "rgb(199, 67, 188)" }}
                    href="http://instagram.com/"
                  >
                    <FaInstagram href="#instagram" />
                  </a>
                </IconContext.Provider>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
