const cyptoJS = require("crypto-js")
const BlockChain = require('./models/block.js');
const loader = require('./models/sequelizeLoader');
const Sequelize = loader.Sequelize;
const sequelize = loader.database;
class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index
    this.previousHash = previousHash.toString()
    this.timestamp = timestamp
    this.data = data
    this.hash = hash.toString()
  }
}
const genesisBlock = new Block(0, "0", 1465154705, "Genesis block", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7")

BlockChain.sync().then(model => {
 return BlockChain.count()
}).then(cnt => {
  if(cnt < 1) BlockChain.create(genesisBlock)
}).catch(err => {
  console.log(err)
})

const calculateHash = (index, previousHash, timestamp, data) => {
  return cyptoJS.SHA256(index + previousHash + timestamp + data).toString()
}

const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data)
}

const generateNextBlock = (blockData) => {
  let previousBlock = getLatestBlock()
  let nextIndex = previousBlock.index() + 1
  let nextTimestamp = new Date().getTime() / 1000
  let nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData)
  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash)
}

const isValidNewBlock = (newBlock, previousBlock) => {
  if(previousBlock + index + 1 !== newBlock.index){
    console.log("invalid index")
    return false
  }else if(previousBlock.hash !== newBlock.previousHash){
    console.log("invalid previoushash")
    return false
  }else if(calculateHashForBlock(newBlock) !== newBlock.hash){
    console.log(`invalid hash: ${calculateHashForBlock(newBlock)} ${newBlock.hash}`)
    return false
  }
  return true
}

const replaceChain = (newBlocks) => {
  if(isValidChain(newBlocks) && newBlocks.length > blockchain.length){
    console.log("received blockchain is valid. replacing current block chain with received blockchain")
    blockChain = newBlocks
    broadcast(responseLatestMsg())
  }else{
    console.log("received blockchain invalid")
  }
}