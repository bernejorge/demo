module.exports = (sequelize, DataTypes) => {
  const fiscalGralEleccion = sequelize.define(
    "FiscalGralEleccion",
    {
      companero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      escuela_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      eleccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "FiscalesGenerales",
    }
  );

  fiscalGralEleccion.associate = (models) => {
    fiscalGralEleccion.belongsTo(models.Companero,
        {
            foreignKey: "companero_id"
        });
    
    fiscalGralEleccion.belongsTo(models.Escuela,
        {
            foreignKey: "escuela_id"
        });

    fiscalGralEleccion.belongsTo(models.Eleccion,
        {
            foreignKey: "eleccion_id"
        });
  };
  return fiscalGralEleccion;
};
