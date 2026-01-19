import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import AdminItemList from "./AdminItemList";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { firestore } from "./firebase";
import CalendarAdmin from "./CalendarAdmin";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../App.js";
import "./AdminItemListContainer.css";

const AdminItemListContainer = () => {
  const [dataShow, setDataShow] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    const db = firestore;
    const collectionOrdenes = db.collection("ordenes");
    let query = collectionOrdenes.get();

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

  const [childValue, setChildValue] = useState();

  const onDateChange = (value) => {
    setChildValue(value);
  };
  const date = childValue;

  return (
    <>
      <Container className="adminView">
        <Row>
          <Col lg="4">
            <CalendarAdmin onDateChange={onDateChange} />
            <Container className="buttonContainer">
              <Row>
                <Button
                  className="greyButton"
                  as={Link}
                  to="/admin_products_list"
                >
                  Products Manager
                </Button>
              </Row>
              <Row>
                <Button className="logOutButton" onClick={() => signOut(auth)}>
                  Log Out
                </Button>
              </Row>
            </Container>
          </Col>
          <Col lg="8">
            {dataShow.length === 0 ? (
              <Row className="spinner">
                <Spinner animation="border" variant="secondary" />
              </Row>
            ) : (
              <AdminItemList
                key={dataShow.id}
                selectedDate={date}
                products={dataShow}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminItemListContainer;
