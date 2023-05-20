module.exports = (sequelize, DataTypes) =>{
    const Eleccion = sequelize.define('Eleccion', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        tableName: 'Elecciones'
    })

    return Eleccion;
}