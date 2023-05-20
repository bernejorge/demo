module.exports = (sequelize, DataTypes)=>{
    const MesaElectoral = sequelize.define("MesaElectoral",{
        idMesa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
           
        },
        eleccion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            
        }

    },{tablename: "MesasElectorales"});
    MesaElectoral.associate = (models)=>{
        MesaElectoral.belongsTo(models.Eleccion, { foreignKey: 'eleccion_id' });
        MesaElectoral.belongsTo(models.Escuela, { foreignKey: {
            allowNull: false,
            name: 'escuela_id'
        } });
    };

    return MesaElectoral;
}