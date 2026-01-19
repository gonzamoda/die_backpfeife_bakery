import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const AdminItem = ({ name, email, telephone, compra }) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <b>{name}</b>
          </Col>
          <Col>{email}</Col>
          <Col>{telephone}</Col>
        </Row>
        {compra.map((element) => (
          <Container>
            <Row>
              <Col>
                {element.cantidad} {element.name}
              </Col>
            </Row>
          </Container>
        ))}
        <hr class="hr" />
      </Container>
    </>
  );
};

export default AdminItem;
