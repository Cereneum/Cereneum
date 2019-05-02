const Cereneum = artifacts.require("Cereneum");
const fs = require('fs');

function writeJsonFile(path, json) {
  fs.writeFileSync(path, JSON.stringify(json, null, 2), { flag: 'w' });
}

module.exports = function(deployer) {
  deployer.deploy(
    Cereneum,
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0xe816fb9a191ac8d5566f243b6b7601022b527677d70c21e1587eec833644993b",
    "0xa4a114e9ab202fd0a5aefa0f09a0fcfeb111326c4c86f9af35b9a871647b5225",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x822abb98d787964d17e124774efdd64f8687a0cfc43c8610094db621070066c7",).then(() => {
      writeJsonFile('Cereneum-ABI.json', Cereneum.abi);
  });
};
