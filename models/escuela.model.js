 
module.exports = (sequelize, DataTypes) => {
    const Escuela = sequelize.define("Escuela",{
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion:  {
            type: DataTypes.STRING,
            allowNull: true
        },
        cantidadVotantes:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{tablename: "Escuelas"});

    Escuela.associate = (models) => {
       Escuela.hasMany(models.MesaElectoral, {
        onDelete: "cascade",
        foreignKey: {
            name: 'escuela_id'
        }
       });

    //    Escuela.hasMany(models.FiscalGralEleccion, {
    //     onDelete: "cascade"
    //    });

    };



    return Escuela;
}