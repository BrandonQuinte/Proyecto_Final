const Todo = require("../models/todoModel");
const { sequelize } = require("../config/db");

async function seedTodos() {
  try {
    await Todo.destroy({ where: {} });

    await Todo.bulkCreate([
      { title: "Comprar alimentos", description: "Leche, pan, frutas", status: "pendiente" },
      { title: "Estudiar para el examen", description: "Repasar matemáticas y física", status: "en progreso" },
      { title: "Hacer ejercicio", description: "Correr 30 minutos", status: "completado" },
      { title: "Leer un libro", description: "Libro de desarrollo personal", status: "pendiente" },
      { title: "Llamar a mamá", description: "Preguntar cómo está", status: "pendiente" }
    ]);

    console.log("✅ Tabla Todo poblada con registros de ejemplo!");
  } catch (error) {
    console.error("❌ Error al poblar la tabla:", error);
  }
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");

    await seedTodos();
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await sequelize.close();
  }
}

main();
