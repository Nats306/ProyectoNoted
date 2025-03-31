'use strict'
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class Usuario extends Model{
        static associate(models){
            Usuario.hasMany(models.Evento, { foreignKey: "usuarioFk", as: "Evento" })
            Usuario.hasMany(models.JournalEntry, { foreignKey: "usuarioFk", as: "JournalEntry" })
            Usuario.hasMany(models.MoodMonthly, { foreignKey: "usuarioFk", as: "MoodMonthly" })
            Usuario.hasMany(models.MoodWeekly, { foreignKey: "usuarioFk", as: "MoodWeekly" })
            Usuario.hasMany(models.Sleep, { foreignKey: "usuarioFk", as: "Sleep" })
            Usuario.hasMany(models.Tarea, { foreignKey: "usuarioFk", as: "Tarea" })
            Usuario.hasMany(models.Water, { foreignKey: "usuarioFk", as: "Water" })
        }
        async validarPassword(password){
            return await bcrypt.compare(password, this.password);
        }
    }
    Usuario.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nombreCompleto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreUsuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Activo"
        }
    },{
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false,

        hooks: {
            beforeCreate: async(usuario) =>{
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    });
    return Usuario;
}