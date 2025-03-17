import dotenv from "dotenv";
require('dotenv').config();


export default {
    secret: process.env.SECRET_KEY,
    expiresIn: "7d"
}
