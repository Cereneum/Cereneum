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
    bytes32 a_hLTCMerkleTreeRoot
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

    //All ratios have an invisible 0.0 in front of them
    m_blockchainRatios[0] = 3402; //BCH
    m_blockchainRatios[1] = 1501; //BSV
    m_blockchainRatios[2] = 4131; //ETH
    m_blockchainRatios[3] = 1612; //LTC

    //Binance 1
    m_exchangeAirdropAddresses[0] = 0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE;
    m_exchangeAirdropAmounts[0] = 8339472538853;

    //Binance 2
    m_exchangeAirdropAddresses[1] = 0xD551234Ae421e3BCBA99A0Da6d736074f22192FF;
    m_exchangeAirdropAmounts[1] = 1479588273675;

    //Binance 3
    m_exchangeAirdropAddresses[2] = 0x564286362092D8e7936f0549571a803B203aAceD;
    m_exchangeAirdropAmounts[2] = 1113952670976;

    //Binance 4
    m_exchangeAirdropAddresses[3] = 0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF;
    m_exchangeAirdropAmounts[3] = 1452680420343;

    //Binance 5 has little ether in it

    //Binance 6
    m_exchangeAirdropAddresses[4] = 0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67;
    m_exchangeAirdropAmounts[4] = 235660201854981;

    //Bitfinex

    //Bittrex

    //KuCoin

    //LAToken

    //Mint all claimable coins to contract wallet
    _mint(address(this), m_nMaxRedeemable);
  }

  //ERC20 Constants
  string public constant name = "Cereneum";
  string public constant symbol = "CER";
  uint public constant decimals = 8;

	/// @dev A one time callable function to airdrop Ethereum chain CER tokens to some exchange wallets.
	function ExchangeEthereumAirdrops() public
	{
		require(m_bHasAirdroppedExchanges == false);
		m_bHasAirdroppedExchanges = true;

		UpdateDailyData();

		//The following Ethereum exchange addresses are removed from the claimable UTXO set and automatically airdropped
		//To encourage early exchange support.
		uint256 nGenesisBonuses = 0;
		uint256 nPublicReferralBonuses = 0;
		uint256 nTokensRedeemed = 0;
		uint256 nBonuses = 0;
		uint256 nPenalties = 0;

		for(uint256 i=0; i < 5; ++i)
		{
			(nTokensRedeemed, nBonuses, nPenalties) = GetRedeemAmount(m_exchangeAirdropAmounts[i], BlockchainType.Ethereum);

			//Transfer coins from contracts wallet to claim wallet
			_transfer(address(this), m_exchangeAirdropAddresses[i], nTokensRedeemed);

			//Mint speed bonus and 10% referral bonus to claiming address
			_mint(m_exchangeAirdropAddresses[i], nBonuses.add(nTokensRedeemed.div(10)));

			//Speed bonus and referral bonus matched for genesis address (20% for referral and 10% for claimer referral = 30%)
			nGenesisBonuses = nGenesisBonuses.add(nBonuses.add(nTokensRedeemed.mul(1000000000000).div(3333333333333)));

			//Grant 20% bonus of tokens to referrer
			nPublicReferralBonuses = nPublicReferralBonuses.add(nTokensRedeemed.div(5));

			m_nTotalRedeemed = m_nTotalRedeemed.add(m_exchangeAirdropAmounts[i]);
			m_nRedeemedCount = m_nRedeemedCount.add(1);
		}

		//Mint all of the referrer bonuses in a single call
		_mint(m_publicReferralAddress, nPublicReferralBonuses);

		//Mint all of the genesis bonuses in a single call
		_mint(m_genesis, nGenesisBonuses);
	}

	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	/*** TEST FUNCTIONS TO BE REMOVED BEFORE LAUNCHING ***/
	function testGetSpeedBonus(uint256 a_nAmount, uint256 a_nDays) public pure returns (uint256)
	{
		if(a_nDays < m_nClaimPhaseBufferDays)
		{
			a_nDays = 0;
		}
		else
		{
			//We give a two week buffer after contract launch before penalties
			a_nDays = a_nDays.sub(m_nClaimPhaseBufferDays);
		}

		uint256 nMaxDays = 350;
		a_nAmount = a_nAmount.div(5);
		return a_nAmount.mul(nMaxDays.sub(a_nDays)).div(nMaxDays);
  }

	function testGetLateClaimAdjustedAmount(uint256 a_nAmount, uint256 a_nDays) public pure returns (uint256)
	{
		return a_nAmount.sub(GetMonthlyLatePenalty(a_nAmount, a_nDays));
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

		(uint256 nRedeemed, uint256 nBonuses, uint256 nPenalties) = GetRedeemAmount(a_nAmount, a_nWhichChain);

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
