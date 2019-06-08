# Cereneum

Cereneum is an Ethereum ERC20 token and contract that airdrops to BTC, BCH, BSV, ETH and LTC simultaneously. Cereneum tokens can be staked for specified time periods and will receive interest payouts. For a detailed explanation please visit www.cereneum.com

The project requires a Merkle Tree Root for each blockchain supported. You may check the Unit Tests for several examples of working Merkle Tree Proofs. The UTXOs and Merkle Trees for all 5 chains will be made public (as CSV files) after the Snapshot date.

## Getting Started

Install truffle and ganache. https://truffleframework.com/

I recommend atom as well. https://atom.io/

### Prerequisites

Create a directory and initialize it
```
truffle init
```

### Installing

Copy contracts, migrations and test files into proper directories.

## Running the tests

There are currently over 70 Unit Tests for Cereneum.

```
truffle test
```

It is important to note that the contract has temporary functions only meant for Unit Testing. For example, testAdjustContractLaunchTime subtracts X days from the launch timestamp of the project, effectively moving contract time forward by X days. These test functions will be removed before the final version of the contract is uploaded but are very helpful for Unit Testing.

## Deployment

Make sure Ganache is running with the proper configurations matched to truffle-config.js

```
truffle migrate
```

## UTXO Snapshots

The UTXO Snapshots of all 5 chains can be downloaded here for public verification

https://drive.google.com/open?id=13550Xcs1hRLkEoum4KXuqQcVr2o0-s63

## Acknowledgements

A big thank you to the OpenZeppelin team for the ERC20, SafeMath and MerkleProof libraries.
https://github.com/OpenZeppelin/openzeppelin-solidity

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
