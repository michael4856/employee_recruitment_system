import { Container } from "react-bootstrap";
import AdminNavigation from "./subComponents/AdminNavigation";
import React from "react";

import Exam from "./Exam";

function NewCompReq() {
  return (
    <Container>
      <AdminNavigation />
      <Exam />
    </Container>
  );
}

export default NewCompReq;
