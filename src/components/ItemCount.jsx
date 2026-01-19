import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ItemCount.css";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [estado, setContador] = useState(initial);

  const sumarContador = () => {
    if (estado < stock) {
      setContador(estado + 1);
    }
  };

  const restarContador = () => {
    if (estado > 1) {
      setContador(estado - 1);
    }
  };

  const agregar = () => {
    if (stock > 0) {
      onAdd(estado);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Container id="counter" fluid>
        <Row>
          <Col className="p-0" md="2" xs="4">
            <Button className="botonMasMenos" onClick={restarContador}>
              -
            </Button>
          </Col>
          <Col className="p-0" md="2" xs="4">
            <h3 className="counterText">{estado}</h3>
          </Col>
          <Col className="p-0" md="2" xs="4">
            <Button className="botonMasMenos" onClick={sumarContador}>
              +
            </Button>
          </Col>

          <Col className="containerButtonAdd" md="6">
            <Button className="botonAgregarCarrito" onClick={agregar}>
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemCount;
