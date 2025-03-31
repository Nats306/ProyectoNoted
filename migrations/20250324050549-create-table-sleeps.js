'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('sleeps', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fecha: {
      type: Sequelize.DATE,
      allowNull: false
      },
      horaDormir: {
        type: Sequelize.TIME,
        allowNull: false
      },
      horaDespertar: {
        type: Sequelize.TIME,
        allowNull: false
      },
      duracion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      calidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sueno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notasAdicionales: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      usuarioFk: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "RESTRICTED",
      },
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('sleeps');
  }
};
