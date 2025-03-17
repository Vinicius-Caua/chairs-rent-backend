"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("chairs", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            location: {
                // Localidade (ex: "Área VIP")
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                // Status pré-definidos
                type: Sequelize.ENUM("available", "occupied", "maintenance"),
                defaultValue: "available",
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("chairs");
    },
};
