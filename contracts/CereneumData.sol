pragma solidity ^0.5.2;

import "./MerkleProof.sol";
import "./ERC20.sol";
import "./SafeMath.sol";

contract CereneumData is ERC20
{
  using SafeMath for uint256;

  //Launch timestamp of contract used to track how long contract has been running
  uint256 internal m_tContractLaunchTime;

  //Root hashes of the 5 UTXO Merkle trees. Used to verify claims.
  //0=BTC, 1=BCH, 2=BSV, 3=ETH, 4=LTC
  bytes32[5] internal m_hMerkleTreeRootsArray;

  //Total number of UTXO's at snapshot. Used for calculating bonus rewards.
  uint256 internal m_nUTXOCountAtSnapshot;

  //Maximum number of redeemable coins at snapshot.
  uint256 internal m_nMaxRedeemable;	//TODO ON LAUNCH DAY

  //For Prosperous bonus we need to use the adjusted redeemable amount
  //That has the whale penalties applied (lowering claimable supply)
  uint256 public m_nAdjustedMaxRedeemable;  //TODO ON LAUNCH DAY

  //Genesis Address
  address internal m_genesis;

  //Store the BTC ratios for BCH, BSV, ETH and LTC
  uint16[4] m_blockchainRatios;

  enum AddressType { LegacyUncompressed, LegacyCompressed, SegwitUncompressed, SegwitCompressed }
  enum BlockchainType { Bitcoin, BitcoinCash, BitcoinSV, Ethereum, Litecoin }

  //Track how many tokens and UTXOs have been redeemed.
  //These are used for calculating bonus rewards.
  uint256 public m_nTotalRedeemed = 0;
  uint256 public m_nRedeemedCount = 0;

  //Map of redeemed UTXOs to boolean (true/false if redeemed or not)
  //TODO: Should this be addresses instead? Accomplishes same thing but 12 less bytes of data
  mapping(uint8 => mapping(bytes32 => bool)) internal m_claimedAddressesMap;

  //Store the last day UpdateDailyData() was successfully executed
  uint256 internal m_nLastUpdatedDay = 0;

  //Daily data
  struct DailyDataStuct
  {
    uint256 nPayoutAmount;
    uint256 nTotalStakeShares;
  }

  //Map to store daily historical data. Could have been array instead of map
  //but continuously adding to an array makes gas costs tricky.
  mapping(uint256 => DailyDataStuct) public m_dailyDataMap;

  //Stakes Storage
  struct StakeStruct
  {
    uint256 nAmountStaked;
    uint256 nSharesStaked;	//Get bonus shares for longer stake times
    uint256 nCompoundedPayoutAccumulated;
    uint256 tLockTime;
    uint256 tEndStakeCommitTime;
    uint256 tLastCompoundedUpdateTime;
    uint256 tTimeRemovedFromGlobalPool;
    uint8 nVotedOnMultiplier;
    bool bIsInGlobalPool;
    bool bIsLatePenaltyAlreadyPooled;
  }

  //Map of addresses to StakeStructs.
  mapping(address => StakeStruct[]) public m_staked;

  //Accumulated early/late unstake penalties to go into next staker pool as rewards
  uint256 internal m_nEarlyAndLateUnstakePool;

  //Track the number of staked tokens and shares
  uint256 public m_nTotalStakedTokens;
  uint256 public m_nTotalStakeShares;	//TODO: Do we want stake shares to be known?

  //The latest interest multiplier voted on by the majority of the staker pool
  uint8 public m_nInterestMultiplier = 1;

  //The number of stake shares voting for each interest multiplier
  //1 keeps the base 5% interest (minimum), 2 is 10%, ... 10 is 50% (maximum)
  mapping(uint8 => uint256) public m_votingMultiplierMap;	//TODO: Do we want votes to be public knowledge?

  //Maximum stake time allowed
  uint256 internal constant m_nMaxStakingTime = 365 days * 5;	//years is deprecated because of leap years
}
