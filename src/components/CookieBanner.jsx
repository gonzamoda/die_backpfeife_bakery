import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Revisamos localStorage al montar
    const consent = localStorage.getItem("cookieConsent");

    // Si ya existe una decisión (accepted o rejected), ocultamos.
    // Si es null (primera vez), se mantiene true (visible).
    if (consent === "accepted" || consent === "rejected") {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  // Si el estado dice que no es visible, no renderizamos nada
  if (!isVisible) return null;

  return (
    // Usamos styles.banner en lugar de className
    <div style={styles.banner}>
      <div style={styles.content}>
        <h3 style={styles.heading}>🍪 Cookie-Einstellungen</h3>
        <p style={styles.text}>
          Wir nutzen Cookies auf unserer Website. Einige von ihnen sind
          essenziell, während andere uns helfen, diese Website und Ihre
          Erfahrung zu verbessern.
        </p>

        <div style={styles.buttonContainer}>
          <button onClick={handleAccept} style={styles.acceptBtn}>
            Alle akzeptieren
          </button>
          <button onClick={handleReject} style={styles.rejectBtn}>
            Nur essenzielle
          </button>
        </div>

        <div style={styles.linkContainer}>
          <Link to="/impressum" style={styles.link}>
            Impressum
          </Link>
          <span style={{ color: "#7f8c8d", margin: "0 5px" }}>|</span>
          <Link to="/datenschutz" style={styles.link}>
            Datenschutz
          </Link>
        </div>
      </div>
    </div>
  );
};

// ESTILOS DEFINIDOS AQUÍ MISMO (Imposible que fallen)
const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#2c3e50", // Gris oscuro
    color: "white",
    padding: "20px",
    zIndex: 99999, // Z-index EXTREMO para ganarle a todo
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    maxWidth: "960px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: "0.95rem",
    marginBottom: "25px",
    color: "#ecf0f1",
    maxWidth: "680px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    lineHeight: "1.5",
  },
  buttonContainer: {
    marginBottom: "15px",
  },
  acceptBtn: {
    backgroundColor: "#e67e22",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  rejectBtn: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  linkContainer: {
    fontSize: "0.8rem",
  },
  link: {
    color: "#bdc3c7",
    textDecoration: "underline",
    margin: "0 5px",
    cursor: "pointer",
  },
};

export default CookieBanner;
