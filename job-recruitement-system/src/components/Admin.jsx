import { Container } from "react-bootstrap";
import AdminNavigation from "./subComponents/AdminNavigation";

function Admin() {
  return (
    <Container fluid>
      <AdminNavigation />
      <h3>Home</h3>
    </Container>
  );
}

export default Admin;
