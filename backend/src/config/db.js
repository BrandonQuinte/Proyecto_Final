const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"),
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✔ Conectado a SQLite");

    // Importar modelos DESPUÉS de crear sequelize instance
    require("../models/todoModel");

    // Sincronizar modelos con la BD (crea tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log("✔ Tablas sincronizadas");

    return sequelize;
  } catch (error) {
    console.error("❌ Error al conectar SQLite:", error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
