const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASSWORD,
  {
    host: process.env.MYSQL_DB_HOST,
    port: +process.env.MYSQL_DB_PORT,
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
