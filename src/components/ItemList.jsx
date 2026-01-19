import Item from "./Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ItemList.css";

const ItemList = ({ products }) => {
  return (
    <>
      <ul>
        <Container id="itemListContainer">
          <Row>
            {products.map((element) => (
              <Col lg="3" md="4">
                <li key={element.id}>
                  <Item
                    id={element.id}
                    name={element.name}
                    img={element.img}
                    description={element.description}
                    price={element.price.toFixed(2)}
                    delivery={element.delivery}
                    stock={element.stock}
                    weight={element.weight}
                  />
                </li>
              </Col>
            ))}
          </Row>
        </Container>
      </ul>
    </>
  );
};

export default ItemList;
