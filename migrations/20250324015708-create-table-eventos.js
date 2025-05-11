'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      descripcion: {
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
        onDelete: "RESTRICT",
      },
    });
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventos');
  }
};