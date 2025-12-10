require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db"); // 🔹 Importamos desde el objeto

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function startBackend() {
  db = await connectDB(); // 🔹 No necesitamos pasar process.env.DATABASE_URL

  // Inyectar conexión MySQL en req
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Rutas
  app.use("/api/todos", require("./routes/todos"));

  // Arrancar servidor
  app.listen(process.env.PORT, () => {
    console.log(`Backend corriendo en puerto ${process.env.PORT}`);
  });
}

startBackend();
