import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home_background">
        <div className="home_text">
          <h1>Holzmarktbäckerei</h1>
          <p>
            Willkommen bei der Backpfeife, eurer Nachbarschaftsbäckerei. Wir
            legen großen Wert auf die Herstellung köstlicher Backwaren mit Fokus
            auf Qualität, Geschmack und Nachhaltigkeit.
          </p>
          <h5>Holzmarktstraße 25, 10243 Berlin</h5>
          <h5 className="white">Dienstag - Samstag: 8:00 - 19:00</h5>
          <h5 className="white">Sonntag: 8:00 - 16:00</h5>
          <Button className="button_home" as={Link} to="/category">
            Online-Bestellungen
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
