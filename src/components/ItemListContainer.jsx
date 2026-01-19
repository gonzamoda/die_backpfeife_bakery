import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { firestore } from "./firebase";
import CategoryMenu from "./CategoryMenu";

const ItemListContainer = () => {
  const [dataShow, setDataShow] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    const db = firestore;
    const collection = db.collection("products");
    let query;
    if (category) {
      query = collection
        .where("category", "==", category)
        .where("available", "==", true)
        .orderBy("name", "asc");
      query = query.get();
    } else {
      query = collection
        .where("available", "==", true)
        .orderBy("category", "asc")
        .orderBy("name", "asc");
      query = query.get();
    }

    query.then((snapshot) => {
      const docs = snapshot.docs;
      const products = [];

      docs.forEach((doc) => {
        const docSnapshot = doc;
        const productoConId = { ...docSnapshot.data(), id: docSnapshot.id };
        products.push(productoConId);
      });

      setDataShow(products);
    });
  }, [category]);

  return (
    <>
      <CategoryMenu />

      {dataShow.length === 0 ? (
        <Container>
          <Row className="spinner">
            <Spinner animation="border" variant="secondary" />
          </Row>
        </Container>
      ) : (
        <ItemList key={dataShow.id} products={dataShow} />
      )}
    </>
  );
};

export default ItemListContainer;
