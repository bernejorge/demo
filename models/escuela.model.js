module.exports = (sequelize, DataTypes) => {
  const Escuela = sequelize.define(
    "Escuela",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cantidadVotantes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { tableName: "Escuelas" }
  );

  Escuela.associate = (models) => {
    Escuela.hasMany(models.MesaElectoral, {
      onDelete: "cascade",
      foreignKey: {
        name: "escuela_id",
        allowNull: false,
      },
    });

    //    Escuela.hasMany(models.FiscalGralEleccion, {
    //     onDelete: "cascade"
    //    });
  };

  return Escuela;
};
