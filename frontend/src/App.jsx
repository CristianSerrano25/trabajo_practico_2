import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Ingreso() {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarClick = async () => {
    setError('');

    try {
      const res = await fetch(`http://localhost:3000/validar/${nombre}`);
      const data = await res.json();

      if (!data.valido) {
        setError('Nombre no válido. Intenta con otro.');
      } else {
        navigate(`/saludo/${nombre}`);
      }
    } catch {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Validar Nombre</h1>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={manejarClick}>Enviar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function Saludo() {
  const { nombre } = useParams();
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/saludo/${nombre}`)
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje))
      .catch(() => setMensaje('Error al obtener el saludo.'));
  }, [nombre]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{mensaje}</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ingreso />} />
        <Route path="/saludo/:nombre" element={<Saludo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
