module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 9500000
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 9500000
    },
    rinkeby:  {
     network_id: 4,
     host: "localhost",
     port:  8545,
     gas:   6900000
   }
  },
  compilers: {
    solc: {
       version: "0.5.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1000
        },
        //evmVersion: "constantinople"
      }
    }
  }
};
