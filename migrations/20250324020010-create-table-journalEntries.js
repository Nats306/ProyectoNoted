'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('journalEntries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      emociones: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pensamientos: {
        type: Sequelize.TEXT,
        allowNull: true
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
        onDelete: "RESTRICT",
      },
    })
  },

  down: async(queryInterface, Sequelize) =>{
    await queryInterface.dropTable('journalEntries');
  }
};
