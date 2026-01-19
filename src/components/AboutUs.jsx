import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import about_us from "../images/about_us.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <Container id="about_us">
        <Row>
          <Col lg="6" xs="12">
            <img className="about_us_img" src={about_us} alt="Über_uns" />
          </Col>
          <Col lg="6" xs="12">
            <h1>Über uns</h1>
            <h5>
              Willkommen bei der Backpfeife, eurer Nachbarschaftsbäckerei im
              Herzen des lebendigen Holzmarkt 25 in Berlin. Wir widmen uns der
              Kunst, köstliche Backwaren herzustellen, mit einem besonderen
              Fokus auf Qualität, Geschmack und Nachhaltigkeit. Von unserem
              frisch gebackenen Brot bis zu unseren unwiderstehlichen
              Gebäckstücken – jedes Produkt wird mit Liebe zum Detail und großer
              Sorgfalt gefertigt.
            </h5>
            <h5>
              Wir sind stolz darauf, die feinsten biologischen Zutaten zu
              verwenden, die wir so oft wie möglich aus der Region beziehen.
              Unsere gemütliche Bäckerei ist ein Ort, an dem ihr entspannen,
              genießen und die einfachen Freuden des Lebens zelebrieren könnt.
              Ganz gleich, ob ihr euch einen schnellen Snack für unterwegs holt
              oder euch zu einem gemütlichen Plausch mit Freunden niederlasst,
              wir sorgen für eine warme und einladende Atmosphäre sowie für
              Leckereien, die eure Geschmacksknospen begeistern werden.
            </h5>
            <h5>
              Kommt vorbei in der Holzmarktstr. 25. Hier erzählt jeder Bissen
              eine Geschichte von Leidenschaft, Gemeinschaft und Genuss.
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutUs;
