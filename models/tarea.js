'use strict'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Tarea extends Model {
        static associate(models) {
            Tarea.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    Tarea.init({
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
        completada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        usuarioFk: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "usuarios",
              key: "id",
            },
            onDelete: "CASCADE",
        }
    }, {
        sequelize,
        modelName: 'Tarea',
        tableName: 'tareas',
        timestamps: false
    });
    return Tarea;
}