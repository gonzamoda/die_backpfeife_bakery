import React from "react";

const Impressum = () => {
  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4">Impressum</h1>

      <section className="mb-4">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Die Backpfeife Bakery</strong>
          <br />
          Inhaber/in: [NOMBRE DEL DUEÑO]
          <br /> {/* <--- RELLENA ESTO */}
          [CALLE Y NÚMERO]
          <br /> {/* <--- RELLENA ESTO */}
          [CÓDIGO POSTAL Y CIUDAD]
          <br /> {/* <--- RELLENA ESTO */}
          Deutschland
        </p>
      </section>

      <section className="mb-4">
        <h2>Kontakt</h2>
        <p>
          Telefon: [NÚMERO DE TELÉFONO]
          <br /> {/* <--- RELLENA ESTO */}
          E-Mail: [TU EMAIL] {/* <--- RELLENA ESTO */}
        </p>
      </section>

      <section className="mb-4">
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          [TU NÚMERO DE IDENTIFICACIÓN FISCAL, ej: DE123456789]
        </p>
      </section>

      <hr />
      <p className="text-muted small">
        Quelle:{" "}
        <a
          href="https://www.e-recht24.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          e-recht24.de
        </a>
      </p>
    </div>
  );
};

export default Impressum;
