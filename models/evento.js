'use strict'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Evento extends Model {
        static associate(models) {
            Evento.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    Evento.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora:{
            type: DataTypes.TIME,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        usuarioFk: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "usuarios",
              key: "id",
            },
            onDelete: "RESTRICTED",
        },
    }, {
        sequelize,
        modelName: 'Evento',
        tableName: 'eventos',
        timestamps: false
    });
    return Evento;
}