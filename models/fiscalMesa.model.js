module.exports = (sequelize, DataTypes) => {
  const FiscalDeMesa = sequelize.define(
    "FiscalDeMesa",
    {
      mesa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      companero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    { tableName: "FiscalesDeMesas" }
  );

  FiscalDeMesa.associate = (models) => {
    FiscalDeMesa.belongsTo(models.MesaElectoral, { foreignKey: "mesa_id" });
    FiscalDeMesa.belongsTo(models.Companero, { foreignKey: "companero_id" });
  };
  return FiscalDeMesa;
};
