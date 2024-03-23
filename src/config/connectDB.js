const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_mlb', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection mysql successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB
