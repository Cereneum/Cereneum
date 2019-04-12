# Cereneum

Cereneum is an Ethereum ERC20 token and contract that airdrops to BTC, BCH, BSV, ETH and LTC simultaneously. Cereneum tokens can be staked for specified time periods and will receive interest payouts. For a detailed explanation please visit www.cereneum.com

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

## Deployment

Make sure Ganache is running with the proper configurations matched to truffle-config.js

```
truffle migrate
```

## Acknowledgements

A big thank you to the OpenZeppelin team for the ERC20, SafeMath and MerkleProof libraries.
https://github.com/OpenZeppelin/openzeppelin-solidity

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
