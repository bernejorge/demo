module.exports = (sequelize, DataTypes) => {
    const resultado = sequelize.define(
      "Resultado",
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
        votosAfirmativos: {
          type: DataTypes.INTEGER,
        },
        votosBlancos: {
          type: DataTypes.INTEGER,
        },
        votosNulos: {
          type: DataTypes.INTEGER,
        },
        votosRecurridos: {
          type: DataTypes.INTEGER,
        },
        votosImpuganados: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "ResultadoMesa",
      }
    );
  
    resultado.associate = (models) => {
      resultado.belongsTo(models.MesaElectoral, {
        foreignKey: "mesa_id",
      });
      resultado.belongsTo(models.Cargo, {
        foreignKey: "cargo_id",
      });
      
      resultado.prototype.getDetalleResultado = async function () {
        const detalles = await sequelize.query(
          `SELECT * FROM DetalleResultado WHERE mesa_id = :mesa_id AND cargo_id = :cargo_id`,
          {
            replacements: { mesa_id: this.mesa_id, cargo_id: this.cargo_id },
            type: QueryTypes.SELECT,
            model: sequelize.models.DetalleResultado,
          }
        );
    
        return detalles;
      };

    };
  
    return resultado;
  };