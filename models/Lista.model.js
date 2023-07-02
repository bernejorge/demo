module.exports = (sequelize, DataTypes) => {
  const ListaElectoral = sequelize.define(
    "ListaElectoral",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_lista:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      partido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      candidato_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eleccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
        tableName: 'ListasElectorales'
    },
  );

  ListaElectoral.associate = (models) => {
    ListaElectoral.belongsTo(models.Partido, { foreignKey: 'partido_id' });
    ListaElectoral.belongsTo(models.Candidato, { foreignKey: 'candidato_id' });
    ListaElectoral.belongsTo(models.Eleccion, { foreignKey: 'eleccion_id' });
    ListaElectoral.belongsTo(models.Cargo, { foreignKey: 'cargo_id' });
  };

  return ListaElectoral;
};
