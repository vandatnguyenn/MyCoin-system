import * as secp256k1 from "secp256k1";
import Blockchain from "./chain";
import Transaction from "./transaction";

const datBlock = new Blockchain();
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

// ts-node index.ts