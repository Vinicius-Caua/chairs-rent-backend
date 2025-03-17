const { Sequelize } = require('sequelize');
const databaseConfig = require('./database.js');

const sequelize = new Sequelize('cadeiras_reserva', 'postgres', 'root', {
    host: 'localhost',
    dialect:'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });
