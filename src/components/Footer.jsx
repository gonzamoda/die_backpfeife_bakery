import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container text-center">
        {/* Enlaces Legales en una sola línea */}
        <div className="d-flex justify-content-center gap-4 mb-2">
          <Link to="/impressum" style={styles.link}>
            Impressum
          </Link>

          <Link to="/datenschutz" style={styles.link}>
            Datenschutz
          </Link>
        </div>

        {/* Copyright muy sutil */}
        <div className="d-flex justify-content-center">
          <p style={styles.copy}>
            &copy; {new Date().getFullYear()} Die Backpfeife
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#241f17", // Negro puro
    padding: "15px 0", // Poca altura
    marginTop: "auto", // Para que se pegue al fondo
    borderTop: "1px solid #222", // Línea muy sutil arriba
  },
  link: {
    color: "#777879ff", // Gris claro
    textDecoration: "none",
    fontSize: "0.65rem", // Letra chica
    textTransform: "uppercase", // Mayúsculas se ve más "fino" en tamaños chicos
    letterSpacing: "1px",
  },
  copy: {
    color: "#444", // Gris muy oscuro para que no moleste
    fontSize: "0.7rem", // Muy chiquito
    margin: 0,
  },
};

export default Footer;
