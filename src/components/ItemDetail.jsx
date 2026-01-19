import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./ItemDetail.css";

const ItemDetail = ({ productoDetalle }) => {
  return (
    <Container id="ItemDetailContainer">
      <Row>
        <Col sm="12" md="6" lg="4" xl="3">
          <img
            className="imgDetail"
            src={productoDetalle.img}
            alt={productoDetalle.name}
          />
        </Col>
        <Col sm="12" md="6" lg="8" xl="9">
          <Row>
            <Col>
              <h2>
                {productoDetalle.name}
                {productoDetalle.weight !== 0 && productoDetalle.weight && (
                  <span> - {productoDetalle.weight} g </span>
                )}
              </h2>
              <h3>{productoDetalle.category}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{productoDetalle.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>{productoDetalle.price.toFixed(2)} €</h1>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
