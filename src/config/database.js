import dotenv from "dotenv";
require('dotenv').config();

module.exports = {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.USERNAME_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
