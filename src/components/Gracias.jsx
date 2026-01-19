import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Gracias.css";

const Gracias = () => {
  return (
    <>
      <Container className="thanks">
        <Row>
          <p>Thanks, we have sended you an email with your order info.</p>
          <Button className="cartButton" as={Link} to="/about_us">
            Know more about us
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Gracias;
