const Cereneum = artifacts.require("Cereneum");
const fs = require('fs');

function writeJsonFile(path, json) {
  fs.writeFileSync(path, JSON.stringify(json, null, 2), { flag: 'w' });
}

module.exports = function(deployer) {
  deployer.deploy(
    Cereneum,
    "0xed75cf5df074fdf60702bfbf75049d53ebe942e09ad9fe1b1467df516dd3fb5b",
    "0x55578a1969d16ed5dfc2c0db358da80d4120a2f03a17416f6f65872769c048a7",
    "0xede6b23f247125725e4bc5d6a1780c5278032508ba4a5d475daf91622aa1fe25",
    "0x7023649ffe4d83823ac2f3fa1303affde4de4737b07d9d4830270206f246be77",
    "0xaaa30c59d92230d02247a811c2812e378a4ffb29e64a54407d00fc6d7b269f33",).then(() => {
      writeJsonFile('Cereneum-ABI.json', Cereneum.abi);
  });
};
