import { Container, Button } from "react-bootstrap";

function Heading() {
  return (
    <div className="bg-image vh-100 heading">
      <div
        className="mask"
        style={{
          height: "100%",
          marginTop: "1px",
        }}
      >
        <div className="d-flex  h-100 pt-1">
          <Container className="text-white  " fluid>
            <h1
              className="mb-3 heading-title"
              style={{
                color: "blue",
                marginTop: "20%",
                marginLeft: "5%",
                fontWeight: "bolder",
                fontSize: "60px",
              }}
            >
              WANT TO GET A JOB ?
            </h1>
            <p
              className="mb-4"
              style={{
                fontFamily: "Gabriola",
                fontSize: "25px",
                color: "black",
                marginLeft: "20px",
              }}
            >
              In this website job seeker will contact to companies and get job
              by providing information about them.
            </p>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Heading;
