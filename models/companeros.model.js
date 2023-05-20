module.exports = (sequelize, DataTypes) =>{
    const companeros = sequelize.define('Companeros',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        dni:{
            type: DataTypes.STRING,
            allowNull: true
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: true
        },
        
        tel:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    return companeros;
}