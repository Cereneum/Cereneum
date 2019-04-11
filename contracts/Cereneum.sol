pragma solidity ^0.5.2;

import "./CereneumImplementation.sol";

/// @author AshKetchumNakamoto09
/// @title A Trustless Interest-bearing Cryptographic Certificate of Interest on Ethereum
contract Cereneum is CereneumImplementation
{
	using SafeMath for uint256;

	constructor(
			bytes32 a_hBTCMerkleTreeRoot,
			bytes32 a_hBCHMerkleTreeRoot,
			bytes32 a_hBSVMerkleTreeRoot,
			bytes32 a_hETHMerkleTreeRoot,
			bytes32 a_hLTCMerkleTreeRoot,
	    		uint256 a_nMaxRedeemable,
	    		uint256 a_nUTXOCountAtSnapshot,
			address a_genesisAddress
  	)
	public
	{
		//Store the launch time of the contract
    		m_tContractLaunchTime = block.timestamp;
    		m_hMerkleTreeRootsArray[0] = a_hBTCMerkleTreeRoot;
		m_hMerkleTreeRootsArray[1] = a_hBCHMerkleTreeRoot;
		m_hMerkleTreeRootsArray[2] = a_hBSVMerkleTreeRoot;
		m_hMerkleTreeRootsArray[3] = a_hETHMerkleTreeRoot;
		m_hMerkleTreeRootsArray[4] = a_hLTCMerkleTreeRoot;
    		m_nMaxRedeemable = a_nMaxRedeemable;
		m_nAdjustedMaxRedeemable = a_nMaxRedeemable; //TODO
    		m_nUTXOCountAtSnapshot = a_nUTXOCountAtSnapshot;
		m_genesis = a_genesisAddress;

		//All ratios have an invisible 0.0 in front of them
		m_blockchainRatios[0] = 3402; //BCH
	  	m_blockchainRatios[1] = 1501; //BSV
	  	m_blockchainRatios[2] = 4131; //ETH
	  	m_blockchainRatios[3] = 1612; //LTC

    		//Mint all claimable coins to contract wallet
    		_mint(address(this), m_nMaxRedeemable);
	}

	//ERC20 Constants
  	string public constant name = "Cereneum";
  	string public constant symbol = "CER";
  	uint public constant decimals = 8;

	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	function testGetSpeedBonus(uint256 a_nAmount, uint256 a_nDays) public pure returns (uint256)
	{
		uint256 nMaxDays = 350;
		a_nAmount = a_nAmount.div(5);
		return a_nAmount.mul(nMaxDays.sub(a_nDays)).div(nMaxDays);
  	}

	function testGetLateClaimAdjustedAmount(uint256 a_nAmount, uint256 a_nDays) public pure returns (uint256) {
		uint256 nMaxDays = 350;
    		return a_nAmount.mul(nMaxDays.sub(a_nDays)).div(nMaxDays);
  	}

	function testAdjustContractLaunchTime(
    		uint256 a_days
  	) external
	{
		m_tContractLaunchTime = m_tContractLaunchTime.sub(a_days.mul(1 days)).sub(60);
		UpdateDailyData();
	}

	function testAdjustContractLaunchTimeHours(
    		uint256 a_hours
  	) external
	{
		m_tContractLaunchTime = m_tContractLaunchTime.sub(a_hours.mul(1 hours));
		UpdateDailyData();
	}

	function AdjustContractLaunchTime(
    		uint256 a_days
  	) external
	{
		m_tContractLaunchTime = m_tContractLaunchTime.sub(a_days.mul(1 days)).sub(60);
	}

	function testAdjustStakeFriendlyTime(
    		uint256 a_nStakeIndex,
		uint256 a_days,
		address a_address
  	) external
	{
		m_staked[a_address][a_nStakeIndex].tLockTime = m_staked[a_address][a_nStakeIndex].tLockTime.sub(a_days.mul(1 days)).sub(60);
		m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime = m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime.sub(a_days.mul(1 days)).sub(60);
		m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime = m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime.sub(a_days.mul(1 days)).sub(60);
		m_staked[a_address][a_nStakeIndex].tTimeRemovedFromGlobalPool = m_staked[a_address][a_nStakeIndex].tTimeRemovedFromGlobalPool.sub(a_days.mul(1 days)).sub(60);
		UpdateDailyData();
	}

	function testAdjustStakeTime(
    		uint256 a_nStakeIndex,
		uint256 a_days,
		address a_address
  	) external
	{
		m_staked[a_address][a_nStakeIndex].tLockTime = m_staked[a_address][a_nStakeIndex].tLockTime.sub(a_days.mul(1 days)).sub(60);
		m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime = m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime.sub(a_days.mul(1 days)).sub(60);
		m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime = m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime.sub(a_days.mul(1 days)).sub(60);
		UpdateDailyData();
	}

	function testAdjustStakeTimeHours(
    		uint256 a_nStakeIndex,
		uint256 a_hours,
		address a_address
  	) external
	{
		m_staked[a_address][a_nStakeIndex].tLockTime = m_staked[a_address][a_nStakeIndex].tLockTime.sub(a_hours.mul(1 hours));
		m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime = m_staked[a_address][a_nStakeIndex].tLastCompoundedUpdateTime.sub(a_hours.mul(1 hours));
		m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime = m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime.sub(a_hours.mul(1 hours));
		UpdateDailyData();
	}

	function testFakeClaim(
		uint256 a_nAmount,
		address a_address,
		BlockchainType a_nWhichChain
	) external
	{
		UpdateDailyData();

		require(m_nTotalRedeemed.add(a_nAmount) <= m_nMaxRedeemable);

		m_nTotalRedeemed = m_nTotalRedeemed.add(a_nAmount);

		(uint256 nRedeemed, uint256 nBonuses) = GetRedeemAmount(a_nAmount, a_nWhichChain);

		_transfer(address(this), a_address, nRedeemed);

		_mint(a_address, nBonuses);
		_mint(m_genesis, nBonuses);

		m_nRedeemedCount = m_nRedeemedCount.add(1);

		return;
	}

	function testEndStake(
		uint256 a_nStakeIndex,
		address a_address
	) external {
		ProcessStakeEnding(a_nStakeIndex, a_address, false);
	}

	function testEndStakeSafely(
		uint256 a_nStakeIndex,
		address a_address
	) external {
		require(block.timestamp > m_staked[a_address][a_nStakeIndex].tEndStakeCommitTime, "Stake must be matured.");

		ProcessStakeEnding(a_nStakeIndex, a_address, false);
	}

	function getStakeStructShares(
		address a_address
	) public view returns (uint256)
	{
		return m_staked[a_address][0].nSharesStaked;
	}

	function getStakeStructAmount(
		address a_address
	) public view returns (uint256)
	{
		return m_staked[a_address][0].nAmountStaked;
	}

	function getStakeStructEndTime(
		address a_address
	) public view returns (uint256)
	{
		return m_staked[a_address][0].tEndStakeCommitTime;
	}

	function getStakeStructLockTime(
		address a_address
	) public view returns (uint256)
	{
		return m_staked[a_address][0].tLockTime;
	}

	function getBlockTime(
	) public view returns (uint256)
	{
		return block.timestamp;
	}
}
