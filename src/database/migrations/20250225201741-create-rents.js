"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("rents", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            // Chaves estrangeiras
            user_id: {
                // Referência ao usuário
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },
            chair_id: {
                // Referência à cadeira
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "chairs",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },
            // Datas do aluguel
            start_date: {
                // Data de início
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                // Data de fim
                type: Sequelize.DATE,
                allowNull: false,
            },
            // Timestamps
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
        await queryInterface.dropTable("rents");
    },
};
