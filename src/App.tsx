import React from 'react';
import Form from "./components/Form";
import './App.css';

function App() {
  return (
    <>
      <header>
        <h1 className="header-h1">DescargadorYT</h1>
      </header>
      <main>
        <p className="main-p-indicacion">1. Pega la URL del video de YouTube y presiona el botón Start para comenzar.</p>
        <p className="main-p-indicacion">2. Una vez que aparezcan los datos del video selecciona el formato y presiona el botón Descargar. Si solo quieres descargar el audio del video, simplemente presiona Descargar en formato wav o Descargar en formato mp3.</p>
        <hr />
        <Form />
      </main>
      <footer>
        <p className="footer-p">Copyright &copy;2024</p>
      </footer>
    </>
  );
}

export default App;
