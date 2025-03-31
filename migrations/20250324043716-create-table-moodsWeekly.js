'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('moodsWeekly', {
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
      enojo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      miedo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      alegria: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tristeza: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      culpa: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      desesperanza: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      frustracion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      otras: {
        type: Sequelize.INTEGER,
        allowNull: false
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

  down: async(queryInterface, Sequelize)=>{
    await queryInterface.dropTable('moodsWeekly');
  }
};
