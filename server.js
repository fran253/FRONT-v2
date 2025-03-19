const express = require('express');
const app = express();

// Middleware para aumentar el tamaño máximo de los archivos que se pueden subir
app.use(express.json({ limit: '50mb' }));  // Para cuerpos JSON grandes
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Para formularios grandes

// Configura las rutas de tu aplicación
app.post('/upload', (req, res) => {
  // Tu lógica para manejar la carga de archivos
  res.send('Archivo subido con éxito');
});

// Puerto para escuchar
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
