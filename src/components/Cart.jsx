import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { contexto } from "./CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { carrito } = useContext(contexto);

  const { removeProduct } = useContext(contexto);

  const eliminar = (id) => {
    removeProduct(id);
  };

  const priceTotal = carrito
    .map((item) => item.price.toFixed(2) * item.cantidad)
    .reduce((prev, curr) => prev + curr, 0);

  return carrito.length === 0 ? (
    <>
      <Container className="emptyCart">
        <Row>
          <h1>It´s empty :(</h1>
          <Button className="cartButton" as={Link} to="/category">
            Go to the product list
          </Button>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <Container className="cartList">
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Ítem</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((element) => (
                <tr key={element.id}>
                  <td>{element.name}</td>
                  <td>{element.cantidad}</td>
                  <td>{element.price.toFixed(2)} €</td>
                  <td>
                    <Button
                      onClick={() => eliminar(element.id)}
                      variant="danger"
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          <h1>Total: {priceTotal.toFixed(2)} €</h1>
        </Row>
        <Container className="continueButtonContainer">
          <Row>
            <Button className="continueButton" as={Link} to="/user">
              Weiter
            </Button>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Cart;
