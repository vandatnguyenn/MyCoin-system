const hash = require('crypto-js/sha256');

class Block {
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();
        this.mineVar = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar.toString()).toString();
    }

    mine(difficulty) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.mineVar++;
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain {
    constructor(difficulty) {
        const genesisBlock = new Block('0000', {name: 'first block', data: 1000000000});
        this.difficulty = difficulty;
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash ,data);

        console.log('start mining');
        console.time('mine');
        newBlock.mine(this.difficulty);
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
}

const datBlock = new BlockChain(5);
console.log(datBlock);

datBlock.addBlock({name: 'second block', data: 2000000});
datBlock.addBlock({name: 'third block', data: 3000000});

console.log(datBlock.chain);