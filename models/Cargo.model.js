module.exports = (sequelize, DataTypes) => {
    const Cargo = sequelize.define("Cargo", {
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
  
    return Cargo;
  };
  