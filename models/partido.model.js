module.exports = (sequelize, DataTypes) => {
  const Partido = sequelize.define("Partido", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Partido;
};
