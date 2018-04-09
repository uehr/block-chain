'use strict';
const loader = require('./sequelizeLoader');
const Sequelize = loader.Sequelize;

const Block = loader.database.define(
  'blocks',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    previousHash: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: false,
    timestamps: true,
    indexes: [
      {
        fields: ['id']
      }
    ]
  }
);

module.exports = Block;