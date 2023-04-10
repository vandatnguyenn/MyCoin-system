import Block from "./block";


const BLOCK_GENERATION_INTERVAL = 10;           // defines how often a block should be found. (in Bitcoin this value is 10 minutes)
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;      // defines how often the difficulty should adjust to the increasing or decreasing network hashrate. (in Bitcoin this value is 2016 blocks)


class Blockchain {
    public chain: Block[];

    constructor() {
        const genesisBlock = new Block(0, '0', {name: 'first block', data: 1000000000});
        this.chain = [genesisBlock];
    }

    getLastBlock():Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data: any, difficulty: number) {
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

    isValid(): Boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevHash = this.chain[i - 1];

            if (currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if (currBlock.prevHash !== prevHash.hash) {
                return false;
            }
        }
        return true;
    }

    // getDifficulty(aBlockchain: Blockchain) {
    //     const lastedBlock = aBlockchain[this.chain.length - 1];
    //     if (lastedBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && lastedBlock.index !== 0) {
    //         return this.getAdjustedDifficulty(lastedBlock, aBlockchain);
    //     }
    //     else {
    //         return lastedBlock.difficulty;
    //     }
    // }

    // getAdjustedDifficulty(lastedBlock: Block, aBlockchain: Blockchain) {
    //     const prevAdjustmentBlock = aBlockchain[this.chain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    //     const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    //     const timeTaken = lastedBlock.timeStamp.valueOf()- prevAdjustmentBlock.timeStamp.valueOf();
    //     if (timeTaken < timeExpected / 2) {
    //         return prevAdjustmentBlock.difficulty + 1;
    //     }
    //     else if (timeTaken > timeExpected * 2) {
    //         return prevAdjustmentBlock.difficulty - 1;
    //     }
    //     else {
    //         return prevAdjustmentBlock.difficulty;
    //     }
    // }
}

export default Blockchain;