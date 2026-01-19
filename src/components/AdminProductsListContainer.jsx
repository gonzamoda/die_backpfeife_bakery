import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { firestore } from "./firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "react-bootstrap/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../App.js";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Col from "react-bootstrap/Col";
import "./AdminProductsListContainer.css";
import { doc, deleteDoc } from "firebase/firestore";

const AdminProductsListContainer = () => {
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    const db = firestore;
    const collection = db.collection("products");
    let query = collection.orderBy("name", "asc");
    query = query.get();

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
  }, []);

  const deleteItem = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmed) {
      try {
        await deleteDoc(doc(firestore, "products", id));
        setDataShow((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  return (
    <>
      <Container id="productsManagerContainer">
        <Row>
          <Col lg="4">
            <Container className="buttonContainer">
              <Row>
                <Button className="greyButton" as={Link} to="/admin_item_list">
                  Calendar
                </Button>
              </Row>
              <Row>
                <Button
                  className="addProductButton"
                  as={Link}
                  to="/admin_new_product"
                >
                  Add new Product
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
              <TableContainer id="tableContainer" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {dataShow.map((element) => (
                      <TableRow
                        key={element.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          <img src={element.img} alt="" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {element.name}
                        </TableCell>
                        <TableCell align="left">{element.category}</TableCell>
                        <TableCell align="left">
                          {element.price.toFixed(2)} €
                        </TableCell>
                        <TableCell align="left">
                          {element.available ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon className="red" />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {element.delivery ? (
                            <DeliveryDiningIcon />
                          ) : (
                            <StoreIcon />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <Link to={`/edit_product/${element.id}`}>
                            <EditIcon className="blue" />
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <DeleteForeverIcon
                            type="button"
                            onClick={() => deleteItem(element.id)}
                            className="red"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminProductsListContainer;
