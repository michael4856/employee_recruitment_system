import { Container, Navbar, Nav } from "react-bootstrap";

function OrgNavigation() {
  // Styles
  const styles = {
    container: {
      fontSize: "20px",
      marginLeft: "35%",
    },
  };

  return (
    <Container style={styles.container} fluid>
      <Navbar>
        <Nav className="me-auto">
          <Nav.Link href="/orgs/post">Post </Nav.Link>
          <Nav.Link href="/orgs/view">View </Nav.Link>
          <Nav.Link href="/orgs/news">News </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}

export default OrgNavigation;
