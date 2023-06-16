module.exports = (sequelize, DataTypes) => {
    const Candidato = sequelize.define("Candidato", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apellido:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Candidato;
  };
  