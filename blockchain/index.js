const hash = require('crypto-js/sha256');

const BLOCK_GENERATION_INTERVAL = 10;           // defines how often a block should be found. (in Bitcoin this value is 10 minutes)
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;      // defines how often the difficulty should adjust to the increasing or decreasing network hashrate. (in Bitcoin this value is 2016 blocks)

class Block {
    constructor(index, prevHash, data, difficulty = 0) {
        this.index = index;
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();
        this.nonce = 0;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.nonce.toString()).toString();
    }

    mine(difficulty) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain {
    constructor() {
        const genesisBlock = new Block(0, '0', {name: 'first block', data: 1000000000});
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data, difficulty) {
        const lastBlock = this.getLastBlock();
        const nextIndex = lastBlock.index + 1;

        const newBlock = new Block(nextIndex, lastBlock.hash ,data, difficulty);

        console.log('start mining');
        console.time('mine');
        newBlock.mine(difficulty);
        console.timeEnd('mine');
        console.log('end mining');

        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevHash = this.chain[i - 1];

            if (currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if (currBlock.prevHash !== prevHash.hash) {
                return false;
            }

            return true;
        }
    }

    getDifficulty(aBlockchain) {
        const lastedBlock = aBlockchain[this.chain.length - 1];
        if (lastedBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && lastedBlock.index !== 0) {
            return this.getAdjustedDifficulty(lastedBlock, aBlockchain);
        }
        else {
            return lastedBlock.difficulty;
        }
    }

    getAdjustedDifficulty(lastedBlock, aBlockchain) {
        const prevAdjustmentBlock = aBlockchain[this.chain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
        const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
        const timeTaken = lastedBlock.timeStamp- prevAdjustmentBlock.timeStamp;
        if (timeTaken < timeExpected / 2) {
            return prevAdjustmentBlock.difficulty + 1;
        }
        else if (timeTaken > timeExpected * 2) {
            return prevAdjustmentBlock.difficulty - 1;
        }
        else {
            return prevAdjustmentBlock.difficulty;
        }
    }
}

class TransactionOutput {
    constructor(address, amount) {
        this.address = address;
        this.amount = amount;
    }
}

class TransactionInput {
    constructor(txOutID, txOutIndex, signature) {
        this.txOutID = txOutID;
        this.txOutIndex = txOutIndex;
        this.signature = signature;
    }
}

class Transaction {
    constructor(txIn, txOut) {
        this.txIns.push(txIn);
        this.txOuts.push(txOut);
    }
    

}

function getTransactionID (transaction) {
    const txInContent = transaction.txIns.map((txIn) => {
        txIn.txOutID + txIn.txOutIndex
    }).reduce((a, b) => a + b, '');

    const txOutContent = transaction.txOuts.map((txOut) => {
        txOut.address + txOut.amount
    }).reduce((a, b) => a + b, '');
    return hash(txInContent + txOutContent).toString();
};


 

const datBlock = new BlockChain();
console.log(datBlock);

datBlock.addBlock({name: 'second block', data: 2000000}, 4);
datBlock.addBlock({name: 'third block', data: 3000000}, 4);
datBlock.addBlock({name: 'fourth block', data: 2000000}, 4);
datBlock.addBlock({name: 'fifth block', data: 3000000}, 4);
datBlock.addBlock({name: 'sixth block', data: 2000000}, 4);
datBlock.addBlock({name: 'seventh block', data: 3000000}, 4);
datBlock.addBlock({name: 'eighth block', data: 2000000}, 4);
datBlock.addBlock({name: 'ninth block', data: 3000000}, 4);
datBlock.addBlock({name: 'tenth block', data: 2000000}, 4);
datBlock.addBlock({name: 'eleventh block', data: 3000000}, 4);
datBlock.addBlock({name: 'twelfth block', data: 2000000}, 4);

console.log(datBlock.chain);