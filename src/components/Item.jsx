import Card from "react-bootstrap/Card";
import React from "react";
import Popup from "reactjs-popup";
import ItemDetailContainer from "./ItemDetailContainer";
import ItemCount from "./ItemCount";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { contexto } from "./CartContext";
import { firestore } from "./firebase";
import "./Item.css";
import CartWidget from "../CartWidget";
import Container from "react-bootstrap/Row";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CancelButton from "./CancelButton";
import CancelIcon from "@mui/icons-material/Cancel";

const Item = ({ name, img, price, id, delivery, stock, weight }) => {
  const [inputType, setInputType] = useState("botonItemCount");

  const { addProduct } = useContext(contexto);
  const { removeProduct } = useContext(contexto);

  const onAdd = (cantidad) => {
    const productoFormateado = { ...dataShow, cantidad };
    addProduct(productoFormateado);
    setInputType("botonIrCarrito");
  };

  const cancelAction = () => {
    removeProduct(id);
    setInputType("botonItemCount");
  };

  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    const db = firestore;
    const collection = db.collection("products");
    let query = collection.doc(id);
    query = query.get();

    query.then((snapshot) => {
      const producto = [];
      const productoConId = { ...snapshot.data(), id: snapshot.id };
      producto.push(productoConId);

      setDataShow(...producto);
    });
  }, [id]);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Card className="itemCard">
        <div class="image-container">
          <Card.Img variant="top" src={img} />
          {weight !== 0 && weight && <h4 className="weight">{weight} g</h4>}
        </div>

        <Card.Body>
          <Card.Title className="cardTitle">{name}</Card.Title>
          <Card.Subtitle className="cardPrice">{price} €</Card.Subtitle>
          <Button onClick={() => setOpen((o) => !o)} className="botonInfo">
            + info
          </Button>
          <Popup className="popup" open={open} onClose={closeModal} modal>
            <ItemDetailContainer dataShow={dataShow} />
            <CancelIcon
              fontSize="large"
              className="closePopup"
              onClick={closeModal}
            />
          </Popup>

          {/* if delivery is avilable show the "add to cart" buttons. If not, just "its not available for delivery": */}
          {delivery === true ? (
            <div>
              {inputType === "botonItemCount" ? (
                <ItemCount stock={stock} initial={1} onAdd={onAdd} />
              ) : (
                <>
                  <Container id="containerButtonCart">
                    <Row className="p-0 m-0">
                      <Col className="p-0" lg="2" md="3" xs="4">
                        <CancelButton itemId={id} cancelAction={cancelAction} />
                      </Col>
                      <Col
                        className="containerButtonCart"
                        lg="10"
                        md="9"
                        xs="8"
                      >
                        <Button className="cartButtonGo" as={Link} to="/cart">
                          <CartWidget />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </>
              )}
            </div>
          ) : (
            <h4 className="outForDelivery">
              This product is not available for pre-ordering on-line. Find it in
              our store.
            </h4>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Item;
