'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
     await queryInterface.createTable('tareas', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        titulo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        completada: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        usuarioFk: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "usuarios",
            key: "id",
          },
          onDelete: "RESTRICTED",
        }
     })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('tareas');
  }
};
