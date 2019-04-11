const Cereneum = artifacts.require("Cereneum");
const fs = require('fs');

function writeJsonFile(path, json) {
  fs.writeFileSync(path, JSON.stringify(json, null, 2), { flag: 'w' });
}

module.exports = function(deployer) {
  deployer.deploy(
    Cereneum,
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    10000000,
    1000,
    "0x97ae6FC8DFbB62072FcD07CB166a3ddF08C18bA6").then(() => {
      writeJsonFile('Cereneum-ABI.json', Cereneum.abi);
  });
};
