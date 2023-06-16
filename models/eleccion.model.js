module.exports = (sequelize, DataTypes) => {
  const Eleccion = sequelize.define(
    "Eleccion",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: "Elecciones",
    }
  );

  return Eleccion;
};
