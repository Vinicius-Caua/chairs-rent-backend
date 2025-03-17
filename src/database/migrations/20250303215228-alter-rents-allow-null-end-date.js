// migrations/XXXXXXXXXXXXXX-alter-rents-allow-null-end-date.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("rents", "end_date", {
      type: Sequelize.DATE,
      allowNull: true, // Permite valores nulos
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("rents", "end_date", {
      type: Sequelize.DATE,
      allowNull: false, // Reverte para NOT NULL
    });
  },
};
