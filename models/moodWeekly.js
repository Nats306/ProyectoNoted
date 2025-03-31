'use strict'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class MoodWeekly extends Model {
        static associate(models) {
            MoodWeekly.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    MoodWeekly.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        enojo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        miedo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alegria: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tristeza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        culpa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        desesperanza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        frustracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        otras: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        modelName: 'MoodWeekly',
        tableName: 'moodsWeekly',
        timestamps: false
    });
    return MoodWeekly;
}