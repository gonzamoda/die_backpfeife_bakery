import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { firestore } from "./firebase";
import { contexto } from "./CartContext";
import Calendar from "./Calendar";
import "./User.css";

const User = () => {
  const [childValue, setChildValue] = useState();
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const { carrito, clear } = useContext(contexto);

  const onDateChange = (value) => {
    setChildValue(value);
  };

  const date = childValue;

  const enviarCompra = async () => {
    if (
      name.length === 0 ||
      telephone.length === 0 ||
      email.length === 0 ||
      !date
    ) {
      alert("Falta completar algo");
    } else {
      const db = firestore;
      const collection = db.collection("ordenes");

      const compra = [...carrito];

      const usuario = {
        name,
        telephone,
        email,
        date,
      };

      const orden = { compra, usuario };

      try {
        await collection.add(orden);
        clear();
        setRedirect(true);
      } catch (error) {
        console.error("Error al añadir la orden: ", error);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/gracias" />;
  }

  return (
    <>
      <Container id="formularioUsuario">
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              id="nombreInput"
              className="input"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              type="text"
              id="telephoneInput"
              className="input"
              placeholder="Telephone number"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
            <Form.Control
              type="email"
              id="emailInput"
              className="input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Calendar id="calendarInput" onDateChange={onDateChange} />

        <Button onClick={enviarCompra} className="botonFormulario">
          Confirm order
        </Button>
        <p className="userData">
          * Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Bestellung
          verwendet. Weitere Informationen finden Sie in unserer
          Datenschutzerklärung.
        </p>
      </Container>
    </>
  );
};

export default User;
