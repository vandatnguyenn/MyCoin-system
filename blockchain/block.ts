// import hash from 'crypto-ts';

import hash from 'crypto-js/sha256';

class Block {
    public index: number;
    public prevHash: string;
    public data: any;
    public timeStamp: Date;
    public nonce: number;
    public difficulty: number;
    public hash: string;

    constructor(index: number, prevHash: string, data: any, difficulty : number = 0) {
        this.index = index;
        this.prevHash = prevHash;
        this.data = data;
        this.difficulty = difficulty;
        this.timeStamp = new Date();
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return hash(this.index + this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.nonce.toString()).toString();
    }

    mine(difficulty: number) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

export default Block;