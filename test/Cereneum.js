const Cereneum = artifacts.require("Cereneum");

var g_n7DayStakeAmount = 0;
var ONE_YEAR_PAYOUT = 781980;
var ONE_YEAR_PAYOUT_TWO_CLAIMS = 782102;
var fBCHRatio = 0.03402;
var fBSVRatio = 0.01501;
var fETHRatio = 0.04131;
var fLTCRatio = 0.01612;

contract('Cereneum', (accounts) => {
  it('TestEthPoolMultipleStakes', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testAdjustContractLaunchTime(14);

      //console.log("balance: " + await cereneumInstance.balanceOf(accounts[0]));

      await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
      await cereneumInstance.StartEthStake({from:accounts[0], value:20000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:30000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:40000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:50000000000000000});

      await cereneumInstance.testAdjustContractLaunchTime(1);

      assert(5 == parseInt(await cereneumInstance.GetNumberOfEthPoolStakes(accounts[0]),10));

      await cereneumInstance.WithdrawFromEthPool(4);
      await cereneumInstance.WithdrawFromEthPool(3);
      await cereneumInstance.WithdrawFromEthPool(2);
      await cereneumInstance.WithdrawFromEthPool(1);
      await cereneumInstance.WithdrawFromEthPool(0);

      assert(0 == parseInt(await cereneumInstance.GetNumberOfEthPoolStakes(accounts[0]),10));

      //console.log("balance: " + await cereneumInstance.balanceOf(accounts[0]));

      await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
      await cereneumInstance.StartEthStake({from:accounts[0], value:20000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:30000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:40000000000000000});
      await cereneumInstance.StartEthStake({from:accounts[0], value:50000000000000000});

      await cereneumInstance.testAdjustContractLaunchTime(1);

      assert(5 == parseInt(await cereneumInstance.GetNumberOfEthPoolStakes(accounts[0]),10));

      await cereneumInstance.WithdrawFromEthPool(0);
      await cereneumInstance.WithdrawFromEthPool(0);
      await cereneumInstance.WithdrawFromEthPool(0);
      await cereneumInstance.WithdrawFromEthPool(0);
      await cereneumInstance.WithdrawFromEthPool(0);

      assert(0 == parseInt(await cereneumInstance.GetNumberOfEthPoolStakes(accounts[0]),10));

      //console.log("balance: " + await cereneumInstance.balanceOf(accounts[0]));
  });
  it('TestEthPool', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testFakeClaim(
            1,
            accounts[1],
            0
          );

    await cereneumInstance.AdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(1, 7, 1, {from:accounts[1]});

    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    //console.log("WithdrawFromEthPool gas: " + await cereneumInstance.WithdrawFromEthPool.estimateGas(0, {from:accounts[0]}));
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);
    await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
    await cereneumInstance.TransferContractETH(); //Remove ETH from contract to genesis address

    await cereneumInstance.AdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.WithdrawFromEthPool(0);

    //console.log("balance acct0: " + await cereneumInstance.balanceOf(accounts[0]));

    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

    //console.log("balance acct1: " + await cereneumInstance.balanceOf(accounts[1]));
  });
  it('TestExchangeAirdrop', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.ExchangeEthereumAirdrops();

      var ethRatio = await cereneumInstance.m_blockchainRatios(2);
      ethRatio = "0.0" + ethRatio;
      ethRatio = parseFloat(ethRatio);

      //Binance
      assert(parseInt(await cereneumInstance.balanceOf("0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE"),10) == Math.floor(parseInt(8339472538853, 10) * 1.30 * ethRatio), "Binance 1 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0xD551234Ae421e3BCBA99A0Da6d736074f22192FF"),10) == Math.floor(parseInt(1479588273675, 10) * 1.30 * ethRatio)-1, "Binance 2 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0x564286362092D8e7936f0549571a803B203aAceD"),10) == Math.floor(parseInt(1113952670976, 10) * 1.30 * ethRatio)-1, "Binance 3 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF"),10) == Math.floor(parseInt(1452680420343, 10) * 1.30 * ethRatio)-1, "Binance 4 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67"),10) == Math.floor(parseInt(235660201854981, 10) * 1.30 * ethRatio)-2, "Binance 6 balance incorrect");

      //Bittrex
      assert(parseInt(await cereneumInstance.balanceOf("0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98"),10) == Math.floor(parseInt(12123238705510, 10) * 1.30 * ethRatio)-2, "Bittrex 1 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0x66f820a414680B5bcda5eECA5dea238543F42054"),10) == Math.floor(parseInt(130000160894256, 10) * 1.30 * ethRatio)-1, "Bittrex 3 balance incorrect");

      //KuCoin
      assert(parseInt(await cereneumInstance.balanceOf("0x2B5634C42055806a59e9107ED44D43c426E58258"),10) == Math.floor(parseInt(620244132323, 10) * 1.30 * ethRatio)-1, "KuCoin 1 balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0x689C56AEf474Df92D44A1B70850f808488F9769C"),10) == Math.floor(parseInt(1170133827906, 10) * 1.30 * ethRatio)-1, "KuCoin 2 balance incorrect");

      //LAToken
      assert(parseInt(await cereneumInstance.balanceOf("0x7891b20c690605f4e370d6944c8a5dbfac5a451c"),10) == Math.floor(parseInt(1024359199440, 10) * 1.30 * ethRatio)-2, "LaToken 1 balance incorrect");

      //Huobi Global
      assert(parseInt(await cereneumInstance.balanceOf("0xDc76CD25977E0a5Ae17155770273aD58648900D3"),10) == Math.floor(parseInt(85086064196888, 10) * 1.30 * ethRatio)-1, "Huobi Global balance incorrect");

      //CoinBene
      assert(parseInt(await cereneumInstance.balanceOf("0x33683b94334eeBc9BD3EA85DDBDA4a86Fb461405"),10) == Math.floor(parseInt(317547644511, 10) * 1.30 * ethRatio)-2, "CoinBene balance incorrect");

      assert(parseInt(await cereneumInstance.balanceOf("0x8eAf4Fec503da352EB66Ef1E2f75C63e5bC635e1"), 10) == Math.floor(parseInt(8339472538853, 10) * .20 * ethRatio) +
        Math.floor(parseInt(1479588273675, 10) * .20 * ethRatio) +
        Math.floor(parseInt(1113952670976, 10) * .20 * ethRatio) +
        Math.floor(parseInt(1452680420343, 10) * .20 * ethRatio) +
        Math.floor(parseInt(235660201854981, 10) * .20 * ethRatio) +
        Math.floor(parseInt(12123238705510, 10) * .20 * ethRatio) +
        Math.floor(parseInt(130000160894256, 10) * .20 * ethRatio) +
        Math.floor(parseInt(620244132323, 10) * .20 * ethRatio) +
        Math.floor(parseInt(1170133827906, 10) * .20 * ethRatio) +
        Math.floor(parseInt(1024359199440, 10) * .20 * ethRatio) +
        Math.floor(parseInt(85086064196888, 10) * .20 * ethRatio) +
        Math.floor(parseInt(317547644511, 10) * .20 * ethRatio),
        "Referral balance incorrect");
      assert(parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10) == Math.floor(parseInt(8339472538853, 10) * .50 * ethRatio) +
      Math.floor(parseInt(1479588273675, 10) * .50 * ethRatio) +
      Math.floor(parseInt(1113952670976, 10) * .50 * ethRatio) +
      Math.floor(parseInt(1452680420343, 10) * .50 * ethRatio) +
      Math.floor(parseInt(235660201854981, 10) * .50 * ethRatio) +
      Math.floor(parseInt(12123238705510, 10) * .50 * ethRatio) +
      Math.floor(parseInt(130000160894256, 10) * .50 * ethRatio) +
      Math.floor(parseInt(620244132323, 10) * .50 * ethRatio) +
      Math.floor(parseInt(1170133827906, 10) * .50 * ethRatio) +
      Math.floor(parseInt(1024359199440, 10) * .50 * ethRatio) +
      Math.floor(parseInt(85086064196888, 10) * .50 * ethRatio) +
      Math.floor(parseInt(317547644511, 10) * .50 * ethRatio)-7,
      "Genesis balance incorrect");
  });
  it('TestSupply', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

    assert(await cereneumInstance.totalSupply() == 19853569666600000);
    assert(await cereneumInstance.GetCirculatingSupply() == 0);
  });
  it('TestRobinHoodBonus', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

      var nTotal = 0;
      var nBonus = 0;
      for(var i=14; i<43; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.0025/29), 10));
      }
      for(var i=43; i<72; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.005/29), 10));
      }
      for(var i=72; i<101; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.0075/29), 10));
      }
      for(var i=101; i<130; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.015/29), 10));
      }
      for(var i=130; i<159; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.03/29), 10));
      }
      for(var i=159; i<188; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.06/29), 10));
      }
      for(var i=188; i<217; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.08/29), 10));
      }
      for(var i=217; i<246; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.10/29), 10));
      }
      for(var i=246; i<275; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.125/29), 10));
      }
      for(var i=275; i<304; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.15/29), 10));
      }
      for(var i=304; i<334; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.175/30), 10));
      }
      for(var i=334; i<364; ++i)
      {
        nBonus = parseInt(await cereneumInstance.GetRobinHoodMonthlyAmount(10000000, i), 10);
        nTotal += nBonus;
        assert(nBonus == parseInt(10000000 * (0.25/30), 10));
      }
      assert(132 == (10000000 - nTotal), "Incorrect number of unclaimed coins remaining");
  });
  it('TestSpeedBonus', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

      assert(await cereneumInstance.testGetSpeedBonus(1000, 0) == 200);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 1) == 200);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 1*7) == 200);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 2*7) == 200);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 15) == 199);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 3*7) == 196);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 4*7) == 192);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 5*7) == 188);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 6*7) == 184);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 7*7) == 180);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 47*7) == 20);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 48*7) == 16);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 49*7) == 12);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 50*7) == 8);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 51*7) == 4);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 52*7) == 0);
  });
  it('TestLateClaimAmount', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 0) == 10000000); //2 week post launch buffer, no penalty
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 1)  == 10000000);  //2 week post launch buffer, no penalty
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 1*7) == 10000000); //2 week post launch buffer, no penalty
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 2*7) == 10000000); //2 week post launch buffer, no penalty
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 15) == (10000000 - parseInt(10000000 * (0.0025/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 16) == (10000000 - parseInt(10000000 * ((0.0025/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 17) == (10000000 - parseInt(10000000 * ((0.0025/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 18) == (10000000 - parseInt(10000000 * ((0.0025/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 19) == (10000000 - parseInt(10000000 * ((0.0025/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 20) == (10000000 - parseInt(10000000 * ((0.0025/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 21) == (10000000 - parseInt(10000000 * ((0.0025/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 22) == (10000000 - parseInt(10000000 * ((0.0025/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 23) == (10000000 - parseInt(10000000 * ((0.0025/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 24) == (10000000 - parseInt(10000000 * ((0.0025/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 25) == (10000000 - parseInt(10000000 * ((0.0025/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 26) == (10000000 - parseInt(10000000 * ((0.0025/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 27) == (10000000 - parseInt(10000000 * ((0.0025/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 28) == (10000000 - parseInt(10000000 * ((0.0025/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 29) == (10000000 - parseInt(10000000 * ((0.0025/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 30) == (10000000 - parseInt(10000000 * ((0.0025/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 31) == (10000000 - parseInt(10000000 * ((0.0025/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 32) == (10000000 - parseInt(10000000 * ((0.0025/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 33) == (10000000 - parseInt(10000000 * ((0.0025/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 34) == (10000000 - parseInt(10000000 * ((0.0025/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 35) == (10000000 - parseInt(10000000 * ((0.0025/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 36) == (10000000 - parseInt(10000000 * ((0.0025/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 37) == (10000000 - parseInt(10000000 * ((0.0025/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 38) == (10000000 - parseInt(10000000 * ((0.0025/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 39) == (10000000 - parseInt(10000000 * ((0.0025/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 40) == (10000000 - parseInt(10000000 * ((0.0025/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 41) == (10000000 - parseInt(10000000 * ((0.0025/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 42) == (10000000 - parseInt(10000000 * ((0.0025/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 43) == (10000000 - parseInt(10000000 * 0.0025, 10)));  //End of Month 1
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 44) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * (0.005/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 45) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 46) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 47) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 48) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 49) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 50) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 51) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 52) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 53) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 54) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 55) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 56) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 57) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 58) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 59) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 60) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 61) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 62) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 63) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 64) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 65) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 66) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 67) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 68) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 69) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 70) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 71) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * ((0.005/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 72) == (10000000 - parseInt(10000000 * 0.0025, 10) - parseInt(10000000 * 0.005, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 72) == (10000000 - parseInt(10000000 * 0.0075, 10)));  //End of Month 2
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 73) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * (0.0075/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 74) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 75) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 76) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 77) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 78) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 79) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 80) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 81) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 82) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 83) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 84) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 85) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 86) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 87) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 88) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 89) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 90) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 91) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 92) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 93) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 94) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 95) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 96) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 97) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 98) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 99) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 100) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * ((0.0075/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 101) == (10000000 - parseInt(10000000 * 0.0075, 10) - parseInt(10000000 * 0.0075, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 101) == (10000000 - parseInt(10000000 * 0.015, 10)));  //End of Month 3
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 102) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * (0.015/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 103) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 104) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 105) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 106) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 107) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 108) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 109) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 110) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 111) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 112) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 113) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 114) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 115) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 116) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 117) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 118) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 119) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 120) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 121) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 122) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 123) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 124) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 125) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 126) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 127) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 128) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 129) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * ((0.015/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 130) == (10000000 - parseInt(10000000 * 0.015, 10) - parseInt(10000000 * 0.015, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 130) == (10000000 - parseInt(10000000 * 0.03, 10))); //End of Month 4
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 131) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * (0.03/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 132) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 133) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 134) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 135) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 136) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 137) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 138) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 139) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 140) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 141) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 142) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 143) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 144) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 145) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 146) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 147) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 148) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 149) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 150) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 151) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 152) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 153) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 154) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 155) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 156) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 157) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 158) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * ((0.03/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 159) == (10000000 - parseInt(10000000 * 0.03, 10) - parseInt(10000000 * 0.03, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 159) == (10000000 - parseInt(10000000 * 0.06, 10))); //End of Month 5
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 160) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * (0.06/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 161) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 162) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 163) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 164) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 165) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 166) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 167) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 168) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 169) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 170) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 171) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 172) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 173) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 174) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 175) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 176) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 177) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 178) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 179) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 180) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 181) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 182) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 183) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 184) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 185) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 186) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 187) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * ((0.06/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 188) == (10000000 - parseInt(10000000 * 0.06, 10) - parseInt(10000000 * 0.06, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 188) == (10000000 - parseInt(10000000 * 0.12, 10))); //End of Month 6
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 189) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * (0.08/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 190) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 191) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 192) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 193) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 194) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 195) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 196) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 197) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 198) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 199) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 200) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 201) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 202) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 203) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 204) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 205) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 206) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 207) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 208) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 209) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 210) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 211) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 212) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 213) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 214) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 215) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 216) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * ((0.08/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 217) == (10000000 - parseInt(10000000 * 0.12, 10) - parseInt(10000000 * 0.08, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 217) == (10000000 - parseInt(10000000 * 0.20, 10))); //End of Month 7
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 218) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * (0.10/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 219) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 220) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 221) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 222) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 223) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 224) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 225) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 226) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 227) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 228) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 229) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 230) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 231) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 232) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 233) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 234) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 235) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 236) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 237) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 238) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 239) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 240) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 241) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 242) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 243) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 244) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 245) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * ((0.10/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 246) == (10000000 - parseInt(10000000 * 0.20, 10) - parseInt(10000000 * 0.10, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 246) == (10000000 - parseInt(10000000 * 0.30, 10))); //End of Month 8
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 247) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * (0.125/29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 248) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 249) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 250) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 251) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 252) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 253) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 254) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 255) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 256) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 257) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 258) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 259) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 260) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 261) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 262) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 263) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 264) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 265) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 266) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 267) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 268) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 269) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 270) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 271) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 272) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 273) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 274) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * ((0.125/29)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 275) == (10000000 - parseInt(10000000 * 0.30, 10) - parseInt(10000000 * 0.125, 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 275) == (10000000 - parseInt(10000000 * 0.425, 10)));  //End of Month 9
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 276) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * (0.15/29), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 277) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*2), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 278) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*3), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 279) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*4), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 280) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*5), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 281) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*6), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 282) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*7), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 283) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*8), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 284) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*9), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 285) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*10), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 286) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*11), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 287) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*12), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 288) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*13), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 289) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*14), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 290) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*15), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 291) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*16), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 292) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*17), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 293) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*18), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 294) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*19), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 295) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*20), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 296) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*21), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 297) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*22), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 298) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*23), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 299) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*24), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 300) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*25), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 301) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*26), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 302) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*27), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 303) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * ((0.15/29)*28), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 304) == (10000000 - parseInt(10000000 * 0.425, 10) - parseInt(10000000 * 0.15, 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 304) == (10000000 - parseInt(10000000 * 0.575, 10))+1);  //End of Month 10
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 305) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * (0.175/30), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 306) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 307) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 308) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 309) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 310) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 311) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 312) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 313) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 314) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 315) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 316) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 317) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 318) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 319) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*15), 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 320) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 321) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 322) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 323) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 324) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 325) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 326) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 327) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 328) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 329) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 330) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 331) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 332) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 333) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * ((0.175/30)*29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 334) == (10000000 - parseInt(10000000 * 0.575, 10) - parseInt(10000000 * 0.175, 10))+1);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 334) == (10000000 - parseInt(10000000 * 0.75, 10))+1); //End of Month 11
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 335) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * (0.25/30), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 336) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*2), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 337) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*3), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 338) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*4), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 339) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*5), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 340) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*6), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 341) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*7), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 342) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*8), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 343) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*9), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 344) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*10), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 345) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*11), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 346) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*12), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 347) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*13), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 348) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*14), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 349) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*15), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 350) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*16), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 351) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*17), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 352) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*18), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 353) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*19), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 354) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*20), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 355) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*21), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 356) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*22), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 357) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*23), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 358) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*24), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 359) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*25), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 360) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*26), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 361) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*27), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 362) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*28), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 363) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * ((0.25/30)*29), 10)));
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 364) == (10000000 - parseInt(10000000 * 0.75, 10) - parseInt(10000000 * 0.25, 10))); //End of Month 12
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 365) == 0);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 366) == 0);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(10000000, 500) == 0);
  });
  it('TestAddresses', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

    assert(await cereneumInstance.PublicKeyToBitcoinAddress(
      "0xfc783c8f9058a315009054745c5e3277aa5f3c073da2c659a2071d88016e7460",
      "0xb5bf2e313f233be974a0c015d6bb0622bc1e5a5a21d39e2026120afebc923bcb",
      1
    )
    == "0x91cf21daa7b0393bce87326a38b165da5ca983c8");

    assert(await cereneumInstance.PublicKeyToEthereumAddress(
      "0xfc783c8f9058a315009054745c5e3277aa5f3c073da2c659a2071d88016e7460",
      "0xb5bf2e313f233be974a0c015d6bb0622bc1e5a5a21d39e2026120afebc923bcb"
    ))
    == "0x279093BB8438F293E8744261afA2e127a211c144";
  });
  //BTC addresses starting with "1"
  it('TestBTC-Legacy-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0xfc783c8f9058a315009054745c5e3277aa5f3c073da2c659a2071d88016e7460",
      "0xb5bf2e313f233be974a0c015d6bb0622bc1e5a5a21d39e2026120afebc923bcb",
      27,
      "0x6e67e1243a218d9f0a407907bc19f6fa560a6ed3a62ae57be553584de400d84d",
      "0x08eea74645acbf37cc5256d0d21e4250c118297975f375b2e018ef57772d9979",
      0), "ECDSAVerify Didn't match");
  });
  //BTC addresses starting with "1"
  it('TestBTC-Legacy-VerifyProof-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

    var proofs = ["0xfb2dd6de126f3934504a6a80014f54ac1e890bf3d38a2f44efb69940483b0165",
                  "0xe1f11ab56e34fa6b8c6927b171913e3535ce4eb77a1abe4e3efe222abdea7832",
                  "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0xd92f680142bac3a27c998517be3669e0db436e9dec5a9803d7ade9857885a894",
          0
    ));
  });
  //BTC addresses starting with "1"
  it('TestBTC-Legacy-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xa3ce697bffc616361177ced6ae8c54e129f06f03a4ecbef247f74f256956db1c",
      "0x13a87bd8059e2fc8a1bd484a22c47d378203c31bef9154f232c02691ca7088d2",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbcadc800860b8ed310fff0a6975cf06a0773afe9383a20baefe66accf1189f39");

    var proofs = ["0xfb2dd6de126f3934504a6a80014f54ac1e890bf3d38a2f44efb69940483b0165",
                  "0xe1f11ab56e34fa6b8c6927b171913e3535ce4eb77a1abe4e3efe222abdea7832",
                  "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0xfc783c8f9058a315009054745c5e3277aa5f3c073da2c659a2071d88016e7460",
          "0xb5bf2e313f233be974a0c015d6bb0622bc1e5a5a21d39e2026120afebc923bcb",
          1,
          27,
          "0x6e67e1243a218d9f0a407907bc19f6fa560a6ed3a62ae57be553584de400d84d",
          "0x08eea74645acbf37cc5256d0d21e4250c118297975f375b2e018ef57772d9979",
          0,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16), "Claim amount incorrect");
          assert(Math.floor(73349) == parseInt(logs[i].args[1], 16), "Claim amount incorrect");  //day 1 redeem gets 20% bonus
          assert(Math.floor(73349 * .20) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(73349 * .20)); //genesis addres should have the 20% bonus
  });
  it('TestBCH-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
      "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
      28,
      "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
      "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
      1), "ECDSAVerify Didn't match");
  });
  it('TestBCH-VerifyProof-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                  "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                  "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0x798c5d85a7e977cd1731158690af6b47750f660e5e88b72147a7c5979b6ad71b",
          1
    ));
  });
  it('TestBCH-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                  "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                  "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
          "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
          1,
          28,
          "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
          "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
          1,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(73349 * 0.03402) == parseInt(logs[i].args[1], 16), "Incorrect claim amount");  //day 1 redeem gets 20% bonus
          assert(Math.floor(73349 * .20 * 0.03402) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fBCHRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(73349 * .20 * fBCHRatio)); //genesis addres should have the 20% bonus
  });
  it('TestBSV-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x82cc099ea7d36976be370a8e7e5c70d91539a91fbf1280110b11184b6cdb00d1",
      "0x80cd331f33fad8b87a8127b7c36fd803fbe0cb6afc609db38716664f4442f122",
      27,
      "0x712e227a0e5b779adaadaae35f684c799beb6bb68388264c8c716bdb4df8a8a9",
      "0x7f9004d99013ce9629ed1dc7c033469dcabde82b01543d3fb27c83949d03f807",
      2), "ECDSAVerify Didn't match");
  });
  it('TestBSV-VerifyProof-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0xfb2dd6de126f3934504a6a80014f54ac1e890bf3d38a2f44efb69940483b0165",
                  "0xe1f11ab56e34fa6b8c6927b171913e3535ce4eb77a1abe4e3efe222abdea7832",
                  "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0xf79a30927fe9aa4d8e8044518b0f0ac23d1ce5d76f62f892266d66ce28cf4e4d",
          2
    ));
  });
  it('TestBSV-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0xfb2dd6de126f3934504a6a80014f54ac1e890bf3d38a2f44efb69940483b0165",
                    "0xe1f11ab56e34fa6b8c6927b171913e3535ce4eb77a1abe4e3efe222abdea7832",
                    "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x82cc099ea7d36976be370a8e7e5c70d91539a91fbf1280110b11184b6cdb00d1",
          "0x80cd331f33fad8b87a8127b7c36fd803fbe0cb6afc609db38716664f4442f122",
          1,
          27,
          "0x712e227a0e5b779adaadaae35f684c799beb6bb68388264c8c716bdb4df8a8a9",
          "0x7f9004d99013ce9629ed1dc7c033469dcabde82b01543d3fb27c83949d03f807",
          2,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          var nAdjustedClaim = parseInt(Math.floor(73349 * fBSVRatio), 10);
          var nAdjustedBonus = parseInt(Math.floor(73349 * .20 * fBSVRatio), 10);
          assert(nAdjustedClaim == parseInt(logs[i].args[1], 16), "Incorrect claim amount");
          assert(nAdjustedBonus == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == nAdjustedClaim + nAdjustedBonus, "claim wallet incorrect"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == nAdjustedBonus, "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  it('TestETH-ECDSAVerify-MyEtherWallet', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x5b7df82a35d5a27bd3b6b6a2f468f22b3d7b6f3ad1646f69b11a7b71d8808d58",
      "0x7856c1e8891840ae3b694f6099b446785eb9dbd992858981c4464acdc938c3e4",
      28,
      "0xbae5693306c2429fed32bea34af21d16ef12f6e4189aaf7d7774c20eebab2073",
      "0x7056d7bc2e09e511b093d0d06adee06378f3ebafe3b30edca2f296505740f497",
      3), "ECDSAVerify Didn't match");
  });
  it('TestETH-VerifyProof-MyEtherWallet', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0x9198877c9050ea6e33bd3b21cfb2646622184c117b4c7814fa9ee6b63709f50f",
                  "0x72bf656e600a75d632a8c034f1326ac24998e2c35004c146dc2e248ad4e8e9a3",
                  "0xf541170cc162c95ca64fd876dcaded875d06a12f8edaba0799a6f682909f82a5"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0x8ff0ec8e94147fcd37e3ae23c6693f85963cfe1384fbbca8a8df569fedf8b587",
          3
    ));
  });
  it('TestETH-Claim-MyEtherWallet', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x9198877c9050ea6e33bd3b21cfb2646622184c117b4c7814fa9ee6b63709f50f",
                    "0x72bf656e600a75d632a8c034f1326ac24998e2c35004c146dc2e248ad4e8e9a3",
                    "0xf541170cc162c95ca64fd876dcaded875d06a12f8edaba0799a6f682909f82a5"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x5b7df82a35d5a27bd3b6b6a2f468f22b3d7b6f3ad1646f69b11a7b71d8808d58",
          "0x7856c1e8891840ae3b694f6099b446785eb9dbd992858981c4464acdc938c3e4",
          0,
          28,
          "0xbae5693306c2429fed32bea34af21d16ef12f6e4189aaf7d7774c20eebab2073",
          "0x7056d7bc2e09e511b093d0d06adee06378f3ebafe3b30edca2f296505740f497",
          3,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          var nAdjustedClaim = parseInt(Math.floor(73349 * fETHRatio), 10);
          var nAdjustedBonus = parseInt(Math.floor(73349 * .20 * fETHRatio), 10);
          assert(nAdjustedClaim == parseInt(logs[i].args[1], 16), "Incorrect claim amount");
          assert(nAdjustedBonus == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == nAdjustedClaim + nAdjustedBonus, "claim wallet incorrect"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == nAdjustedBonus, "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  //LTC addresses starting with "L"
  it('TestLTC-Legacy-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x5d246bca8303fcfda5e7e97acfd936fd322bfccde4d426f24e9ea724caad44a4",
      "0x98b24d98080e57f5e478fac08dafbbb7a9767eade1c2be5ce2ecb2d0742100ad",
      28,
      "0x2f316e1280923a89189bd7738bfbc605973f304f001235bbc5544af9e5ac333e",
      "0x76449c6759e1902d0fc4ffaa80f5de90611a04d8c8958059e5d589275477526d",
      4), "ECDSAVerify Didn't match");
  });
  //LTC addresses starting with "L"
  it('TestLTC-Legacy-VerifyProof-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x033fee5f2911cc0a378281f1cfaff4b69bee437a22ceb3551f1ca977f72fbdca");

    var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                  "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                  "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0x33e2e04da03f0bc26046883716880d094ca8bb36decce44eae6924487a7c5e99",
          4
    ));
  });
  //LTC addresses starting with "L"
  it('TestLTC-Legacy-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x033fee5f2911cc0a378281f1cfaff4b69bee437a22ceb3551f1ca977f72fbdca");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x5d246bca8303fcfda5e7e97acfd936fd322bfccde4d426f24e9ea724caad44a4",
          "0x98b24d98080e57f5e478fac08dafbbb7a9767eade1c2be5ce2ecb2d0742100ad",
          1,
          28,
          "0x2f316e1280923a89189bd7738bfbc605973f304f001235bbc5544af9e5ac333e",
          "0x76449c6759e1902d0fc4ffaa80f5de90611a04d8c8958059e5d589275477526d",
          4,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(73349 * fLTCRatio) == parseInt(logs[i].args[1], 16), "Incorrect claim amount");
          assert(Math.floor(73349 * .20 * fLTCRatio) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fLTCRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(73349 * .20 * fLTCRatio)); //genesis addres should have the 20% bonus
  });
  //BTC addresses starting with "3"
  it('TestBTC-Segwit-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0xf8d6e9c2399affeeb83f5f0b1a0745601ea048ed31a2d850d8356d2034322921",
      "0x5fd0dafd0bbfa86ca3b3588c1e6d45235f3e00441d7c0e10cc9c349490afeb28",
      28,
      "0x0b96f7b87a1bc46bf0af398999afc42ead49fc1299739e98bad7bb65af8b746e",
      "0x52416fa6bb19526c789b0304da70252e0562c8d33cb47707c15a5790a7cb07eb",
      0), "ECDSAVerify Didn't match");
  });
  //BTC addresses starting with "3"
  it('TestBTC-Segwit-VerifyProof-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0xb3e3d35d09bab284508c48dda3c488ae37c05d6cdc2d3cb17d69bce934679654",
                  "0xf9ad4646539ed34d7fc114c35364fcfe1f88299611312884ed4c588b4124e575",
                  "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0xcc63cac146904b9c7d3fd1512d613663f5a4f9798b95b3744d741e51ff21aec3",
          0
    ));
  });
  //BTC addresses starting with "3"
  it('TestBTC-Segwit-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0xb3e3d35d09bab284508c48dda3c488ae37c05d6cdc2d3cb17d69bce934679654",
                  "0xf9ad4646539ed34d7fc114c35364fcfe1f88299611312884ed4c588b4124e575",
                  "0x54d7038561dbb6c31c7dbe7006b09c5fe41878e8b2a32244d29fa29f5daaa442"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0xf8d6e9c2399affeeb83f5f0b1a0745601ea048ed31a2d850d8356d2034322921",
          "0x5fd0dafd0bbfa86ca3b3588c1e6d45235f3e00441d7c0e10cc9c349490afeb28",
          3,
          28,
          "0x0b96f7b87a1bc46bf0af398999afc42ead49fc1299739e98bad7bb65af8b746e",
          "0x52416fa6bb19526c789b0304da70252e0562c8d33cb47707c15a5790a7cb07eb",
          0,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(73349) == parseInt(logs[i].args[1], 16), "Claim amount incorrect");
          assert(Math.floor(73349 * .20) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(73349 * .20)); //genesis addres should have the 20% bonus
  });
  //LTC addresses starting with "M"
  it('TestLTC-Segwit-ECDSAVerify-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012");

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x33492b053fd14400203ad2b9ff4d94f0317624423c3a3195177454ffc4a2400e",
      "0x4e17cae5f8e0c341a14b3d2308380e41f9c57fa0db559ec96cd203be72887158",
      28,
      "0x770f1c5ceb2eb49bd2e7a164a2c0baaf78bfc5046d48cee6768e72961c9911f3",
      "0x463758f21a5cebc5cd7a4355273e88cb2ff8b10961c2012596fa24176304d748",
      4), "ECDSAVerify Didn't match");
  });
  //LTC addresses starting with "M"
  it('TestLTC-Segwit-VerifyProof-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012");

    var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                  "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                  "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    assert(await cereneumInstance.VerifyProof(
          proofs,
          "0x4e32841a3fafdfe8cd472d6bc72c0556120320ae0d7073d145b641dfd74fd7c7",
          4
    ));
  });
  //LTC addresses starting with "M"
  it('TestLTC-Segwit-Claim-Coinomi', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

    var receiptObject = await cereneumInstance.Claim(
          73349,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x33492b053fd14400203ad2b9ff4d94f0317624423c3a3195177454ffc4a2400e",
          "0x4e17cae5f8e0c341a14b3d2308380e41f9c57fa0db559ec96cd203be72887158",
          3,
          28,
          "0x770f1c5ceb2eb49bd2e7a164a2c0baaf78bfc5046d48cee6768e72961c9911f3",
          "0x463758f21a5cebc5cd7a4355273e88cb2ff8b10961c2012596fa24176304d748",
          4,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(73349 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(73349 * fLTCRatio) == parseInt(logs[i].args[1], 16), "Incorrect claim amount");
          assert(Math.floor(73349 * .20 * fLTCRatio) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fLTCRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(73349 * .20 * fLTCRatio)); //genesis addres should have the 20% bonus
  });
  //LTC addresses starting with "3" from Trezor
  it('TestLTC-Legacy-Claim-Trezor', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x822abb98d787964d17e124774efdd64f8687a0cfc43c8610094db621070066c7");

    var proofs = ["0x7c89acccf291b79553defb97295468be18a53bc32eacf6fb5ff7ec21cfa0be1c",
                  "0xefeb2e7e1700278b0fa341912ac69cbdf61cee54c5315c429eb3ae58d82ab828",
                  "0x8d8c83f50a89b246840c8b5985f051b3a35b600ba40c2f9639824785411ca3e7",
                  "0x82161d7be9d9b7c9c9c8217108f73396a152009758ea110b7257617b6f508163",
                  "0xe77ce197a5caa268bf5ef6c1d13bc628a27db6f77e6cae9e2b9a5d5fd25a56df",
                  "0xd70280c4dec7facf71be3286061cbbfe8abfa959e8a48361ad48fbfb6127bbcf",
                  "0x581c605af07adfbe940230ebff22dfb72661613f095110b4762b7c783ebe6ce1",
                  "0xbf4c12089d5974d24f9be5133d62236d47bb58a85cbabfbe1f23e8178e029f13",
                  "0x5a5f10cc6be230eb9a448be14ce073330b6d8ab4c6d8f0c93841d4060626828a",
                  "0x7911200bdb70e0b654e9d3dc856bb4961d10364396396b40968f0d0c5bbdfee2",
                  "0x38855939f06c67c82edfe19a33df896267237f8c5ebb7973ee9096d364e55f01",
                  "0x11315ce9198c127954d2ca09e125779b72fa69a4648dc59a5d445e081deae0b0",
                  "0x4d9ea58ac1eef35adcc81cd930c8ed4f105e5f4975cf4f4033dc551981078d7f",
                  "0xa08640601c3a2e0a38cccadb44f14c2c25bfd070b626bc0235e3e0f262dfbe0b",
                  "0x1aee3035efb312bc8dc2d1bba38126c515fec395dfedd7292fdb9d07e06e1071",
                  "0x0b89dfa90da53d9304c130779cef3e17756f800e0d184da4c6dc6fb54724168b",
                  "0xce9e1e9053e9cad1a41067029626657fb044f40fd3afc0aa602503f052216acf",
                  "0x4110936533b97dd83eafdb92f497c71b18f7796f2b5d58cd62a25ad482ade034",
                  "0x28789ec03bdc9ada96efa53887f43e8e9e1376d25b2e9a7e26e6330b8a6b68d3",
                  "0xa85e004ed78bd215c0fe21c6951d0b3fba88ab9db14d1fd35f395e817fc8203d",
                  "0x71ceb64f80f7c90def39c81f72b233ffec9bd5573d06dc2eab0115710e2ead57",
                  "0xd999464159fbfad916b31ba5e611f6bc1dbd08b7e4eac6954a186353e9f5d7fa"];

    var receiptObject = await cereneumInstance.Claim(
          23000000,
          proofs,
          "0x1d872da283456ede56d7b1f9f6aaf0b548e2cfe3",
          "0x11beafef296b88fc71e973e32c1c158facf9cb23f3eeb37ca246ecf0ab633766",
          "0xe2afc43aa4f70aea6decf95ffa4ef963011894cbaaa947ab5b3411c3d88c413b",
          3,
          27,
          "0x6db1973457a550dc8270d0d0369263e9b475795389d043f162f9993aa16e7d57",
          "0x12eff7f453425b0c6c45a65e8e92502a8511a9dc1cfae84172bd89d86077c314",
          4,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(23000000 == parseInt(logs[i].args[0], 16), "Claim amount incorrect");
          assert(Math.floor(23000000 * fLTCRatio) == parseInt(logs[i].args[1], 16), "Adjusted Claim amount incorrect");  //day 1 redeem gets 20% bonus
          assert(Math.floor(23000000 * fLTCRatio * .20) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    assert(await cereneumInstance.balanceOf("0x1d872da283456ede56d7b1f9f6aaf0b548e2cfe3") == Math.floor(23000000 * fLTCRatio) + Math.floor(23000000 * fLTCRatio * .20));
  });
  it('TestBCH-Claim-Coinomi-UnbalancedMerkleTree', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbe9909750e11e059dc8822f1756d46b1ed7bf1a8f5cb2d8186a32fd2f7d30733",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

    var proofs = ["0x2760072c5d62000d55d9c058d7d4ef65769d416e2eaf3c1b57c10c0f9fb4e70a"];

    var receiptObject = await cereneumInstance.Claim(
          150000000000004,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
          "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
          1,
          28,
          "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
          "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
          1,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(150000000000004 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(150000000000004 * 0.03402) == parseInt(logs[i].args[1], 16), "Incorrect claim amount");  //day 1 redeem gets 20% bonus
          assert(Math.floor(150000000000004 * .20 * 0.03402) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(150000000000004 * 1.20 * fBCHRatio), "Incorrect balance"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == Math.floor(150000000000004 * .20 * fBCHRatio), "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  it('TestEarlyAndLateUnstakeContractBalance', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012");

    var nSatoshiAmountAtLaunch = await cereneumInstance.balanceOf(cereneumInstance.address);

    var nClaimAmount = 1000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    await cereneumInstance.AdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(1200, 350, 1, {from: accounts[1]});

    await cereneumInstance.AdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.AdjustContractLaunchTime(25);
    await cereneumInstance.testAdjustStakeTime(0, 25, accounts[1]);
    await cereneumInstance.AdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 175, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(10);
    await cereneumInstance.testAdjustStakeTime(0, 10, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 10, accounts[2]);

    await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
    await cereneumInstance.EndStakeEarly(0, {from: accounts[2]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 165, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(20);
    await cereneumInstance.testAdjustStakeTime(0, 20, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 20, accounts[2]);

    await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
    await cereneumInstance.EndStakeEarly(0, {from: accounts[2]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 145, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(30);
    await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);

    await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
    await cereneumInstance.EndStakeEarly(0, {from: accounts[2]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 115, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(40);
    await cereneumInstance.testAdjustStakeTime(0, 40, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 40, accounts[2]);

    await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
    await cereneumInstance.EndStakeEarly(0, {from: accounts[2]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 75, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(60);
    await cereneumInstance.testAdjustStakeTime(0, 60, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 60, accounts[2]);

    await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
    await cereneumInstance.EndStakeEarly(0, {from: accounts[2]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 15, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(await cereneumInstance.DaysSinceLaunch() == 364, "Days since launch incorrect")

    //Contract balance should only have rounding error amount
    assert(await cereneumInstance.balanceOf(cereneumInstance.address) < 3000, "Contract balance incorrect");

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]), 10) > parseInt(await cereneumInstance.balanceOf(accounts[2]), 10), "Account2 less than Account1");

    var nExpectedTotal = parseInt(nSatoshiAmountAtLaunch,10);
    //400 from speed bonus, another 400 matched to genesis
    nExpectedTotal += 800;
    nExpectedTotal += Math.floor(nExpectedTotal * 0.0491);
    var nTotal = parseInt(await cereneumInstance.balanceOf(accounts[1]),10);
    nTotal += parseInt(await cereneumInstance.balanceOf(accounts[2]),10);
    nTotal += parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"),10);

    assert(nExpectedTotal < nTotal, "Expected total incorrect");

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 75, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 75, 1, {from: accounts[2]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 60, 1, {from: accounts[1]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 45, 1, {from: accounts[1]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 30, 1, {from: accounts[1]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 15, 1, {from: accounts[1]});

    await cereneumInstance.AdjustContractLaunchTime(15);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);

    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    //Contract balance should only have rounding error amount
    assert(await cereneumInstance.balanceOf(cereneumInstance.address) < 3000, "Ending contract balance incorrect");
  });
  it('TestLargeMerkleTree', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x33a1481afb5e7ed982ee4ed34fd7c9a142a58804b4c4e1f1246a5501bba36518");

      var proofs = ["0x4f84d4136b44a2fca31c5e450aad824a803742b1d6d76f8cadceab5ee2db6264",
                    "0x2d477a34f1b8f925996124b157b3a9a138a40c9c33e8073c2182d07dcf40004b",
                    "0xe3b224622797ef3d9781081b4995286d6fadec282fb0742dd1394c1b1991ebc2",
                    "0xe80d9b818149beb6f4b7bee54dc135e13e6424a30364328b82bfffeb5a9b5f41",
                    "0x8cab57ad9b71561808b5b62af6ba9e7715205a938c762d902f58361fc94ca46d",
                    "0xc205d755214f574f0aa610cce075c4d10dcfa5c5410f3febabc6b025f95942b4",
                    "0xd5e9b592206b29947d56393ef2d859be1ab616800db4a44d5f71f4c552c1e1fa",
                    "0x88c93d6ff22a49c3193af064f9a876b3b71e6c28d779b7a5dcb786f71fcff974",
                    "0x30b6fdddd528c2be9d898c89a65b9fc32c0c6fa005c0f523c1fa07ac8e8ccf00",
                    "0x0f666868b12f0e99ba56aa17169d6b2bc8561b4e40099255fde31779ab422d15",
                    "0xfae2c8db970c8dada53ecbd802a8ac41f602d2230939468f0e66979faab3def3",
                    "0x3502dd000475c35de45cb1a7f4727c3e88c41c7dca0dd8d8d06b97ea03a80250",
                    "0x3856a6f7952497e9c4be1c96a11e92ec1283e42797a1ba75f1b369a1d004ed09",
                    "0xf072dfd5d42727734442a3788fdc78ada9909f86e38f17318ada52a542f5ded2",
                    "0x62b6ace31d31a63f6e109a854fc523ecd71899a92a34095fb3d13e55efd8ff2a",
                    "0x0990b5f19e979e5c1e1f86c5a77edbe427b2ee9a6244e26a20ec367a56513486",
                    "0x06e3d59566718e7229e259a1ffccaf831083398e9ba70920f7e761a1657d9b92",
                    "0xe7e178bffffd40e7808b6fbf4c4a308f84307a1d4a4513208ef13971daf249b4",
                    "0xa7e653744e6bbbd5fec1f25506a79686e619d0e442a16b8b49c5b94a7ff0119e",
                    "0x950c4ada7fbc1c666a108107ad2cce6f56887bc76272b73c308719f866d1ee05",
                    "0x5b13d34d88c50cbd9e2768d1b5145d39e99c9bb056bd2948a72c787416d312a2",
                    "0xb380b61545593e3f58a3f70a776c0d35d6bd0db1d04433586f7d8bf4f4235a17"];

    var receiptObject = await cereneumInstance.Claim(
          3000000,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x5d246bca8303fcfda5e7e97acfd936fd322bfccde4d426f24e9ea724caad44a4",
          "0x98b24d98080e57f5e478fac08dafbbb7a9767eade1c2be5ce2ecb2d0742100ad",
          1,
          28,
          "0x2f316e1280923a89189bd7738bfbc605973f304f001235bbc5544af9e5ac333e",
          "0x76449c6759e1902d0fc4ffaa80f5de90611a04d8c8958059e5d589275477526d",
          4,
          "0x0000000000000000000000000000000000000000"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(3000000 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(3000000 * fLTCRatio) == parseInt(logs[i].args[1], 16), "incorrect claim amount");
          assert(Math.floor(3000000 * .20 * fLTCRatio) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(false == logs[i].args[4], "referrer incorrect");
      }
    }

    var nGensisBalance = parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);
    assert(await cereneumInstance.GetCirculatingSupply() == nGensisBalance + nAccountBalance);
  });
  it('TestReferralBonus', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x33a1481afb5e7ed982ee4ed34fd7c9a142a58804b4c4e1f1246a5501bba36518");

      var proofs = ["0x4f84d4136b44a2fca31c5e450aad824a803742b1d6d76f8cadceab5ee2db6264",
                    "0x2d477a34f1b8f925996124b157b3a9a138a40c9c33e8073c2182d07dcf40004b",
                    "0xe3b224622797ef3d9781081b4995286d6fadec282fb0742dd1394c1b1991ebc2",
                    "0xe80d9b818149beb6f4b7bee54dc135e13e6424a30364328b82bfffeb5a9b5f41",
                    "0x8cab57ad9b71561808b5b62af6ba9e7715205a938c762d902f58361fc94ca46d",
                    "0xc205d755214f574f0aa610cce075c4d10dcfa5c5410f3febabc6b025f95942b4",
                    "0xd5e9b592206b29947d56393ef2d859be1ab616800db4a44d5f71f4c552c1e1fa",
                    "0x88c93d6ff22a49c3193af064f9a876b3b71e6c28d779b7a5dcb786f71fcff974",
                    "0x30b6fdddd528c2be9d898c89a65b9fc32c0c6fa005c0f523c1fa07ac8e8ccf00",
                    "0x0f666868b12f0e99ba56aa17169d6b2bc8561b4e40099255fde31779ab422d15",
                    "0xfae2c8db970c8dada53ecbd802a8ac41f602d2230939468f0e66979faab3def3",
                    "0x3502dd000475c35de45cb1a7f4727c3e88c41c7dca0dd8d8d06b97ea03a80250",
                    "0x3856a6f7952497e9c4be1c96a11e92ec1283e42797a1ba75f1b369a1d004ed09",
                    "0xf072dfd5d42727734442a3788fdc78ada9909f86e38f17318ada52a542f5ded2",
                    "0x62b6ace31d31a63f6e109a854fc523ecd71899a92a34095fb3d13e55efd8ff2a",
                    "0x0990b5f19e979e5c1e1f86c5a77edbe427b2ee9a6244e26a20ec367a56513486",
                    "0x06e3d59566718e7229e259a1ffccaf831083398e9ba70920f7e761a1657d9b92",
                    "0xe7e178bffffd40e7808b6fbf4c4a308f84307a1d4a4513208ef13971daf249b4",
                    "0xa7e653744e6bbbd5fec1f25506a79686e619d0e442a16b8b49c5b94a7ff0119e",
                    "0x950c4ada7fbc1c666a108107ad2cce6f56887bc76272b73c308719f866d1ee05",
                    "0x5b13d34d88c50cbd9e2768d1b5145d39e99c9bb056bd2948a72c787416d312a2",
                    "0xb380b61545593e3f58a3f70a776c0d35d6bd0db1d04433586f7d8bf4f4235a17"];

    var receiptObject = await cereneumInstance.Claim(
          3000000,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x5d246bca8303fcfda5e7e97acfd936fd322bfccde4d426f24e9ea724caad44a4",
          "0x98b24d98080e57f5e478fac08dafbbb7a9767eade1c2be5ce2ecb2d0742100ad",
          1,
          28,
          "0x2f316e1280923a89189bd7738bfbc605973f304f001235bbc5544af9e5ac333e",
          "0x76449c6759e1902d0fc4ffaa80f5de90611a04d8c8958059e5d589275477526d",
          4,
          accounts[1]
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(3000000 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(3000000 * fLTCRatio) == parseInt(logs[i].args[1], 16), "incorrect claim amount");
          assert(Math.floor(3000000 * .30 * fLTCRatio)+1 == parseInt(logs[i].args[2], 16), "20% speed bonus + 10% referral bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(true == logs[i].args[4], "referrer incorrect");
      }
    }

    var nGenesisBalance = parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10);
    var nAccount1Balance = parseInt(await cereneumInstance.balanceOf(accounts[1]), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);

    assert(nGenesisBalance == parseInt(3000000 * 0.50 * fLTCRatio, 10), "Genesis balance incorrect");
    assert(nAccount1Balance == parseInt(3000000 * 0.20 * fLTCRatio, 10), "Referral balance incorrect");
    assert(nAccountBalance == parseInt(3000000 * 1.30 * fLTCRatio, 10)+1, "Claim balance incorrect");
    assert(await cereneumInstance.GetCirculatingSupply() == nGenesisBalance + nAccountBalance + nAccount1Balance, "Circulating supply incorrect");
  });
  it('TestSelfReferralBonus', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x33a1481afb5e7ed982ee4ed34fd7c9a142a58804b4c4e1f1246a5501bba36518");

      var proofs = ["0x4f84d4136b44a2fca31c5e450aad824a803742b1d6d76f8cadceab5ee2db6264",
                    "0x2d477a34f1b8f925996124b157b3a9a138a40c9c33e8073c2182d07dcf40004b",
                    "0xe3b224622797ef3d9781081b4995286d6fadec282fb0742dd1394c1b1991ebc2",
                    "0xe80d9b818149beb6f4b7bee54dc135e13e6424a30364328b82bfffeb5a9b5f41",
                    "0x8cab57ad9b71561808b5b62af6ba9e7715205a938c762d902f58361fc94ca46d",
                    "0xc205d755214f574f0aa610cce075c4d10dcfa5c5410f3febabc6b025f95942b4",
                    "0xd5e9b592206b29947d56393ef2d859be1ab616800db4a44d5f71f4c552c1e1fa",
                    "0x88c93d6ff22a49c3193af064f9a876b3b71e6c28d779b7a5dcb786f71fcff974",
                    "0x30b6fdddd528c2be9d898c89a65b9fc32c0c6fa005c0f523c1fa07ac8e8ccf00",
                    "0x0f666868b12f0e99ba56aa17169d6b2bc8561b4e40099255fde31779ab422d15",
                    "0xfae2c8db970c8dada53ecbd802a8ac41f602d2230939468f0e66979faab3def3",
                    "0x3502dd000475c35de45cb1a7f4727c3e88c41c7dca0dd8d8d06b97ea03a80250",
                    "0x3856a6f7952497e9c4be1c96a11e92ec1283e42797a1ba75f1b369a1d004ed09",
                    "0xf072dfd5d42727734442a3788fdc78ada9909f86e38f17318ada52a542f5ded2",
                    "0x62b6ace31d31a63f6e109a854fc523ecd71899a92a34095fb3d13e55efd8ff2a",
                    "0x0990b5f19e979e5c1e1f86c5a77edbe427b2ee9a6244e26a20ec367a56513486",
                    "0x06e3d59566718e7229e259a1ffccaf831083398e9ba70920f7e761a1657d9b92",
                    "0xe7e178bffffd40e7808b6fbf4c4a308f84307a1d4a4513208ef13971daf249b4",
                    "0xa7e653744e6bbbd5fec1f25506a79686e619d0e442a16b8b49c5b94a7ff0119e",
                    "0x950c4ada7fbc1c666a108107ad2cce6f56887bc76272b73c308719f866d1ee05",
                    "0x5b13d34d88c50cbd9e2768d1b5145d39e99c9bb056bd2948a72c787416d312a2",
                    "0xb380b61545593e3f58a3f70a776c0d35d6bd0db1d04433586f7d8bf4f4235a17"];

    var receiptObject = await cereneumInstance.Claim(
          3000000,
          proofs,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
          "0x5d246bca8303fcfda5e7e97acfd936fd322bfccde4d426f24e9ea724caad44a4",
          "0x98b24d98080e57f5e478fac08dafbbb7a9767eade1c2be5ce2ecb2d0742100ad",
          1,
          28,
          "0x2f316e1280923a89189bd7738bfbc605973f304f001235bbc5544af9e5ac333e",
          "0x76449c6759e1902d0fc4ffaa80f5de90611a04d8c8958059e5d589275477526d",
          4,
          "0xE658D355303e96425c38FB4778a3E8a56F582Eb0"
    );

    var sReceipt = JSON.stringify(receiptObject, null, 4);
    var jsonReceipt = JSON.parse(sReceipt);
    var logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "ClaimEvent")
      {
          assert(3000000 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(3000000 * fLTCRatio) == parseInt(logs[i].args[1], 16), "incorrect claim amount");
          assert(Math.floor(3000000 * .30 * fLTCRatio)+1 == parseInt(logs[i].args[2], 16), "20% speed bonus + 10% referral bonus failed");  //day 1 redeem gets 20% bonus
          assert(0 == parseInt(logs[i].args[3], 16), "Penalty incorrect");
          assert(true == logs[i].args[4], "referrer incorrect");
      }
    }

    var nGenesisBalance = parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);

    assert(nGenesisBalance == parseInt(3000000 * 0.50 * fLTCRatio, 10), "Genesis balance incorrect");
    assert(nAccountBalance == parseInt(3000000 * 1.50 * fLTCRatio, 10), "Claim balance incorrect");
    assert(await cereneumInstance.GetCirculatingSupply() == nGenesisBalance + nAccountBalance, "Circulating supply incorrect");
  });
  //Test that voting phase works properly before claims phase
  it('TestStakeVotingClaimsPeriod', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == 100000 * 1.20);

    //Adjust 14 days for post launch buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    //Vote for 10x multiplier
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 7, 10, {from: accounts[1]});

    var nTotalSupply = (parseInt(nSatoshiAmountAtLaunch,10) + parseInt(nClaimAmount*.4,10) + parseInt(nClaimAmount*.4,10));

    var nUTXOCountAtSnapshot = parseInt(await cereneumInstance.m_nUTXOCountAtSnapshot(), 10);
    var nAdjustedMaxRedeemable = parseInt(await cereneumInstance.m_nAdjustedMaxRedeemable(), 10);

    var nRedeemedCount = parseInt(await cereneumInstance.m_nRedeemedCount(), 10);
    var nTotalRedeemed = parseInt(await cereneumInstance.m_nTotalRedeemed(), 10);
    var nPayoutTotal = 0;

    var nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nTotalSupply += Math.floor(nTotalSupply / 7300);
    nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
    nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
    nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
    nPayoutTotal += nPayoutRound;

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);

    var nPayout = await cereneumInstance.CalculatePayout(
      await cereneumInstance.getStakeStructShares(accounts[1]),
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1])
    );

    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

    var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nBalanceAfterStake,10) == (parseInt(nPayoutTotal,10) + parseInt(nBalanceAfterClaim,10)), "Balance after stake incorrect");
  });
  //Test that voting phase works properly after claims phase
  it('TestStakeVotingAfterClaimsPeriod', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == 100000 * 1.20);

    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);

    //50 weeks have now passed
    var nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(), 10);

    //Vote for 10x multiplier
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 7, 10, {from: accounts[1]});

    for(var i=1; i <= 10; i++)
    {
      if(i == 10)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 120000);
      }
      else
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 0);
      }
    }

    var nTempPayout = 0;
    var nPayoutRound = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nPayoutRound;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*10), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    //No frenzy or prosperous bonuses anymore

    await cereneumInstance.testAdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);

    assert(await cereneumInstance.m_nInterestMultiplier() == 10, "nInterestMultiplier not 10");


    await cereneumInstance.testAdjustContractLaunchTime(6);
    await cereneumInstance.testAdjustStakeTime(0, 6, accounts[1]);
    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

    var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nBalanceAfterClaim,10)), "1) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(), 10);
    //Vote for 5x multiplier with less tokens
    await cereneumInstance.StartStake(100, 7, 5, {from: accounts[1]});

    for(var i=1; i <= 10; i++)
    {
      if(i == 5)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 100);
      }
      else
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 0);
      }
    }

    nTempPayout = 0;
    nPayoutRound = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nPayoutRound;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*5), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    //No frenzy or prosperous bonuses anymore

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

    assert(await cereneumInstance.m_nInterestMultiplier() == 5, "nInterestMultiplier not 5");

    var nNewBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nNewBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nBalanceAfterStake,10)), "2) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);
    //Vote for 1x multiplier with less tokens
    await cereneumInstance.StartStake(10, 7, 1, {from: accounts[1]});

    for(var i=1; i <= 10; i++)
    {
      if(i == 1)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 10);
      }
      else
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 0);
      }
    }

    nTempPayout = 0;
    nPayoutRound = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nPayoutRound;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(nCirculatingSupply / 7300), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    //No frenzy or prosperous bonuses anymore

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

    assert(await cereneumInstance.m_nInterestMultiplier() == 1, "nInterestMultiplier not 1");

    var nOtherBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nOtherBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nNewBalanceAfterStake,10)), "3) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);

    //Vote for 2x multiplier with less tokens
    await cereneumInstance.StartStake(10, 7, 2, {from: accounts[1]});

    //Vote for 7x multiplier with more tokens
    await cereneumInstance.StartStake(11, 7, 7, {from: accounts[2]});

    for(var i=1; i <= 10; i++)
    {
      if(i == 2)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 10);
      }
      else if(i == 7)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 11);
      }
      else
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 0);
      }
    }

    nTempPayout = 0;
    nPayoutRound = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nPayoutRound;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*7), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    //No frenzy or prosperous bonuses anymore

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(await cereneumInstance.m_nInterestMultiplier() == 7, "nInterestMultiplier not 7");

    var nAcct1BalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nAcct1BalanceAfterStake,10)+2 == (parseInt(Math.floor(nPayoutRound*(10/21)),10) + parseInt(nOtherBalanceAfterStake,10)), "4) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);

    //Vote for 4x multiplier
    await cereneumInstance.StartStake(100, 7, 4, {from: accounts[1]});

    //Vote for 9x multiplier with same tokens but more shares
    await cereneumInstance.StartStake(100, 90, 9, {from: accounts[2]});

    for(var i=1; i <= 10; i++)
    {
      if(i == 4)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 100);
      }
      else if(i == 9)
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 104);
      }
      else
      {
        assert(await cereneumInstance.m_votingMultiplierMap(i) == 0);
      }
    }

    nTempPayout = 0;
    nPayoutRound = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nPayoutRound;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    nTempPayout = parseInt(Math.floor(Math.floor(nCirculatingSupply / 7300)*9), 10);
    nCirculatingSupply += nTempPayout;
    nPayoutRound += nTempPayout;
    //No frenzy or prosperous bonuses anymore

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
    await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
    //await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.m_nInterestMultiplier() == 9,  "nInterestMultiplier not 9");

    var nAcct1newBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nAcct1newBalanceAfterStake,10)+3 == (parseInt(Math.floor(nPayoutRound*(100/204)),10) + parseInt(nAcct1BalanceAfterStake,10)), "5) Balance after stake incorrect");
  });
  //The most basic test of a stake completing
  it('TestStandardStake', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(100000 * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == 100000 * 1.20);

      //Adjust 14 days for buffer window after launch
      await cereneumInstance.testAdjustContractLaunchTime(14);

      //Stake 10000 coins for 7 days
      var nStakeAmount = 0;
      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            nStakeAmount = parseInt(logs[i].args[0], 16);
            assert(nStakeAmount == 10000);
            //console.log("StackedAmount:" + nStakeAmount);
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            assert(parseInt(logs[i].args[1], 16) == 7);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

      //Adjust contracts launch time (rewinds X days)
      var nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      //Adjust stakes start time (rewinds X days)
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[1]),
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1])
      );

      //Stake should now have completed
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(parseInt(nBalanceAfterEndStake,10) == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");
  });
  //Test a stake ending 1 day past the grace period
  it('TestEndStakeLate', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    await cereneumInstance.testFakeClaim(
          100000,
          accounts[2],
          0
        );

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[2]);
    assert(Math.floor(100000 * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

    //Adjust 14 days for buffer window after launch
    await cereneumInstance.testAdjustContractLaunchTime(14);

    var nStakeAmount = 0;
    var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[2]});
    var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
    jsonReceipt = JSON.parse(sStakeReceipt);
    logs = jsonReceipt.receipt.logs;
    for(var i=0; i < logs.length; ++i)
    {
      if(logs[i].event == "StartStakeEvent")
      {
          nStakeAmount = parseInt(logs[i].args[0], 16);
          //console.log("StackedAmount:" + nStakeAmount);
          //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
      }
    }

    var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[2]);
    assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "balance after stake incorrect");

    //Adjust contracts launch time (rewinds X days)
    var nAdjustedDays = 15;
    await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
    //Adjust stakes start time (rewinds X days)
    await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[2]);

    var nPayout = await cereneumInstance.CalculatePayout(
      await cereneumInstance.getStakeStructShares(accounts[2]),
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    //1 day late after grace period loses 1%
    var nAmountAfterLatePenalty = Math.floor(parseInt(nPayout, 10) * .99);

    //Stake should now have completed
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
    var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[2]);

    assert((parseInt(nBalanceAfterEndStake,10)-1) == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
      nAmountAfterLatePenalty), "Balance after end stake incorrect");
  });
  //Start a stake for 365 days and end it immediately. Verify correct penalties
  it('TestEarlyUnstake365Days', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[3],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);
      assert(Math.floor(100000 * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      //Adjust 14 days for buffer window after launch
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[3]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[3]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "balance after stake incorrect");

      var nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      await cereneumInstance.EndStakeEarly(0, {from: accounts[3]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = nStakeAmount * 0.95;
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)), "balance after end stake incorrect");

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.05);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)), "genesis balance incorrect");
  });
  //Start a stake for 7 days and end it immediately. Verify correct penalties
  it('TestEarlyUnstake7Days', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[3],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);

      //Adjust 14 days for buffer window after launch
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[3]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[3]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

      var nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      await cereneumInstance.EndStakeEarly(0, {from: accounts[3]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = nStakeAmount - Math.floor(nStakeAmount * (0.05/52));
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)));

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.05/52);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)));
  });
  //Start a stake for 5 years and end it immediately. Verify correct penalties
  it('TestEarlyUnstake5Years', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[3],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);

      //Adjust 14 days for buffer window after launch
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 365*5, 1, {from: accounts[3]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[3]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

      var nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      await cereneumInstance.EndStakeEarly(0, {from: accounts[3]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = Math.floor(nStakeAmount * (0.75));
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)));

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.25);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)));
  });
  //Start a stake one hour before the next daily update and then end it shortly after
  //Verify that staker gets no payout for not staking at least 24 hours
  it('TestEarlyUnstakeLessThanOneDay', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      //Move time back 23 hours
      await cereneumInstance.testAdjustContractLaunchTimeHours(23);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

      var nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      //Adjust 2 hours so that 25 hours have passed since contract launch
      await cereneumInstance.testAdjustContractLaunchTimeHours(2);
      await cereneumInstance.testAdjustStakeTimeHours(0, 2, accounts[1]);

      var nPayout = await cereneumInstance.CalculatePayout(
        10000,
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getBlockTime()
      );

      assert(parseInt(nPayout, 10) > 0, "Payout was zero.");

      var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1]),
        nStakeAmount,
        parseInt(nPayout,10)
      );

      var nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      //Account1 balance should be the same as it was before the stake started
      assert(parseInt(nBalanceAfterEndStake, 10) == parseInt(nBalanceAfterClaim, 10), "Balance after end stake incorrect");

      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d") == (parseInt(nGenesisAddressBalance,10) + Math.floor(nEarlyPenalty/2)));
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 2 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test2YearStakeNoOtherClaim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*2, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    await cereneumInstance.EndStakeEarly(0,  {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 3 years, getting bonus stake shares
  //Account2 will stake for 1 year getting less bonus stake shares than account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test3YearStakeNoOtherClaim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*3, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 4 years, getting bonus stake shares
  //Account2 will stake for 1 year getting less bonus stake shares than account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test4YearStakeNoOtherClaim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*4, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 2 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test2YearStake9800000Claim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*2, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 3 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test3YearStake9800000Claim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*3, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 4 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test4YearStake9800000Claim', async () => {
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    //Adjust for buffer window
    await cereneumInstance.testAdjustContractLaunchTime(14);

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*4, 1, {from: accounts[1]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

    await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
    await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We verify that compounding interest every 30 days for a 60 day stake gives the same
  //balance as starting and ending stakes every 30 days. Then verify compounding once
  //gives a higher payout than an identical stake that doesnt compound
  it('TestCompoundInterest', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var nStakeAmount = 0;
      var nStakePeriods = 60;
      var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            nStakeAmount = parseInt(logs[i].args[0], 16);
            assert(nStakeAmount == parseInt(nClaimAmount*1.20, 10));
            //console.log("StackedAmount:" + nStakeAmount);
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

      for(var p=0; p<2; ++p)
      {
        var nStakeAmt = await cereneumInstance.balanceOf(accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, {from: accounts[2]});
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
        if(p==1)
          await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
        else
          await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
      }

      //Accounts should have equal balance
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == parseInt(await cereneumInstance.balanceOf(accounts[2]),10));

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), nStakePeriods, 1, {from: accounts[2]});

      for(var p=0; p<2; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        if(p==0)  //Only compound interest once on purpose
          await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
      }
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      //Account1 should have higher balance since it compounded interest once
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) > parseInt(await cereneumInstance.balanceOf(accounts[2]),10));
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 1 year
  //stake when they both end after 1 year.
  it('TestEarlyUnstake5YearTo1YearNoSatoshiReward', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address incorrect balance");

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

      for(var p=0; p<12; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(5);
      await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 2 year
  //stake when they both end after 2 year.
  it('TestEarlyUnstake5YearTo2YearNoSatoshiReward', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*2, 1, {from: accounts[2]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

      for(var p=0; p<24; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(10);
      await cereneumInstance.testAdjustStakeTime(0, 10, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 10, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 10, accounts[3]);

      var nPayout = await cereneumInstance.CalculatePayout(
        nBalanceAfterClaim*2, //100% bonus for 5 year stake`
        await cereneumInstance.getStakeStructLockTime(accounts[2]),
        await cereneumInstance.getStakeStructEndTime(accounts[2])
      );

      var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1]),
        nBalanceAfterClaim,
        parseInt(nPayout,10)
      );

      var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

      if(nEarlyPenalty != nMinimumPenalty)
      {
        assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
      }

      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 3 year
  //stake when they both end after 3 year.
  it('TestEarlyUnstake5YearTo3YearNoSatoshiReward', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*3, 1, {from: accounts[2]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

      for(var p=0; p<36; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(15);
      await cereneumInstance.testAdjustStakeTime(0, 15, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 15, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 15, accounts[3]);

      var nPayout = await cereneumInstance.CalculatePayout(
        nBalanceAfterClaim*2, //100% bonus for 5 year stake`
        await cereneumInstance.getStakeStructLockTime(accounts[2]),
        await cereneumInstance.getStakeStructEndTime(accounts[2])
      );

      var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1]),
        nBalanceAfterClaim,
        parseInt(nPayout,10)
      );

      var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

      if(nEarlyPenalty != nMinimumPenalty)
      {
        assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
      }

      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 4 year
  //stake when they both end after 4 year.
  it('TestEarlyUnstake5YearTo4YearNoSatoshiReward', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*4, 1, {from: accounts[2]});
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

      for(var p=0; p<48; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(20);
      await cereneumInstance.testAdjustStakeTime(0, 20, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 20, accounts[2]);
      await cereneumInstance.testAdjustStakeTime(0, 20, accounts[3]);

      var nPayout = await cereneumInstance.CalculatePayout(
        nBalanceAfterClaim*2, //100% bonus for 5 year stake`
        await cereneumInstance.getStakeStructLockTime(accounts[2]),
        await cereneumInstance.getStakeStructEndTime(accounts[2])
      );

      var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1]),
        nBalanceAfterClaim,
        parseInt(nPayout,10)
      );

      var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

      if(nEarlyPenalty != nMinimumPenalty)
      {
        assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
      }

      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    it('TestEarlyUnstake5YearTo1YearWith9800000Unclaimed', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith2500000Claim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              2500000,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

        var nPayout = await cereneumInstance.CalculatePayout(
          nBalanceAfterClaim*2, //100% bonus for 5 year stake`
          await cereneumInstance.getStakeStructLockTime(accounts[2]),
          await cereneumInstance.getStakeStructEndTime(accounts[2])
        );

        var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1]),
          nBalanceAfterClaim,
          parseInt(nPayout,10)
        );

        var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

        if(nEarlyPenalty != nMinimumPenalty)
        {
          //console.log("nEarlyPenalty: " + nEarlyPenalty);
          //console.log("Math.floor((parseInt(nPayout,10))*.75): " + Math.floor((parseInt(nPayout,10))*.75));
          assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith5000000Claim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              5000000,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

        var nPayout = await cereneumInstance.CalculatePayout(
          nBalanceAfterClaim*2, //100% bonus for 5 year stake`
          await cereneumInstance.getStakeStructLockTime(accounts[2]),
          await cereneumInstance.getStakeStructEndTime(accounts[2])
        );

        var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1]),
          nBalanceAfterClaim,
          parseInt(nPayout,10)
        );

        var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

        if(nEarlyPenalty != nMinimumPenalty)
        {
          //console.log("nEarlyPenalty: " + nEarlyPenalty);
          //console.log("Math.floor((parseInt(nPayout,10))*.75): " + Math.floor((parseInt(nPayout,10))*.75));
          //Off by one rounding error here
          assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith5500000Claim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              5500000,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

        var nPayout = await cereneumInstance.CalculatePayout(
          nBalanceAfterClaim*2, //100% bonus for 5 year stake`
          await cereneumInstance.getStakeStructLockTime(accounts[2]),
          await cereneumInstance.getStakeStructEndTime(accounts[2])
        );

        var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1]),
          nBalanceAfterClaim,
          parseInt(nPayout,10)
        );

        var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

        if(nEarlyPenalty != nMinimumPenalty)
        {
          assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith6000000Claim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              6000000,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

        var nPayout = await cereneumInstance.CalculatePayout(
          nBalanceAfterClaim*2, //100% bonus for 5 year stake`
          await cereneumInstance.getStakeStructLockTime(accounts[2]),
          await cereneumInstance.getStakeStructEndTime(accounts[2])
        );

        var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1]),
          nBalanceAfterClaim,
          parseInt(nPayout,10)
        );

        var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.25);

        if(nEarlyPenalty != nMinimumPenalty)
        {
          //console.log("nEarlyPenalty: " + nEarlyPenalty);
          //console.log("Math.floor((parseInt(nPayout,10))*.75): " + Math.floor((parseInt(nPayout,10))*.75));
          assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith7500000Claim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              7500000,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, {from: accounts[1]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, {from: accounts[2]});
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, {from: accounts[3]});

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[3]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[3]);

        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Basic test for payouts when there is only one claim for the first year
    it('TestCalculatePayoutOneClaim', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        //Stake 10000 coins for 7 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(10000, nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == 10000);
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        var nAdjustedDays = 7;
        var nWeeks = 52;
        var nTotalDays = 0;
        for(var j=0; j < nWeeks; ++j)
        {
          await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
          await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);
          nTotalDays += nAdjustedDays;
        }

        //Need extra days for 1 year
        for(var j=0; nTotalDays < 365; ++nTotalDays)
        {
          await cereneumInstance.testAdjustContractLaunchTime(1);
          await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
        }

        var nPayout = await cereneumInstance.CalculatePayout(
          await cereneumInstance.getStakeStructShares(accounts[1]),
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1])
        );

        //Stake should now have completed
        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
        var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

        assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
          parseInt(nPayout, 10)));

        assert(1948 == await cereneumInstance.balanceOf(cereneumInstance.address), "Contract balance incorrect");
    });
    //Basic test for payouts where there are only two claims in the first year
    it('TestCalculatePayoutTwoClaims', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        //Stake 10000 coins for 7 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(10000, nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == 10000);
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        await cereneumInstance.StartStake(10000, nStakePeriods, 1, {from: accounts[2]});

        var nAdjustedDays = 7;
        var nWeeks = 52;
        var nTotalDays = 0;
        for(var j=0; j < nWeeks; ++j)
        {
          await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
          await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[2]);
          nTotalDays += nAdjustedDays;
        }

        //Need extra days for 1 year
        for(var j=0; nTotalDays < 365; ++nTotalDays)
        {
          await cereneumInstance.testAdjustContractLaunchTime(1);
          await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 1, accounts[2]);
        }

        //console.log("nTotalDays: " + nTotalDays);

        var nPayout = await cereneumInstance.CalculatePayout(
          await cereneumInstance.getStakeStructShares(accounts[1]),
          await cereneumInstance.getStakeStructLockTime(accounts[1]),
          await cereneumInstance.getStakeStructEndTime(accounts[1])
        );
        //console.log("Payout: " + nPayout);

        //Stake should now have completed
        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
        var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

        assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
          parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
        var nBalanceAccountTwoAfterEndStake = await cereneumInstance.balanceOf(accounts[2]);

        assert(nBalanceAccountTwoAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
          parseInt(nPayout, 10)), "nBalanceAccountTwoAfterEndStake incorrect");

        assert(parseInt(nBalanceAfterEndStake,10) == parseInt(nBalanceAccountTwoAfterEndStake,10), "balances are not equal");

        //console.log("contract balance: " + await cereneumInstance.balanceOf(cereneumInstance.address));
    });
    //Account 1 and 2 claim the same amount
    //Account 1 stakes for 365 days, getting a 20% bonus
    //Account 2 stakes every 30 days and restakes its 30 day payout with each new stake
    //Shows why CompoundInterest is needed as Account2 will have a much higher
    //balance than account1 even though account1 stakes for a year and got a 20% bonus
    it('TestPayoutTwoClaimsFirstYearNoCompound', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        //Stake 10000 coins for 365 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == parseInt(nClaimAmount * 1.20,10));
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
              //console.log("Starting stake of " + nStakeAmount + " for " + nStakePeriods + " days on accounts[1].");
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        for(var p=0; p<12; ++p)
        {
          var nStakeAmt = await cereneumInstance.balanceOf(accounts[2]);
          //console.log("Starting stake of " + nStakeAmt + " for " + 30 + " days on accounts[2].");
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, {from: accounts[2]});
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, {from: accounts[2]});
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Account1 greater than account 2");

        //console.log("accounts[1]: " + await cereneumInstance.balanceOf(accounts[1]));
        //console.log("accounts[2]: " + await cereneumInstance.balanceOf(accounts[2]));
    });
    //Account 1 and 2 claim the same amount
    //Account 1 stakes for 365 days, getting a 20% bonus
    //Account 2 stakes every 30 days and restakes its 30 day payout with each new stake
    //Account 1 Calls CompoundInterest every 30 days
    //Since Account 1 is calling CompoundInterest everytime Account 2 restakes,
    //Account 1 should have a much higher ending balance with its 20% bonus
    it('TestPayoutTwoClaimsFirstYearWithCompound', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == parseInt(nClaimAmount * 1.20,10));
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
              //console.log("Starting stake of " + nStakeAmount + " for " + nStakePeriods + " days on accounts[1].");
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        for(var p=0; p<12; ++p)
        {
          var nStakeAmt = await cereneumInstance.balanceOf(accounts[2]);
          //console.log("Starting stake of " + nStakeAmt + " for " + 30 + " days on accounts[2].");
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, {from: accounts[2]});
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
          await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, {from: accounts[2]});
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]), 10) > parseInt(await cereneumInstance.balanceOf(accounts[2]), 10));

        //console.log("accounts[1]: " + await cereneumInstance.balanceOf(accounts[1]));
        //console.log("accounts[2]: " + await cereneumInstance.balanceOf(accounts[2]));
    });
    //We advance the contract by 1 year so that it is after the claims period
    //Account 1 and 2 claim the same amount
    //Account 1 stakes for 365 days, getting a 20% bonus
    //Account 2 stakes every 30 days and restakes its 30 day payout with each new stake
    //Account 1 Calls CompoundInterest every 30 days
    //Since Account 1 is calling CompoundInterest everytime Account 2 restakes,
    //Account 1 should have a much higher ending balance with its 20% bonus
    it('TestStaggeredStakeAfterClaimsPeriodWithCompoundInterest', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        //Advance contract 365 days to get past claims period
        for(t=0; t<12; ++t)
          await cereneumInstance.testAdjustContractLaunchTime(30);

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == 120000);
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
              //console.log("Starting stake of " + nStakeAmount + " for " + nStakePeriods + " days on accounts[1].");
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        for(var p=0; p<12; ++p)
        {
          var nStakeAmt = await cereneumInstance.balanceOf(accounts[2]);
          //console.log("Starting stake of " + nStakeAmt + " for " + 30 + " days on accounts[2].");
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, {from: accounts[2]});
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
          await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, {from: accounts[2]});
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]), 10) > parseInt(await cereneumInstance.balanceOf(accounts[2]), 10));

        //console.log("accounts[1]: " + await cereneumInstance.balanceOf(accounts[1]));
        //console.log("accounts[2]: " + await cereneumInstance.balanceOf(accounts[2]));
        return;
    });
    //We advance the contract by 1 year so that it is after the claims period
    //A 3rd account will stake a very large portion of tokens so that the
    //pooled interest for accounts 1 and 2 are close to the minimum
    //Account 1 and 2 claim the same amount
    //Account 1 stakes for 365 days, getting a 20% bonus
    //Account 2 stakes every 30 days and restakes its 30 day payout with each new stake
    //Account 1 Calls CompoundInterest every 30 days
    //Since Account 1 is calling CompoundInterest everytime Account 2 restakes,
    //Account 1 should have a much ending balance with its 20% bonus
    it('TestStaggeredStakeAfterClaimsPeriodWithSmallPool', async () => {
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "Genesis balance incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        nClaimAmount = 9800000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[3],
              0
            );

        //Adjust for buffer window
        await cereneumInstance.testAdjustContractLaunchTime(14);

        //Advance contract 365 days to get past claims period
        for(t=0; t<12; ++t)
          await cereneumInstance.testAdjustContractLaunchTime(30);

        //Have 3rd account soak up most of the rewards
        await cereneumInstance.StartStake(nClaimAmount, 365, 1, {from: accounts[3]});

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, {from: accounts[1]});
        var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
        jsonReceipt = JSON.parse(sStakeReceipt);
        logs = jsonReceipt.receipt.logs;
        for(var i=0; i < logs.length; ++i)
        {
          if(logs[i].event == "StartStakeEvent")
          {
              nStakeAmount = parseInt(logs[i].args[0], 16);
              assert(nStakeAmount == 120000);
              //console.log("StackedAmount:" + nStakeAmount);
              //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
              assert(parseInt(logs[i].args[1], 16) == nStakePeriods);
              //console.log("Starting stake of " + nStakeAmount + " for " + nStakePeriods + " days on accounts[1].");
          }
        }

        var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount));

        for(var p=0; p<12; ++p)
        {
          var nStakeAmt = await cereneumInstance.balanceOf(accounts[2]);
          //console.log("Starting stake of " + nStakeAmt + " for " + 30 + " days on accounts[2].");
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, {from: accounts[2]});
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});
          await cereneumInstance.CompoundInterest(0, {from: accounts[1]});
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, {from: accounts[2]});
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

        await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]), 10) > parseInt(await cereneumInstance.balanceOf(accounts[2]), 10), "account2 greater than account1");

        //console.log("accounts[1]: " + await cereneumInstance.balanceOf(accounts[1]));
        //console.log("accounts[2]: " + await cereneumInstance.balanceOf(accounts[2]));
        return;
    });
    //Unit Test for EndStakeForAFriend
    //Account1 will stake for 7 days
    //After 8 days EndStakeForAFriend will be called
    //Then Account 1 ends the stake itself
    it('TestEndStakeForAFriend', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*1.4,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount)");

      var nAdjustedDays = 8;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);

      await cereneumInstance.EndStakeForAFriend(0, accounts[1]);

      var nBalanceAfterFriendEndStake = await cereneumInstance.balanceOf(accounts[1]);
      //Since ended for a friend, balance shouldn't have changed
      assert(parseInt(nBalanceAfterFriendEndStake,10) == parseInt(nBalanceAfterStake,10));

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[1]),
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1])
      );

      //Now we end the stake ourselves
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      g_n7DayStakeAmount = nBalanceAfterEndStake;

      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake");
    });
    //Unit Test for EndStakeForAFriend
    //Account1 will stake for 7 days
    //After 8 days EndStakeForAFriend will be called
    //Then 21 more days will pass
    //Account 1 will then end its stake
    //We verify Account 1 did not get late unstake penalties
    it('TestFriendlyEndStakeOnTimeButUserEndStakeLate', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*1.4,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount)");

      var nAdjustedDays = 8;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);

      await cereneumInstance.EndStakeForAFriend(0, accounts[1]);

      var nBalanceAfterFriendEndStake = await cereneumInstance.balanceOf(accounts[1]);
      //Since ended for a friend, balance shouldn't have changed
      assert(parseInt(nBalanceAfterFriendEndStake,10) == parseInt(nBalanceAfterStake,10));

      nAdjustedDays = 21;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeFriendlyTime(0, nAdjustedDays, accounts[1]);

      //Now we end the stake ourselves
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      //This value should be the same as the previous amount that was unstaked on time
      assert(parseInt(g_n7DayStakeAmount,10) == parseInt(nBalanceAfterEndStake,10));
    });
    //Start a stake for 7 days
    //Let 24 days pass (7 days for stake, 7 days for grace period, another 10 days late)
    //Call EndStakeForAFriend
    //Verify 10% late penalty
    //Verify correct payout to genesis
    it('TestEndStakeForAFriendAfterGracePeriod', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*1.4,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount)");

      var nAdjustedDays = 24;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);

      var nGenesisAddressBalance = parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10);

      //End stake for a friend 10 days after grace period, penalty should be 10%
      await cereneumInstance.EndStakeForAFriend(0, accounts[1]);

      var nBalanceAfterFriendEndStake = await cereneumInstance.balanceOf(accounts[1]);
      //Since ended for a friend, balance shouldn't have changed
      assert(parseInt(nBalanceAfterFriendEndStake,10) == parseInt(nBalanceAfterStake,10));

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[1]),
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1])
      );

      var nPenalty = parseInt(Math.floor(nPayout * .1), 10);

      var nExpectedBalance = parseInt(nGenesisAddressBalance, 10) + parseInt(Math.floor(nPenalty/2), 10);

      assert(nExpectedBalance == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "Genesis balance incorrect");

      //90% payout
      nPayout = Math.floor(nPayout * .9);

      //Now we end the stake ourselves
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(nBalanceAfterEndStake-1 == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

      //Verify genesis didnt get paid again after endstake was called
      assert(nExpectedBalance == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "Genesis balance incorrect");
    });
    //Start a stake for 7 days
    //Let 24 days pass (7 days for stake, 7 days for grace period, another 10 days late)
    //Call EndStakeForAFriend
    //Let another 10 days pass
    //Verify 10% late penalty
    //Verify correct payout to genesis
    it('TestEndStakeForAFriendAfterGracePeriodAdditonalDelay', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*1.4,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount), "nBalanceAfterStake == (nBalanceAfterClaim - nStakeAmount)");

      var nAdjustedDays = 24;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);

      var nGenesisAddressBalance = parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), 10);

      //End stake for a friend 10 days after grace period, penalty should be 10%
      await cereneumInstance.EndStakeForAFriend(0, accounts[1]);

      var nBalanceAfterFriendEndStake = await cereneumInstance.balanceOf(accounts[1]);
      //Since ended for a friend, balance shouldn't have changed
      assert(parseInt(nBalanceAfterFriendEndStake,10) == parseInt(nBalanceAfterStake,10));

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[1]),
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1])
      );

      var nPenalty = parseInt(Math.floor(nPayout * .1), 10);

      var nExpectedBalance = parseInt(nGenesisAddressBalance, 10) + parseInt(Math.floor(nPenalty/2), 10);

      assert(nExpectedBalance == await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"), "Genesis balance incorrect");

      //90% payout
      nPayout = Math.floor(nPayout * .9);

      //Another 10 days
      nAdjustedDays = 10;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeFriendlyTime(0, nAdjustedDays, accounts[1]);

      nGenesisAddressBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      //Now we end the stake ourselves
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(nBalanceAfterEndStake-1 == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

      //Verify genesis didnt get paid again after endstake was called
      assert(parseInt(nGenesisAddressBalance,10) == parseInt(await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d"),10), "final Genesis balance incorrect");
    });
    it('TestGlobalSharesWithCompoundingInterest', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(parseInt(await cereneumInstance.balanceOf(cereneumInstance.address),10) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)), "Contract balance incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nTotalSupply = parseInt(await cereneumInstance.totalSupply(),10);

      var nUTXOCountAtSnapshot = parseInt(await cereneumInstance.m_nUTXOCountAtSnapshot(), 10);
      var nAdjustedMaxRedeemable = parseInt(await cereneumInstance.m_nAdjustedMaxRedeemable(), 10);

      var nRedeemedCount = parseInt(await cereneumInstance.m_nRedeemedCount(), 10);
      var nTotalRedeemed = parseInt(await cereneumInstance.m_nTotalRedeemed(), 10);
      var nPayoutTotal = 0;

      var nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(1/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*(nClaimAmount/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      var nTotalShares = parseInt(await cereneumInstance.m_nTotalStakeShares(),10);

      await cereneumInstance.testAdjustContractLaunchTime(1);
      await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
      await cereneumInstance.CompoundInterest(0, {from: accounts[1]});

      var nTotalSharesAfterCompound = parseInt(await cereneumInstance.m_nTotalStakeShares(),10);
      assert(nTotalSharesAfterCompound == (nTotalShares + nPayoutRound), "total shares incorrect");
    });
    //We verify that users in the pool and the genesis address will each
    //get 50% of the early unstake penalties
    it('TestEarlyEndStakeRedistribution', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)), "contract balance incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)), "Balance after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[2]});

      var nGenesisAddressStartingBalance = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");

      await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      var nBalanceAfterEarlyUnstakes = await cereneumInstance.balanceOf(accounts[1]);
      var nUnstakePenalties = 2000; //5% of 10000 should be 500 penalty each time

      assert(parseInt(nBalanceAfterEarlyUnstakes,10) == (parseInt(nBalanceAfterClaim, 10) - parseInt(nUnstakePenalties, 10)), "balance after early unstakes incorrect");

      var nGenesisddressBalanceAfter = await cereneumInstance.balanceOf("0xb26165df612B1c9dc705B9872178B3F48151b24d");
      assert(parseInt(nGenesisddressBalanceAfter, 10) == (parseInt(nGenesisAddressStartingBalance, 10) + parseInt(nUnstakePenalties,10)/2), "genesis address balance incorrect");

      var nTotalSupply = parseInt(await cereneumInstance.totalSupply(),10);

      var nUTXOCountAtSnapshot = parseInt(await cereneumInstance.m_nUTXOCountAtSnapshot(), 10);
      var nAdjustedMaxRedeemable = parseInt(await cereneumInstance.m_nAdjustedMaxRedeemable(), 10);

      var nRedeemedCount = parseInt(await cereneumInstance.m_nRedeemedCount(), 10);
      var nTotalRedeemed = parseInt(await cereneumInstance.m_nTotalRedeemed(), 10);
      var nPayoutTotal = 0;

      var nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(2/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*2)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      var nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[2]);
      await cereneumInstance.EndStakeSafely(0, {from: accounts[2]});

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[2]);

      assert(parseInt(nBalanceAfterStake,10) == (parseInt(nPayoutTotal,10) + parseInt(nUnstakePenalties/2,10) + parseInt(nBalanceAfterClaim,10)), "Balance after stake incorrect");

      //Now start a new stake and make sure penalty rewards arent still being paid out
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[3],
            0
          );

      var nNewBalanceAfterClaim = parseInt(await cereneumInstance.balanceOf(accounts[3]), 10);

      await cereneumInstance.StartStake(10000, 7, 1, {from: accounts[3]});

      nTotalSupply = parseInt(await cereneumInstance.totalSupply(), 10);

      nRedeemedCount = parseInt(await cereneumInstance.m_nRedeemedCount(), 10);
      nTotalRedeemed = parseInt(await cereneumInstance.m_nTotalRedeemed(), 10);
      nPayoutTotal = 0;

      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*3)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nTotalSupply += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nTotalSupply += Math.floor(nTotalSupply / 7300);
      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += parseInt((nSatoshiAmountAtLaunch - nClaimAmount*2)*(0.0025/29), 10);
      nPayoutRound += Math.floor(nPayoutRound*(3/nUTXOCountAtSnapshot));
      nPayoutRound += Math.floor(nPayoutRound*((nClaimAmount*3)/nAdjustedMaxRedeemable));
      nPayoutTotal += nPayoutRound;

      nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[3]);

      await cereneumInstance.EndStakeSafely(0, {from: accounts[3]});

      var nAccount3AfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Slightly off from claim 3 being a late claim
      assert(parseInt(nAccount3AfterEndStake,10)+8 == (parseInt(nPayoutTotal,10) + parseInt(nNewBalanceAfterClaim,10)), "nAccount3AfterEndStake incorrect");
    });
    //Account 1 will stake for a year
    //2 years will pass
    //We verify the account has 0 interest payout left
    it('TestVeryLateUnstake', async () => {
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365, 1, {from: accounts[1]});

      for(var p=0; p<24; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(10);
      await cereneumInstance.testAdjustStakeTime(0, 10, accounts[1]);

      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      //We should have no payout left
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == nClaimAmount*1.2);
    });
    //We verify account 1 can create and remove 10 simultaneous stakes
    it('TestSimultaneousStakes', async () => {
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      //12 stakes should be all of our tokens
      for(var j=0; j < 12; ++j)
      {
        await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      }

      var nNumOfStakes = await cereneumInstance.GetNumberOfStakes(accounts[1]);

      assert(nNumOfStakes == 12);

      var stakeInfo = await cereneumInstance.m_staked(accounts[1], 0);
      var sStakeInfo = JSON.stringify(stakeInfo, null, 4);

      assert(await cereneumInstance.balanceOf(accounts[1]) == 0);

      for(var j=0; j < 12; ++j)
      {
        await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});
      }

      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == (parseInt(nClaimAmount*1.2,10) - parseInt(12*500,10)));

      for(var j=0; j < 10; ++j)
      {
        await cereneumInstance.StartStake(10000, 365, 1, {from: accounts[1]});
      }

      await cereneumInstance.EndStakeEarly(9, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(8, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(4, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(6, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(4, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(3, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(2, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(1, {from: accounts[1]});
      await cereneumInstance.EndStakeEarly(0, {from: accounts[1]});

      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == (parseInt(nClaimAmount*1.2,10) - parseInt(12*500,10) - parseInt(10*500,10)));

      for(var j=1; j <= 10; ++j)
      {
        await cereneumInstance.StartStake(10000, 7*j, 1, {from: accounts[1]});
      }

      nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      //9 got moved to 0
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(1, 14, accounts[1]);
      await cereneumInstance.EndStakeSafely(1, {from: accounts[1]});

      //8 got moved to 1
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(2, 21, accounts[1]);
      await cereneumInstance.EndStakeSafely(2, {from: accounts[1]});

      //7 got moved to 2
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(3, 28, accounts[1]);
      await cereneumInstance.EndStakeSafely(3, {from: accounts[1]});

      //6 got moved to 3
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(4, 35, accounts[1]);
      await cereneumInstance.EndStakeSafely(4, {from: accounts[1]});

      //5 got moved to 4
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(4, 42, accounts[1]);
      await cereneumInstance.EndStakeSafely(4, {from: accounts[1]});

      //6 is at 3 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(3, 49, accounts[1]);
      await cereneumInstance.EndStakeSafely(3, {from: accounts[1]});

      //7 is at 2 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(2, 56, accounts[1]);
      await cereneumInstance.EndStakeSafely(2, {from: accounts[1]});

      //8 is at 1 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(1, 63, accounts[1]);
      await cereneumInstance.EndStakeSafely(1, {from: accounts[1]});

      //9 is at 0 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, 70, accounts[1]);
      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});

      assert(await cereneumInstance.GetNumberOfStakes(accounts[1]) == 0);
    });
    //Verify a contract with no claims still works
    it('TestContractWithNoClaims', async () => {
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var nAdjustedDays = 7;
      for(var j=0; j < 100; ++j)
        await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
    });
    //Verify a contract with 1 claim still works
    it('TestContractWithOneClaim', async () => {
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      var nAdjustedDays = 7;
      for(var j=0; j < 100; ++j)
        await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
    });
    //Test a single stake for 5 years.
    //Verify the contract wallet isn't a fractional reserve due to any bugs
    it('Test5YearStake', async () => {
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

      var nClaimAmount = 10;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nSatoshiAmountAtLaunch = parseInt(await cereneumInstance.totalSupply(),10);

      //Adjust for buffer window
      await cereneumInstance.testAdjustContractLaunchTime(14);

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*1.4,10)), "Contract balance incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10, 365*5, 1, {from: accounts[1]});
      var sStakeReceipt = JSON.stringify(stakeReceipt, null, 4);
      jsonReceipt = JSON.parse(sStakeReceipt);
      logs = jsonReceipt.receipt.logs;
      for(var i=0; i < logs.length; ++i)
      {
        if(logs[i].event == "StartStakeEvent")
        {
            //console.log("StackedAmount:" + parseInt(logs[i].args[0], 16));
            //console.log("Staked Days:" + parseInt(logs[i].args[1], 16));
            nStakeAmount = parseInt(logs[i].args[0], 16);
        }
      }

      var nAdjustedDays = 7;
      var nWeeks = 52*5;
      var nTotalDays = 0;
      for(var j=0; j < nWeeks; ++j)
      {
        await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
        await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);
        nTotalDays += nAdjustedDays;
      }

      //5 more days to get over the 5 year mark
      await cereneumInstance.testAdjustContractLaunchTime(5);
      await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);

      await cereneumInstance.EndStakeSafely(0, {from: accounts[1]});
      assert(await cereneumInstance.balanceOf(cereneumInstance.address) >= 0);
      assert(await cereneumInstance.balanceOf(cereneumInstance.address) < 2000, "Ending contract balance incorrect");  //Contract balance should be very low
    });




    //The following Unit Tests will all fail on purpose
    /*it('FAILClaimAfter52Weeks', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      //Advance contract time 52 weeks
      await cereneumInstance.testAdjustContractLaunchTime(14);
      await cereneumInstance.testAdjustContractLaunchTime(100);
      await cereneumInstance.testAdjustContractLaunchTime(100);
      await cereneumInstance.testAdjustContractLaunchTime(100);
      await cereneumInstance.testAdjustContractLaunchTime(50);

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );
    });
    it('FAILClaimIncorrectAmount', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73350,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );
    });
    it('FAILClaimingTwice', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );
    });
    it('FAILStakeFor6Days', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 6, 1, {from: "0xE658D355303e96425c38FB4778a3E8a56F582Eb0"});
    });
    it('FAILStakeEmptyAccount', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 7, 1, {from: accounts[1]});
    });
    it('FAILStakeDuringBufferPeriod', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(13);

      await cereneumInstance.StartStake(10, 7, 1, {from: "0xE658D355303e96425c38FB4778a3E8a56F582Eb0"});
    });
    it('FAILStakeOver5Years', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 1+(365*5), 1, "0xE658D355303e96425c38FB4778a3E8a56F582Eb0");
    });
    it('FAILEndStakeOutOfBounds', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.EndStakeEarly(0);
    });
    it('FAILEndStakeOutOfBounds2', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.EndStakeSafely(0);
    });
    it('FAILEndStakeOutOfBounds3', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.EndStakeForAFriend(0, accounts[1]);
    });
    it('FAILEndStakeOutOfBounds4', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 7, 1, {from: accounts[0]});

      await cereneumInstance.EndStakeEarly(1, {from: accounts[0]});
    });
    it('FAILEndStakeOutOfBounds5', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 7, 1, {from: accounts[0]});
      await cereneumInstance.testAdjustContractLaunchTime(7);
      await cereneumInstance.testAdjustStakeTime(0, 7, accounts[0]);

      await cereneumInstance.EndStakeSafely(1, {from: accounts[0]});
    });
    it('FAILEndStakeOutOfBounds6', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            1,
            "0x0000000000000000000000000000000000000000"
      );

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartStake(10, 7, 1, {from: "0xE658D355303e96425c38FB4778a3E8a56F582Eb0"});
      await cereneumInstance.testAdjustContractLaunchTime(7);
      await cereneumInstance.testAdjustStakeTime(0, 7, accounts[0]);

      await cereneumInstance.EndStakeForAFriend(1, accounts[0]);
    });
    it('FAILEthPoolDuringBufferPeriod', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testAdjustContractLaunchTime(13);

      await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
    });
    it('FAILEthPoolBelowMinimum', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartEthStake({from:accounts[0], value:1000000000000000});  //Send below the minimim 0.01 ETH
    });
    it('FAILEthPoolWithdraw', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.WithdrawFromEthPool(0);
    });
    it('FAILEthPoolWithdraw1', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
      await cereneumInstance.WithdrawFromEthPool(0);
    });
    it('FAILEthPoolWithdraw2', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.testAdjustContractLaunchTime(14);

      await cereneumInstance.StartEthStake({from:accounts[0], value:10000000000000000});  //Send the minimim 0.01 ETH
      await cereneumInstance.testAdjustContractLaunchTime(1);
      await cereneumInstance.WithdrawFromEthPool(1);
    });
    it('FAILExchangeEthereumAirdropsCalledTwice', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      await cereneumInstance.ExchangeEthereumAirdrops();
      await cereneumInstance.ExchangeEthereumAirdrops();
    });
    it('FAILClaimIncorrectBlockchain', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            5,
            "0x0000000000000000000000000000000000000000"
      );
    });
    it('FAILClaimIncorrectBlockchain2', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4");

      var proofs = ["0x50cb917542721042dfc91ee0c10ed47ff9f84218fccafc9dbaecb15298e9069c",
                    "0x180f0298caadd5e5489f6fe04f256ef0cfd9e612f904627e9a5802a00aa42e9d",
                    "0x5ffbc621d6b4950b0ba91a8aa9e5121493b5108f69c26c7c572ea6fb1c094070"];

      var receiptObject = await cereneumInstance.Claim(
            73349,
            proofs,
            "0xE658D355303e96425c38FB4778a3E8a56F582Eb0",
            "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
            "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
            1,
            28,
            "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
            "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
            -1,
            "0x0000000000000000000000000000000000000000"
      );
    });
    it('FAILInvalidAccountForStake', async () => {
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd");

        await cereneumInstance.testFakeClaim(
              100000,
              accounts[3],
              0
            );

        //Adjust 14 days for buffer window after launch
        await cereneumInstance.testAdjustContractLaunchTime(14);

        await cereneumInstance.StartStake(10000, 365*5, 1, {from: "0xE658D355303e96425c38FB4778a3E8a56F582Eb0"});
    });*/
});
