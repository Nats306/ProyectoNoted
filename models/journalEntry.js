'use strict'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class JournalEntry extends Model {
        static associate(models) {
            JournalEntry.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    JournalEntry.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        emociones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pensamientos: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notasAdicionales: {
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
        modelName: 'JournalEntry',
        tableName: 'journalEntries',
        timestamps: false
    });
    return JournalEntry;
}