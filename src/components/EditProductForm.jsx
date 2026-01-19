import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { signOut } from "firebase/auth";
import { auth } from "../App.js";
import { useState, useEffect } from "react";
import { imageDb } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

import { firestore } from "./firebase";

const db = firestore;

const EditProductForm = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = db.collection("products").doc(id);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          const productData = { ...docSnap.data(), id: docSnap.id };
          setProduct(productData); // Actualizamos el estado del producto con los datos obtenidos
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const valorInicial = {
    name: "",
    category: "",
    description: "",
    img: "",
    stock: "",
    price: "",
    weight: "",
    delivery: false,
    available: false,
  };

  const [product, setProduct] = useState(valorInicial);

  const [validated, setValidated] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const capturarNumeros = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: Number(value) });
  };

  const capturarBolleans = (e) => {
    setIsChecked(e.target.checked);
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const [productImg, setProductImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to update this item?"
      );
      if (confirmed) {
        try {
          const docRef = db.collection("products").doc(id);

          // Si se ha seleccionado una nueva imagen, súbela a Firebase Storage
          if (productImg) {
            const imgRef = ref(imageDb, `/${product.name}.jpg`);
            await uploadBytes(imgRef, productImg);
            const url = await getDownloadURL(imgRef);
            setImgUrl(url);
            product.img = url; // Actualizamos la URL de la imagen
          }

          // Actualizar el producto en Firebase Firestore
          await docRef.update({
            ...product, // Todos los campos del producto
          });

          alert("Product updated successfully!");

          // Redirigir a la lista de productos
          navigate("/admin_products_list");
        } catch (error) {
          console.error("Error updating product:", error);
        }
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
            {product.name === "" ? (
              <Row className="spinner">
                <Spinner animation="border" variant="success" />
              </Row>
            ) : (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter a name for the product"
                        name="name"
                        onChange={capturarInputs}
                        value={product.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        required
                        name="category"
                        onChange={capturarInputs}
                        value={product.category}
                      >
                        <option value="">Select a category</option>
                        <option value="brot">Brot</option>
                        <option value="brötchen">Brötchen</option>
                        <option value="snacks">Snacks</option>
                        <option value="getränke">Getränke</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid category.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      placeholder="Write a short description of the product"
                      name="description"
                      onChange={capturarInputs}
                      value={product.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid description.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Current Image</Form.Label>
                  <div>
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <Form.Label>Upload New Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    onChange={(e) => setProductImg(e.target.files[0])}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid image.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formMax">
                      <Form.Label>Max units per order</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Define a number"
                        name="stock"
                        onChange={capturarNumeros}
                        value={product.stock}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Define a price"
                        name="price"
                        onChange={capturarNumeros}
                        value={product.price}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formWeight">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Define the weight in grams"
                        name="weight"
                        onChange={capturarNumeros}
                        value={product.weight}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formAvailable">
                  <Form.Check
                    type="checkbox"
                    label="Available for ordering online"
                    name="delivery"
                    checked={product.delivery}
                    onChange={capturarBolleans}
                    value={product.delivery}
                  />
                  <Form.Text className="text-muted">
                    There are some products, like coffee, that are not available
                    for ordering online.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDelivery">
                  <Form.Check
                    type="checkbox"
                    label="Show in the website"
                    name="available"
                    checked={product.available}
                    onChange={capturarBolleans}
                    value={product.available}
                  />
                  <Form.Text className="text-muted">
                    There are some products, like Kurbisbrot, that are online
                    just for a period of time.
                  </Form.Text>
                </Form.Group>
                <Button
                  className="addProductButton mb-5"
                  variant="primary"
                  type="submit"
                >
                  Save changes
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProductForm;
