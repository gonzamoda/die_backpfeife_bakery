import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { signOut } from "firebase/auth";
import { auth } from "../App.js";
import { useState } from "react";
import { imageDb } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { useNavigate } from "react-router-dom";

const db = firestore;

const NewProductForm = () => {
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();

      const imgRef = ref(imageDb, `/${product.name}.jpg`);

      try {
        // Primero subimos la imagen a Firebase
        await uploadBytes(imgRef, productImg);

        // Luego obtenemos la URL de la imagen
        const url = await getDownloadURL(imgRef);

        // Actualizamos el estado de la URL y el producto al mismo tiempo
        const updatedProduct = { ...product, img: url };

        // Guardar el producto en Firestore y esperar a que se complete
        await addDoc(collection(db, "products"), updatedProduct);

        // Mostrar el mensaje de éxito y redirigir
        alert("Product added successfully!");
        navigate("/admin_products_list");
      } catch (error) {
        console.error("Error al subir la imagen o obtener la URL:", error);
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
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
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
                  There are some products, like Kurbisbrot, that are online just
                  for a period of time.
                </Form.Text>
              </Form.Group>
              <Button
                className="addProductButton mb-5"
                variant="primary"
                type="submit"
              >
                Add product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewProductForm;
