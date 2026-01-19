// import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import { firestore } from "./firebase";

const ItemDetailContainer = ({ dataShow }) => {
  // const [dataShow, setDataShow] = useState([]);

  // useEffect(() => {
  //   const db = firestore;
  //   const collection = db.collection("products");
  //   let query = collection.doc(id);
  //   query = query.get();

  //   query.then((snapshot) => {
  //     const producto = [];
  //     const productoConId = { ...snapshot.data(), id: snapshot.id };
  //     producto.push(productoConId);

  //     setDataShow(...producto);
  //   });
  // }, [id]);

  return dataShow.length === 0 ? (
    <Container>
      <Row className="spinner">
        <Spinner animation="border" variant="success" />
      </Row>
    </Container>
  ) : (
    <>
      <ItemDetail productoDetalle={dataShow} />
    </>
  );
};

export default ItemDetailContainer;
