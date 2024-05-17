import { Carousel, Container } from "react-bootstrap";
import jobs from "C:/Users/meles/Documents/GitHub/Job-recruitement-system/job-recruitement-system/src/jobs.js";
import { useState } from "react";

function CarouselSection() {
  const [id, setId] = useState(1);
  // Styles
  const styles = {
    container: {
      backgroundColor: "back",
      margin: "10px",
      marginLeft: "0px",
      display: "flex",
      justifyContent: "space-between",
    },
  };

  return (
    <Container className="w-50 h-50" style={styles.container} fluid>
      <Carousel className="carousel">
        {jobs.map((job) => {
          return (
            <Carousel.Item interval={3000} key={job.id}>
              <Carousel.Caption>
                <h2>{job.name}</h2>
                <p>{job.description}</p>
              </Carousel.Caption>
              <img src={job.image} alt="image" className="d-block w-100" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
}

export default CarouselSection;
