'use strict'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class MoodMonthly extends Model {
        static associate(models) {
            MoodMonthly.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    MoodMonthly.init({
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
        mood: {
            type: DataTypes.STRING,
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
        modelName: 'MoodMonthly',
        tableName: 'moodsMonthly',
        timestamps: false
    });
    return MoodMonthly;
}