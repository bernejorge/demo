module.exports = (sequelize, DataTypes) => {
    const detalleResultado = sequelize.define(
      "DetalleResultado",
      {
        mesa_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cargo_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        lista_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cantidadVotos: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "DetalleResultado",
      }
    );
  
    detalleResultado.associate = (models) => {
      detalleResultado.belongsTo(models.ListaElectoral,{foreignKey:"lista_id"})
        detalleResultado.belongsTo(models.Resultado, {
            foreignKey: "mesa_id",
            constraints: false, // Desactiva la creación automática de la restricción de clave externa
          });
          detalleResultado.belongsTo(models.Resultado, {
            foreignKey: "cargo_id",
            constraints: false, // Desactiva la creación automática de la restricción de clave externa
          });
    };
  
    return detalleResultado;
  };