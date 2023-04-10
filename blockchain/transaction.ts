import hash from 'crypto-js/sha256';

class TxOut {
    public address: string;
    public amount: number;
    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}

class TxIn {
    public txOutID: string;
    public txOutIndex: number;
    public signature: string;
}

class UnspentTxOut {
    public readonly txOutID: string;
    public readonly txOutIndex: number;
    public readonly address: string;
    public readonly amount: number;

    constructor(txOutID: string, txOutIndex: number, address: string, amount: number) {
        this.txOutID = txOutID;
        this.txOutIndex = txOutIndex;
        this.address = address;
        this.amount = amount;
    }
}

class Transaction {
    public id: string;
    public txIns: TxIn[];
    public txOuts: TxOut[];
}

const getTransactionID = (transaction: Transaction): string => {
    const txInContent = transaction.txIns.map((txIn) => {
        txIn.txOutID + txIn.txOutIndex
    }).reduce((a, b) => a + b, '');

    const txOutContent = transaction.txOuts.map((txOut) => {
        txOut.address + txOut.amount
    }).reduce((a, b) => a + b, '');
    return hash(txInContent + txOutContent).toString();
}

// const signTxIn = (transaction: Transaction, txInIndex: number, privateKey: string, aUnspentTxOuts: UnspentTxOut[]): string => {
//     const txIn = transaction.txIns[txInIndex];
//     const dataToSign = transaction.id;
//     const referencedUnspentTxOut = findUnspentTxOut(txIn.txOutID, txIn.txOutIndex, aUnspentTxOuts);
//     if (referencedUnspentTxOut == null) {
//         console.log('Could not find referenced txOut');
//         throw Error();
//     }
//     const referencedAddress = referencedUnspentTxOut.address;
//     if (getPublicKey(privateKey) !== referencedAddress) {
//         console.log('Not match the address that is referenced in txIn');
//         throw Error();
//     }
//     const key = ec.keyFromPrivate(privateKey, 'hex');
//     const signature = toHexString(key.sign(dataToSign).toDER());

//     return signature;

// }

export default Transaction;