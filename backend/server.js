const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const usuariosValidos = ['maxi', 'tati', 'mauri', 'anto'];

app.get('/validar/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const esValido = usuariosValidos.includes(nombre);
    res.json({ valido: esValido });
});

app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.json({ mensaje: `Hola, ${nombre}!` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
