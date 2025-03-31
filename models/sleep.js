'use strcit'
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Sleep extends Model {
        static associate(models) {
            Sleep.belongsTo(models.Usuario, { foreignKey: "usuarioFk", as: "usuario" });
        }
    }
    Sleep.init({
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
        horaDormir: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaDespertar: {
            type: DataTypes.TIME,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sueno: {
            type: DataTypes.STRING,
            allowNull: false
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
            onDelete: "CASCADE",
        },
    }, {
        sequelize,
        modelName: 'Sleep',
        tableName: 'sleeps',
        timestamps: false
    });
    return Sleep;
}