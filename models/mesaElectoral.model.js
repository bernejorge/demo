module.exports = (sequelize, DataTypes) => {
  const MesaElectoral = sequelize.define(
    "MesaElectoral",
    {
      numeroMesa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eleccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad_votantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "MesasElectorales",
    }
  );
  MesaElectoral.associate = (models) => {
    MesaElectoral.belongsTo(models.Eleccion, { foreignKey: "eleccion_id" });
    MesaElectoral.belongsTo(models.Escuela, {
      foreignKey: {
        name: "escuela_id",
        allowNull: false,
      },
    });
    
    MesaElectoral.hasMany(models.Resultado, { 
      onDelete: "cascade", 
      foreignKey: {
        name: "mesa_id",
        allowNull: false,
      } 
    });
  };

  return MesaElectoral;
};
