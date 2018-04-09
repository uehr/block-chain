const Block = require('./models/block.js');
const loader = require('./models/sequelizeLoader');
const Sequelize = loader.Sequelize;
const sequelize = loader.database;
Block.sync()