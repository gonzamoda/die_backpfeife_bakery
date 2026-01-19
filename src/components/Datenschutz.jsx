import React from "react";

const Datenschutz = () => {
  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4">Datenschutzerklärung</h1>

      <section className="mb-4">
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was
          mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
          besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können.
        </p>
      </section>

      <section className="mb-4">
        <h2>2. Hosting und Backend</h2>
        <h3>Google Firebase</h3>
        <p>
          Wir hosten unsere Website bei <strong>Google Firebase</strong>{" "}
          (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin
          4, Irland).
        </p>
        <p>
          Wenn Sie unsere Website besuchen, erfasst Firebase verschiedene
          Logfiles inkl. Ihrer IP-Adresse. Dies ist notwendig, um die Sicherheit
          und Stabilität der Website zu gewährleisten (Art. 6 Abs. 1 lit. f
          DSGVO). Wir haben einen Vertrag über die Auftragsverarbeitung
          (AV-Vertrag) mit Google abgeschlossen.
        </p>
      </section>

      <section className="mb-4">
        <h2>3. Cookies</h2>
        <p>
          Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind
          kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an.
          Sie werden entweder vorübergehend für die Dauer einer Sitzung
          (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem
          Endgerät gespeichert.
        </p>
        <p>
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
          Cookies informiert werden und Cookies nur im Einzelfall erlauben.
        </p>
      </section>

      <section className="mb-4">
        <h2>4. Bestellformular</h2>
        <p>
          Wenn Sie uns per Online-Formular Bestellungen zukommen lassen, werden
          Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
          angegebenen Kontaktdaten (Name, Telefon, E-Mail) zwecks Bearbeitung
          der Bestellung und für den Fall von Anschlussfragen bei uns
          gespeichert.
        </p>
        <p>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
          zusammenhängt (Bestellung von Waren).
        </p>
        <p>Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      </section>

      <section className="mb-4">
        <h2>5. Betroffenenrechte</h2>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
          gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
          und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung
          oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
          personenbezogene Daten können Sie sich jederzeit unter der im
          Impressum angegebenen Adresse an uns wenden.
        </p>
      </section>
    </div>
  );
};

export default Datenschutz;
