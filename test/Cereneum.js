const Cereneum = artifacts.require("Cereneum");

var g_n7DayStakeAmount = 0;
var ONE_YEAR_PAYOUT = 781980;
var ONE_YEAR_PAYOUT_TWO_CLAIMS = 782102;
var fBCHRatio = 0.03402;
var fBSVRatio = 0.01501;
var fETHRatio = 0.04131;
var fLTCRatio = 0.01612;

contract('Cereneum', (accounts) => {
  //Test contract balance with lots of early and late unstakes
  it('TestSupply', async () => {
    const cereneumInstance = await Cereneum.deployed();

    assert(await cereneumInstance.totalSupply() == 10000000);
    assert(await cereneumInstance.GetCirculatingSupply() == 0);
  });
  it('TestSpeedBonus', async () => {
      const cereneumInstance = await Cereneum.deployed();

      assert(await cereneumInstance.testGetSpeedBonus(1000, 0) == 200);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 1) == 199);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 1*7) == 196);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 2*7) == 192);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 3*7) == 188);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 4*7) == 184);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 5*7) == 180);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 45*7) == 20);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 46*7) == 16);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 47*7) == 12);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 48*7) == 8);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 49*7) == 4);
      assert(await cereneumInstance.testGetSpeedBonus(1000, 50*7) == 0);
  });
  it('TestLateClaimAmount', async () => {
      const cereneumInstance = await Cereneum.deployed();

      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 0) == 1000);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 1)  == 997);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 1*7) == 980);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 2*7) == 960);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 3*7) == 940);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 4*7) == 920);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 5*7) == 900);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 45*7) == 100);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 46*7) == 80);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 47*7) == 60);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 48*7) == 40);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 49*7) == 20);
      assert(await cereneumInstance.testGetLateClaimAdjustedAmount(1000, 50*7) == 0);
  });
  it('TestAddresses', async () => {
    const cereneumInstance = await Cereneum.deployed();

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
    const cereneumInstance = await Cereneum.deployed();

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
    const cereneumInstance = await Cereneum.deployed();

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
    const cereneumInstance = await Cereneum.deployed();

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
          assert(73349 == parseInt(logs[i].args[0], 16));
          assert(Math.floor(73349) == parseInt(logs[i].args[1], 16), "Claim amount incorrect");  //day 1 redeem gets 20% bonus
          assert(Math.floor(73349 * .20) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(73349 * .20)); //genesis addres should have the 20% bonus
  });
  it('TestBCH-ECDSAVerify-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0xd41aa46c1156f95df467dd0fabcb8e3e35ebb4e18b3b9563cf069fac31119110",
      "0x673163cbd18de12157515bf6b3de69deefb5730e5aea7d34700a641cb70b191b",
      28,
      "0x2255bea3f315795154b6fbcd48002a98422ddced7c58be4e8a84f7c0a9ff579b",
      "0x36d14316ae8e98620f211f6c986500a64bb88ab2f85f3c2a5c26c0becb98837e",
      1), "ECDSAVerify Didn't match");
  });
  it('TestBCH-VerifyProof-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fBCHRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(73349 * .20 * fBCHRatio)); //genesis addres should have the 20% bonus
  });
  it('TestBSV-ECDSAVerify-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x82cc099ea7d36976be370a8e7e5c70d91539a91fbf1280110b11184b6cdb00d1",
      "0x80cd331f33fad8b87a8127b7c36fd803fbe0cb6afc609db38716664f4442f122",
      27,
      "0x712e227a0e5b779adaadaae35f684c799beb6bb68388264c8c716bdb4df8a8a9",
      "0x7f9004d99013ce9629ed1dc7c033469dcabde82b01543d3fb27c83949d03f807",
      2), "ECDSAVerify Didn't match");
  });
  it('TestBSV-VerifyProof-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == nAdjustedClaim + nAdjustedBonus, "claim wallet incorrect"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == nAdjustedBonus, "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  it('TestETH-ECDSAVerify-MyEtherWallet', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

    assert(await cereneumInstance.ECDSAVerify("0xe658d355303e96425c38fb4778a3e8a56f582eb0",
      "0x5b7df82a35d5a27bd3b6b6a2f468f22b3d7b6f3ad1646f69b11a7b71d8808d58",
      "0x7856c1e8891840ae3b694f6099b446785eb9dbd992858981c4464acdc938c3e4",
      28,
      "0xbae5693306c2429fed32bea34af21d16ef12f6e4189aaf7d7774c20eebab2073",
      "0x7056d7bc2e09e511b093d0d06adee06378f3ebafe3b30edca2f296505740f497",
      3), "ECDSAVerify Didn't match");
  });
  it('TestETH-VerifyProof-MyEtherWallet', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == nAdjustedClaim + nAdjustedBonus, "claim wallet incorrect"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == nAdjustedBonus, "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  //LTC addresses starting with "L"
  it('TestLTC-Legacy-ECDSAVerify-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
      "0x033fee5f2911cc0a378281f1cfaff4b69bee437a22ceb3551f1ca977f72fbdca",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x033fee5f2911cc0a378281f1cfaff4b69bee437a22ceb3551f1ca977f72fbdca",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fLTCRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(73349 * .20 * fLTCRatio)); //genesis addres should have the 20% bonus
  });
  //BTC addresses starting with "3"
  it('TestBTC-Segwit-ECDSAVerify-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(73349 * .20)); //genesis addres should have the 20% bonus
  });
  //LTC addresses starting with "M"
  it('TestLTC-Segwit-ECDSAVerify-Coinomi', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(73349 * 1.20 * fLTCRatio)); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(73349 * .20 * fLTCRatio)); //genesis addres should have the 20% bonus
  });
  it('TestBCH-Claim-Coinomi-UnbalancedMerkleTree', async () => {
    var nSatoshiAmountAtLaunch = 150000000000004;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0xbe9909750e11e059dc8822f1756d46b1ed7bf1a8f5cb2d8186a32fd2f7d30733",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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
          //+3 for rounding error
          assert(Math.floor(150000000000004 * 0.03402)+3 == parseInt(logs[i].args[1], 16), "Incorrect claim amount");  //day 1 redeem gets 20% bonus
          assert(Math.floor(150000000000004 * .20 * 0.03402) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(false == logs[i].args[3]);
      }
    }

    assert(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0") == Math.floor(150000000000004 * 1.20 * fBCHRatio)+3, "Incorrect balance"); //claim plus 20% speed bonus
    assert(await cereneumInstance.balanceOf(accounts[0]) == Math.floor(150000000000004 * .20 * fBCHRatio), "genesis address incorrect"); //genesis addres should have the 20% bonus
  });
  it('TestLaunchTimeSupply', async () => {
    var nSatoshiAmountAtLaunch = 232184270;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x0d63370847756d4df982f5d268812bc1c29d34b3a852484afd83ccd253e30012",
      nSatoshiAmountAtLaunch,
      10000000,
      accounts[0]);

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
          assert(Math.floor(73349 * fLTCRatio) == parseInt(logs[i].args[1], 16), "incorrect claim amount");
          assert(Math.floor(73349 * .20 * fLTCRatio) == parseInt(logs[i].args[2], 16), "20% speed bonus failed");  //day 1 redeem gets 20% bonus
          assert(false == logs[i].args[3]);
      }
    }

    var nAccount0Balance = parseInt(await cereneumInstance.balanceOf(accounts[0]), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);
    assert(await cereneumInstance.GetCirculatingSupply() == nAccount0Balance + nAccountBalance);
  });
  it('TestLargeMerkleTree', async () => {
    var nSatoshiAmountAtLaunch = 232184270;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x33a1481afb5e7ed982ee4ed34fd7c9a142a58804b4c4e1f1246a5501bba36518",
      nSatoshiAmountAtLaunch,
      10000000,
      accounts[0]);

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
          assert(false == logs[i].args[3]);
      }
    }

    var nAccount0Balance = parseInt(await cereneumInstance.balanceOf(accounts[0]), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);
    assert(await cereneumInstance.GetCirculatingSupply() == nAccount0Balance + nAccountBalance);
  });
  it('TestReferralBonus', async () => {
    var nSatoshiAmountAtLaunch = 232184270;
    const cereneumInstance = await Cereneum.new(
      "0x4d1e253b49710ff89e14fd73dd144ca1c82dce935022d3f4aa39a056c955b6b9",
      "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
      "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
      "0x2f1f0691f3e1c71cf9d369ee50c02e3234f6a9ecc1a798b861830f81fa62e956",
      "0x33a1481afb5e7ed982ee4ed34fd7c9a142a58804b4c4e1f1246a5501bba36518",
      nSatoshiAmountAtLaunch,
      10000000,
      accounts[0]);

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
          assert(true == logs[i].args[3]);
      }
    }

    var nAccount0Balance = parseInt(await cereneumInstance.balanceOf(accounts[0]), 10);
    var nAccount1Balance = parseInt(await cereneumInstance.balanceOf(accounts[1]), 10);
    var nAccountBalance = parseInt(await cereneumInstance.balanceOf("0xE658D355303e96425c38FB4778a3E8a56F582Eb0"), 10);

    assert(nAccount0Balance == parseInt(3000000 * 0.50 * fLTCRatio, 10), "Genesis balance incorrect");
    assert(nAccount1Balance == parseInt(3000000 * 0.20 * fLTCRatio, 10), "Referral balance incorrect");
    assert(await cereneumInstance.GetCirculatingSupply() == nAccount0Balance + nAccountBalance + nAccount1Balance, "Circulating supply incorrect");
  });
  it('TestGasPrices', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    console.log("UpdateDailyData gas: " + await cereneumInstance.UpdateDailyData.estimateGas({from:accounts[0]}));

    console.log("AdjustContractLaunchTime gas: " + await cereneumInstance.AdjustContractLaunchTime.estimateGas(1, {from:accounts[0]}));

    await cereneumInstance.AdjustContractLaunchTime(1);

    console.log("UpdateDailyData gas: " + await cereneumInstance.UpdateDailyData.estimateGas({from:accounts[0]}));

    await cereneumInstance.UpdateDailyData();

    console.log("UpdateDailyData gas: " + await cereneumInstance.UpdateDailyData.estimateGas({from:accounts[0]}));

    await cereneumInstance.AdjustContractLaunchTime(2);

    console.log("UpdateDailyData gas: " + await cereneumInstance.UpdateDailyData.estimateGas({from:accounts[0]}));

    await cereneumInstance.UpdateDailyData();

    console.log("Claim gas: " + await cereneumInstance.testFakeClaim.estimateGas(100000, accounts[1], 0, {from:accounts[0]}));
    console.log("Claim 300000 gas: " + await cereneumInstance.testFakeClaim.estimateGas(300000, accounts[1], 0, {from:accounts[0]}));

    console.log("StartStake 7 day gas: " + await cereneumInstance.StartStake.estimateGas(10000, 7, 1, accounts[1], {from:accounts[0]}));
    console.log("StartStake 365 day gas: " + await cereneumInstance.StartStake.estimateGas(10000, 365, 1, accounts[1], {from:accounts[0]}));

    await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
    console.log("CompoundInterest gas: " + await cereneumInstance.CompoundInterest.estimateGas(0, accounts[1], {from:accounts[0]}));

    await cereneumInstance.testAdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    console.log("CompoundInterest gas: " + await cereneumInstance.CompoundInterest.estimateGas(0, accounts[1], {from:accounts[0]}));
    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.CompoundInterest(0, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    await cereneumInstance.UpdateDailyData();
    console.log("EndStakeSafely gas: " + await cereneumInstance.testEndStakeSafely.estimateGas(0, accounts[1], {from:accounts[0]}));
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(64);
    await cereneumInstance.testAdjustStakeTime(0, 64, accounts[1]);
    console.log("CompoundInterest gas: " + await cereneumInstance.CompoundInterest.estimateGas(0, accounts[1], {from:accounts[0]}));
    //await cereneumInstance.CompoundInterest(0, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(1);
    await cereneumInstance.testAdjustStakeTime(0, 1, accounts[1]);
    console.log("EndStakeSafely gas: " + await cereneumInstance.testEndStakeSafely.estimateGas(0, accounts[1], {from:accounts[0]}));
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    await cereneumInstance.AdjustContractLaunchTime(30);

    console.log("UpdateDailyData gas: " + await cereneumInstance.UpdateDailyData.estimateGas({from:accounts[0]}));

    await cereneumInstance.UpdateDailyData();

    await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(75);
    await cereneumInstance.testAdjustStakeTime(0, 75, accounts[1]);
    await cereneumInstance.testAdjustContractLaunchTime(65);
    await cereneumInstance.testAdjustStakeTime(0, 65, accounts[1]);
    await cereneumInstance.UpdateDailyData();
    console.log("EndStakeSafely gas (365 days no daily update cost): " + await cereneumInstance.testEndStakeSafely.estimateGas(0, accounts[1], {from:accounts[0]}));
  });
  //Test that voting phase works properly before claims phase
  it('TestStakeVotingClaimsPeriod', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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

    //Vote for 10x multiplier
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 7, 10, accounts[1]);

    var nTotalSupply = (parseInt(nSatoshiAmountAtLaunch,10) + parseInt(nClaimAmount*.4,10) + parseInt(nClaimAmount*.4,10));

    var nPayoutRound = Math.floor(nTotalSupply / 7300);
    nPayoutRound += Math.floor((nSatoshiAmountAtLaunch - nClaimAmount*2)/350);
    nPayoutRound += Math.floor(nPayoutRound*nClaimAmount*2/nSatoshiAmountAtLaunch/2);
    nPayoutRound += Math.floor(nPayoutRound*2/1000/2);
    nPayoutRound *= 7;

    await cereneumInstance.testAdjustContractLaunchTime(7);
    await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);

    var nPayout = await cereneumInstance.CalculatePayout(
      await cereneumInstance.getStakeStructShares(accounts[1]),
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1])
    );

    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nBalanceAfterStake,10)-8 == (parseInt(nPayoutRound,10) + parseInt(nBalanceAfterClaim,10)), "Balance after stake incorrect");
  });
  //Test that voting phase works properly after claims phase
  it('TestStakeVotingAfterClaimsPeriod', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

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

    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);
    await cereneumInstance.testAdjustContractLaunchTime(70);

    //50 weeks have now passed
    var nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(), 10);

    //Vote for 10x multiplier
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 7, 10, accounts[1]);

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
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nBalanceAfterClaim,10)), "1) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(), 10);
    //Vote for 5x multiplier with less tokens
    await cereneumInstance.StartStake(100, 7, 5, accounts[1]);

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
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    assert(await cereneumInstance.m_nInterestMultiplier() == 5, "nInterestMultiplier not 5");

    var nNewBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nNewBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nBalanceAfterStake,10)), "2) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);
    //Vote for 1x multiplier with less tokens
    await cereneumInstance.StartStake(10, 7, 1, accounts[1]);

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
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);

    assert(await cereneumInstance.m_nInterestMultiplier() == 1, "nInterestMultiplier not 1");

    var nOtherBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nOtherBalanceAfterStake,10) == (parseInt(nPayoutRound,10) + parseInt(nNewBalanceAfterStake,10)), "3) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);

    //Vote for 2x multiplier with less tokens
    await cereneumInstance.StartStake(10, 7, 2, accounts[1]);

    //Vote for 7x multiplier with more tokens
    await cereneumInstance.StartStake(11, 7, 7, accounts[2]);

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
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.m_nInterestMultiplier() == 7, "nInterestMultiplier not 7");

    var nAcct1BalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nAcct1BalanceAfterStake,10)+1 == (parseInt(Math.floor(nPayoutRound*(10/21)),10) + parseInt(nOtherBalanceAfterStake,10)), "4) Balance after stake incorrect");

    //Get new circulating supply
    nCirculatingSupply = parseInt(await cereneumInstance.totalSupply(),10);

    //Vote for 4x multiplier
    await cereneumInstance.StartStake(100, 7, 4, accounts[1]);

    //Vote for 9x multiplier with same tokens but more shares
    await cereneumInstance.StartStake(100, 90, 9, accounts[2]);

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
    await cereneumInstance.testEndStakeSafely(0, accounts[1]);
    //await cereneumInstance.testEndStakeSafely(0, accounts[2]);


    assert(await cereneumInstance.m_nInterestMultiplier() == 9,  "nInterestMultiplier not 9");

    var nAcct1newBalanceAfterStake = await cereneumInstance.balanceOf(accounts[1]);

    assert(parseInt(nAcct1newBalanceAfterStake,10)+4 == (parseInt(Math.floor(nPayoutRound*(100/204)),10) + parseInt(nAcct1BalanceAfterStake,10)), "5) Balance after stake incorrect");
  });
  //The most basic test of a stake completing
  it('TestStandardStake', async () => {
      const cereneumInstance = await Cereneum.deployed();

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert((Math.floor(73349 * .20) + 100000 * .20) == await cereneumInstance.balanceOf(accounts[0]));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == 100000 * 1.20);

      //Stake 10000 coins for 7 days
      var nStakeAmount = 0;
      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);
      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)));
  });
  //Test a stake ending 1 day past the grace period
  it('TestEndStakeLate', async () => {
    const cereneumInstance = await Cereneum.deployed();

    await cereneumInstance.testFakeClaim(
          100000,
          accounts[2],
          0
        );

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[2]);
    assert(nBalanceAfterClaim == (Math.floor(100000 * .98) + Math.floor(100000*.2*(343/350))), "Balance after claim incorrect"); //98% for week late claim, .196 for 1 week late

    var nStakeAmount = 0;
    var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[2]);
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
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);
    var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[2]);

    assert((parseInt(nBalanceAfterEndStake,10)-1) == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
      nAmountAfterLatePenalty), "Balance after end stake incorrect");
  });
  //Start a stake for 365 days and end it immediately. Verify correct penalties
  it('TestEarlyUnstake365Days', async () => {
      const cereneumInstance = await Cereneum.deployed();

      await cereneumInstance.testFakeClaim(
            100000,
            accounts[3],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(100000 * (328/350)) + (100000*.2*(328/350))), "balance after claim incorrect"); //94% for 3 week late claim, .188 for 3 week late

      var stakeReceipt = await cereneumInstance.StartStake(10000, 365, 1, accounts[3]);
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

      var nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

      //Stake should now have completed
      await cereneumInstance.testEndStake(0, accounts[3]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = nStakeAmount * 0.95;
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)), "balance after end stake incorrect");

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.05);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf(accounts[0]) == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)), "genesis balance incorrect");
  });
  //Start a stake for 7 days and end it immediately. Verify correct penalties
  it('TestEarlyUnstake7Days', async () => {
      const cereneumInstance = await Cereneum.deployed();

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[3]);
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

      var nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

      await cereneumInstance.testEndStake(0, accounts[3]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = nStakeAmount - Math.floor(nStakeAmount * (0.05/52));
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)));

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.05/52);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf(accounts[0]) == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)));
  });
  //Start a stake for 5 years and end it immediately. Verify correct penalties
  it('TestEarlyUnstake5Years', async () => {
      const cereneumInstance = await Cereneum.deployed();

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[3]);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 365*5, 1, accounts[3]);
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

      var nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

      //Stake should now have completed
      await cereneumInstance.testEndStake(0, accounts[3]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Penalty for early unstake is 5% of principal per year
      var nStakeAmountAfterEarlyPenalty = Math.floor(nStakeAmount * (0.75));
      assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake,10) + parseInt(nStakeAmountAfterEarlyPenalty, 10)));

      var nPenaltyAmount = Math.floor(nStakeAmount * 0.25);
      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf(accounts[0]) == (parseInt(nGenesisAddressBalance,10) + Math.floor(nPenaltyAmount/2)));
  });
  //Start a stake one hour before the next daily update and then end it shortly after
  //Verify that staker gets no payout for not staking at least 24 hours
  it('TestEarlyUnstakeLessThanOneDay', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);

      //Move time back 23 hours
      await cereneumInstance.testAdjustContractLaunchTimeHours(23);

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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

      var nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

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

      var nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

      await cereneumInstance.testEndStake(0, accounts[1]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      //Account1 balance should be the same as it was before the stake started
      assert(parseInt(nBalanceAfterEndStake, 10) == parseInt(nBalanceAfterClaim, 10), "Balance after end stake incorrect");

      //Verify genesis address got half of the penalty for early unstake
      assert(await cereneumInstance.balanceOf(accounts[0]) == (parseInt(nGenesisAddressBalance,10) + Math.floor(nEarlyPenalty/2)));
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 2 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test2YearStakeNoOtherClaim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*2, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    var nPayout = await cereneumInstance.CalculatePayout(
      nBalanceAfterClaim*1.4, //100% bonus for 5 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.10);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10)+1 == Math.floor((parseInt(nPayout,10))*.60), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 3 years, getting bonus stake shares
  //Account2 will stake for 1 year getting less bonus stake shares than account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test3YearStakeNoOtherClaim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*3, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    var nPayout = await cereneumInstance.CalculatePayout(
      nBalanceAfterClaim*1.6, //60% bonus for 3 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.10);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10)+1 == Math.floor((parseInt(nPayout,10))*.65), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with no other parties claiming (high unclaimed redistribution amount)
  //Account1 will stake for 4 years, getting bonus stake shares
  //Account2 will stake for 1 year getting less bonus stake shares than account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test4YearStakeNoOtherClaim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*4, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);

    for(var p=0; p<12; ++p)
    {
      await cereneumInstance.testAdjustContractLaunchTime(30);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
    }

    await cereneumInstance.testAdjustContractLaunchTime(5);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
    await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

    var nPayout = await cereneumInstance.CalculatePayout(
      nBalanceAfterClaim*1.8, //80% bonus for 4 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.10);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.70), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 2 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test2YearStake9800000Claim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*2, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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
      nBalanceAfterClaim*1.4, //100% bonus for 5 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.10);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 3 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test3YearStake9800000Claim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*3, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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
      nBalanceAfterClaim*1.6, //100% bonus for 5 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.15);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We compare two accounts staking the same amount with a 3rd party claiming all remaining coins
  //and also doing a 5 year stake. Accounts1 and 2 will get close to the minimum possible interest.
  //Account1 will stake for 4 years, getting bonus stake shares
  //Account2 will stake for 1 year getting half of the bonus stake shares of account1
  //Both end their stake after 1 year (account1 is an early unstake)
  //We assert that the balance of account1 should be less than the balance of account2 who remained honest
  it('Test4YearStake9800000Claim', async () => {
    var nSatoshiAmountAtLaunch = 10000000;
    const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
    nSatoshiAmountAtLaunch,
    1000,
    accounts[0]);

    var nClaimAmount = 100000;
    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[1],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

    var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

    await cereneumInstance.testFakeClaim(
          nClaimAmount,
          accounts[2],
          0
        );

    //Verify genesis address got their bonus
    assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

    nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
    assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

    await cereneumInstance.testFakeClaim(
          9800000,
          accounts[3],
          0
        );

    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*4, 1, accounts[1]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
    await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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
      nBalanceAfterClaim*1.8, //100% bonus for 5 year stake`
      await cereneumInstance.getStakeStructLockTime(accounts[2]),
      await cereneumInstance.getStakeStructEndTime(accounts[2])
    );

    var nEarlyPenalty = await cereneumInstance.CalculateEarlyPenalty(
      await cereneumInstance.getStakeStructLockTime(accounts[1]),
      await cereneumInstance.getStakeStructEndTime(accounts[1]),
      nBalanceAfterClaim,
      parseInt(nPayout,10)
    );

    var nMinimumPenalty = Math.floor(nBalanceAfterClaim*.20);

    var bIsMinimumPenalty = true;
    if(nEarlyPenalty != nMinimumPenalty)
    {
      bIsMinimumPenalty = false;
      assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
    }

    await cereneumInstance.testEndStake(0, accounts[1]);
    await cereneumInstance.testEndStakeSafely(0, accounts[2]);

    assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
    assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //We verify that compounding interest every 30 days for a 60 day stake gives the same
  //balance as starting and ending stakes every 30 days. Then verify compounding once
  //gives a higher payout than an identical stake that doesnt compound
  it('TestCompoundInterest', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      var nStakeAmount = 0;
      var nStakePeriods = 60;
      var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
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
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, accounts[2]);
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);
        if(p==1)
          await cereneumInstance.testEndStakeSafely(0, accounts[1]);
        else
          await cereneumInstance.CompoundInterest(0, accounts[1]);
      }

      //Accounts should have equal balance
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == parseInt(await cereneumInstance.balanceOf(accounts[2]),10));

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), nStakePeriods, 1, accounts[2]);

      for(var p=0; p<2; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        if(p==0)  //Only compound interest once on purpose
          await cereneumInstance.CompoundInterest(0, accounts[1]);
      }
      await cereneumInstance.testEndStakeSafely(0, accounts[2]);
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      //Account1 should have higher balance since it compounded interest once
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) > parseInt(await cereneumInstance.balanceOf(accounts[2]),10));
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 1 year
  //stake when they both end after 1 year.
  it('TestEarlyUnstake5YearTo1YearNoSatoshiReward', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]), "genesis address incorrect balance");

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "nBalanceAfterClaim incorrect");

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

      var bIsMinimumPenalty = true;
      if(nEarlyPenalty != nMinimumPenalty)
      {
        bIsMinimumPenalty = false;
        assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
      }

      await cereneumInstance.testEndStake(0, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[2]);

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 2 year
  //stake when they both end after 2 year.
  it('TestEarlyUnstake5YearTo2YearNoSatoshiReward', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*2, 1, accounts[2]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

      await cereneumInstance.testEndStake(0, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[2]);

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 3 year
  //stake when they both end after 3 year.
  it('TestEarlyUnstake5YearTo3YearNoSatoshiReward', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*3, 1, accounts[2]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

      await cereneumInstance.testEndStake(0, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[2]);

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
  });
  //Verify that a 5 year stake (with bonus shares) doesnt get a bigger payout than a 4 year
  //stake when they both end after 4 year.
  it('TestEarlyUnstake5YearTo4YearNoSatoshiReward', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[2],
            0
          );

      //Verify genesis address got their bonus
      assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

      nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == nClaimAmount * 1.20);

      await cereneumInstance.testFakeClaim(
            9800000,
            accounts[3],
            0
          );

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365*4, 1, accounts[2]);
      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

      await cereneumInstance.testEndStake(0, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[2]);

      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    it('TestEarlyUnstake5YearTo1YearWith9800000Unclaimed', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);

        for(var p=0; p<12; ++p)
        {
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
        }

        await cereneumInstance.testAdjustContractLaunchTime(5);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 5, accounts[2]);

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

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith2500000Claim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              2500000,
              accounts[3],
              0
            );

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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
          assert(parseInt(nEarlyPenalty,10)+1 == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith5000000Claim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              5000000,
              accounts[3],
              0
            );

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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
          //Off by one rounding error here
          assert(parseInt(nEarlyPenalty,10) == Math.floor((parseInt(nPayout,10))*.75), "Early Penalty not correct");
        }

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith5500000Claim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              5500000,
              accounts[3],
              0
            );

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith6000000Claim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              6000000,
              accounts[3],
              0
            );

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Verify a 5 year stake with a matching 1 year stake doesn't have a higher
    //balance after 1 year when the 5 year stake unstaked early
    //A 3rd account claims a large portion of tokens
    it('TestEarlyUnstake5YearTo1YearWith7500000Claim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]), "genesis address bonus incorrect");

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20, "Balance with speed bonus after claim incorrect");

        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .40) == await cereneumInstance.balanceOf(accounts[0]));

        nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        await cereneumInstance.testFakeClaim(
              7500000,
              accounts[3],
              0
            );

        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365*5, 1, accounts[1]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 365, 1, accounts[2]);
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[3]), 365*5, 1, accounts[3]);

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

        await cereneumInstance.testEndStake(0, accounts[1]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nBalanceAfterClaim,10) + parseInt(nPayout,10) - parseInt(nEarlyPenalty,10)), "Balance 1 incorrect");
        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) < parseInt(await cereneumInstance.balanceOf(accounts[2]),10), "Balance 1 greater than balance 2");
    });
    //Basic test for payouts when there is only one claim for the first year
    it('TestCalculatePayoutOneClaim', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        //Stake 10000 coins for 7 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(10000, nStakePeriods, 1, accounts[1]);
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
        await cereneumInstance.testEndStakeSafely(0, accounts[1]);
        var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

        assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
          parseInt(nPayout, 10)));

        //10000000 - 100000 = 9900000
        //9900000/350 = 28285.71 (gets floored)
        //28285 * 350 = 9899750
        //9900000 - 9899750 = 250
        assert(250 == await cereneumInstance.balanceOf(cereneumInstance.address), "Contract balance incorrect");
    });
    //Basic test for payouts where there are only two claims in the first year
    it('TestCalculatePayoutTwoClaims', async () => {
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Stake 10000 coins for 7 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(10000, nStakePeriods, 1, accounts[1]);
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

        await cereneumInstance.StartStake(10000, nStakePeriods, 1, accounts[2]);

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
        await cereneumInstance.testEndStakeSafely(0, accounts[1]);
        var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

        assert(nBalanceAfterEndStake == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
          parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

        await cereneumInstance.testEndStakeSafely(0, accounts[2]);
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
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Stake 10000 coins for 365 days
        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
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
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, accounts[2]);
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testEndStakeSafely(0, accounts[2]);
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, accounts[2]);
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        await cereneumInstance.testEndStakeSafely(0, accounts[1]);

        assert(await cereneumInstance.balanceOf(accounts[1]) < await cereneumInstance.balanceOf(accounts[2]));

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
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
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
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, accounts[2]);
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testEndStakeSafely(0, accounts[2]);
          await cereneumInstance.CompoundInterest(0, accounts[1]);
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, accounts[2]);
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        await cereneumInstance.testEndStakeSafely(0, accounts[1]);

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
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

        var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
        assert(nBalanceAfterClaim == nClaimAmount * 1.20);

        nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[2],
              0
            );

        //Advance contract 365 days to get past claims period
        for(t=0; t<12; ++t)
          await cereneumInstance.testAdjustContractLaunchTime(30);

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
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
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, accounts[2]);
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.CompoundInterest(0, accounts[1]);
          await cereneumInstance.testEndStakeSafely(0, accounts[2]);
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, accounts[2]);
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        await cereneumInstance.testEndStakeSafely(0, accounts[1]);

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
        var nSatoshiAmountAtLaunch = 10000000;
        const cereneumInstance = await Cereneum.new(
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
          "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

        var nClaimAmount = 100000;
        await cereneumInstance.testFakeClaim(
              nClaimAmount,
              accounts[1],
              0
            );

        //Verify genesis address got their bonus
        assert(Math.floor(nClaimAmount * .20) == await cereneumInstance.balanceOf(accounts[0]));

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

        //Advance contract 365 days to get past claims period
        for(t=0; t<12; ++t)
          await cereneumInstance.testAdjustContractLaunchTime(30);

        //Have 3rd account soak up most of the rewards
        await cereneumInstance.StartStake(nClaimAmount, 365, 1, accounts[3]);

        var nStakeAmount = 0;
        var nStakePeriods = 365;
        var stakeReceipt = await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), nStakePeriods, 1, accounts[1]);
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
          await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 30, 1, accounts[2]);
          await cereneumInstance.testAdjustContractLaunchTime(30);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
          await cereneumInstance.testAdjustStakeTime(0, 30, accounts[2]);
          await cereneumInstance.testEndStakeSafely(0, accounts[2]);
        }

        var nAmt = await cereneumInstance.balanceOf(accounts[2]);
        //console.log("Starting stake of " + nAmt + " for " + 5 + " days on accounts[2].");
        await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[2]), 7, 1, accounts[2]);
        await cereneumInstance.testAdjustContractLaunchTime(7);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[1]);
        await cereneumInstance.testAdjustStakeTime(0, 7, accounts[2]);
        await cereneumInstance.testEndStakeSafely(0, accounts[2]);

        await cereneumInstance.testEndStakeSafely(0, accounts[1]);

        assert(parseInt(await cereneumInstance.balanceOf(accounts[1]), 10) > parseInt(await cereneumInstance.balanceOf(accounts[2]), 10));

        //console.log("accounts[1]: " + await cereneumInstance.balanceOf(accounts[1]));
        //console.log("accounts[2]: " + await cereneumInstance.balanceOf(accounts[2]));
        return;
    });
    //Unit Test for EndStakeForAFriend
    //Account1 will stake for 7 days
    //After 8 days EndStakeForAFriend will be called
    //Then Account 1 ends the stake itself
    it('TestEndStakeForAFriend', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

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
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

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
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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

      var nGenesisAddressBalance = parseInt(await cereneumInstance.balanceOf(accounts[0]), 10);

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

      assert(nExpectedBalance == await cereneumInstance.balanceOf(accounts[0]), "Genesis balance incorrect");

      //90% payout
      nPayout = Math.floor(nPayout * .9);

      //Now we end the stake ourselves
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(nBalanceAfterEndStake-1 == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

      //Verify genesis didnt get paid again after endstake was called
      assert(nExpectedBalance == await cereneumInstance.balanceOf(accounts[0]), "Genesis balance incorrect");
    });
    //Start a stake for 7 days
    //Let 24 days pass (7 days for stake, 7 days for grace period, another 10 days late)
    //Call EndStakeForAFriend
    //Let another 10 days pass
    //Verify 10% late penalty
    //Verify correct payout to genesis
    it('TestEndStakeForAFriendAfterGracePeriodAdditonalDelay', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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

      var nGenesisAddressBalance = parseInt(await cereneumInstance.balanceOf(accounts[0]), 10);

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

      assert(nExpectedBalance == await cereneumInstance.balanceOf(accounts[0]), "Genesis balance incorrect");

      //90% payout
      nPayout = Math.floor(nPayout * .9);

      //Another 10 days
      nAdjustedDays = 10;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeFriendlyTime(0, nAdjustedDays, accounts[1]);

      nGenesisAddressBalance = await cereneumInstance.balanceOf(accounts[0]);

      //Now we end the stake ourselves
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      var nBalanceAfterEndStake = await cereneumInstance.balanceOf(accounts[1]);

      assert(nBalanceAfterEndStake-1 == (parseInt(nBalanceAfterStake, 10) + parseInt(nStakeAmount, 10) +
        parseInt(nPayout, 10)), "nBalanceAfterEndStake incorrect");

      //Verify genesis didnt get paid again after endstake was called
      assert(parseInt(nGenesisAddressBalance,10) == parseInt(await cereneumInstance.balanceOf(accounts[0]),10), "final Genesis balance incorrect");
    });
    it('TestGlobalSharesWithCompoundingInterest', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 10000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10000, 7, 1, accounts[1]);
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


    });
    //We verify that users in the pool and the genesis address will each
    //get 50% of the early unstake penalties
    it('TestEarlyEndStakeRedistribution', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

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

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount*2,10)), "contract balance is incorrect");

      await cereneumInstance.StartStake(10000, 7, 1, accounts[2]);

      var nGenesisAddressStartingBalance = await cereneumInstance.balanceOf(accounts[0]);

      await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      await cereneumInstance.testEndStake(0, accounts[1]);

      await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      await cereneumInstance.testEndStake(0, accounts[1]);

      await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      await cereneumInstance.testEndStake(0, accounts[1]);

      await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      await cereneumInstance.testEndStake(0, accounts[1]);

      var nBalanceAfterEarlyUnstakes = await cereneumInstance.balanceOf(accounts[1]);
      var nUnstakePenalties = 2000; //5% of 10000 should be 500 penalty each time

      assert(parseInt(nBalanceAfterEarlyUnstakes,10) == (parseInt(nBalanceAfterClaim, 10) - parseInt(nUnstakePenalties, 10)), "balance after early unstakes incorrect");

      var nGenesisddressBalanceAfter = await cereneumInstance.balanceOf(accounts[0]);
      assert(parseInt(nGenesisddressBalanceAfter, 10) == (parseInt(nGenesisAddressStartingBalance, 10) + parseInt(nUnstakePenalties,10)/2), "genesis address balance incorrect");

      var nTotalSupply = (parseInt(nSatoshiAmountAtLaunch,10) + parseInt(nClaimAmount*.4,10) + parseInt(nClaimAmount*.4,10));

      var nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += Math.floor((nSatoshiAmountAtLaunch - nClaimAmount*2)/350);
      nPayoutRound += Math.floor(nPayoutRound*nClaimAmount*2/nSatoshiAmountAtLaunch/2);
      nPayoutRound += Math.floor(nPayoutRound*2/1000/2);

      nPayoutRound *= 7;

      var nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[2]);

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[2]),
        await cereneumInstance.getStakeStructLockTime(accounts[2]),
        await cereneumInstance.getStakeStructEndTime(accounts[2])
      );

      await cereneumInstance.testEndStakeSafely(0, accounts[2]);

      var nBalanceAfterStake = await cereneumInstance.balanceOf(accounts[2]);

      //Fix rounding error from lazy math calculations
      assert(parseInt(nBalanceAfterStake,10)-9 == (parseInt(nPayoutRound,10) + parseInt(nUnstakePenalties/2,10) + parseInt(nBalanceAfterClaim,10)), "Balance after stake incorrect");

      //Now start a new stake and make sure penalty rewards arent still being paid out
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[3],
            0
          );

      var nNewBalanceAfterClaim = nClaimAmount*(343/350) + (nClaimAmount*.2*(343/350));

      await cereneumInstance.StartStake(10000, 7, 1, accounts[3]);

      nTotalSupply = await cereneumInstance.totalSupply();

      nPayoutRound = Math.floor(nTotalSupply / 7300);
      nPayoutRound += Math.floor((nSatoshiAmountAtLaunch - nClaimAmount*3)/350);
      nPayoutRound += Math.floor(nPayoutRound*nClaimAmount*3/nSatoshiAmountAtLaunch/2);
      nPayoutRound += Math.floor(nPayoutRound*3/1000/2);
      nPayoutRound *= 7;

      nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[3]);

      await cereneumInstance.testEndStakeSafely(0, accounts[3]);

      var nAccount3AfterEndStake = await cereneumInstance.balanceOf(accounts[3]);

      //Fix rounding error from lazy math
      assert(parseInt(nAccount3AfterEndStake,10)+2 == (parseInt(nPayoutRound,10) + parseInt(nNewBalanceAfterClaim,10)), "nAccount3AfterEndStake incorrect");
    });
    //Account 1 will stake for a year
    //2 years will pass
    //We verify the account has 0 interest payout left
    it('TestVeryLateUnstake', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      await cereneumInstance.StartStake(await cereneumInstance.balanceOf(accounts[1]), 365, 1, accounts[1]);

      for(var p=0; p<24; ++p)
      {
        await cereneumInstance.testAdjustContractLaunchTime(30);
        await cereneumInstance.testAdjustStakeTime(0, 30, accounts[1]);
      }

      await cereneumInstance.testAdjustContractLaunchTime(10);
      await cereneumInstance.testAdjustStakeTime(0, 10, accounts[1]);

      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      //We should have no payout left
      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == nClaimAmount*1.2);
    });
    //We verify account 1 can create and remove 10 simultaneous stakes
    it('TestSimultaneousStakes', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      //12 stakes should be all of our tokens
      for(var j=0; j < 12; ++j)
      {
        await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      }

      var nNumOfStakes = await cereneumInstance.GetNumberOfStakes(accounts[1]);

      assert(nNumOfStakes == 12);

      var stakeInfo = await cereneumInstance.m_staked(accounts[1], 0);
      var sStakeInfo = JSON.stringify(stakeInfo, null, 4);

      assert(await cereneumInstance.balanceOf(accounts[1]) == 0);

      for(var j=0; j < 12; ++j)
      {
        await cereneumInstance.testEndStake(0, accounts[1]);
      }

      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == (parseInt(nClaimAmount*1.2,10) - parseInt(12*500,10)));

      for(var j=0; j < 10; ++j)
      {
        await cereneumInstance.StartStake(10000, 365, 1, accounts[1]);
      }

      await cereneumInstance.testEndStake(9, accounts[1]);
      await cereneumInstance.testEndStake(8, accounts[1]);
      await cereneumInstance.testEndStake(4, accounts[1]);
      await cereneumInstance.testEndStake(6, accounts[1]);
      await cereneumInstance.testEndStake(1, accounts[1]);
      await cereneumInstance.testEndStake(4, accounts[1]);
      await cereneumInstance.testEndStake(3, accounts[1]);
      await cereneumInstance.testEndStake(2, accounts[1]);
      await cereneumInstance.testEndStake(1, accounts[1]);
      await cereneumInstance.testEndStake(0, accounts[1]);

      assert(parseInt(await cereneumInstance.balanceOf(accounts[1]),10) == (parseInt(nClaimAmount*1.2,10) - parseInt(12*500,10) - parseInt(10*500,10)));

      for(var j=1; j <= 10; ++j)
      {
        await cereneumInstance.StartStake(10000, 7*j, 1, accounts[1]);
      }

      nAdjustedDays = 7;
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, nAdjustedDays, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      //9 got moved to 0
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(1, 14, accounts[1]);
      await cereneumInstance.testEndStakeSafely(1, accounts[1]);

      //8 got moved to 1
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(2, 21, accounts[1]);
      await cereneumInstance.testEndStakeSafely(2, accounts[1]);

      //7 got moved to 2
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(3, 28, accounts[1]);
      await cereneumInstance.testEndStakeSafely(3, accounts[1]);

      //6 got moved to 3
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(4, 35, accounts[1]);
      await cereneumInstance.testEndStakeSafely(4, accounts[1]);

      //5 got moved to 4
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(4, 42, accounts[1]);
      await cereneumInstance.testEndStakeSafely(4, accounts[1]);

      //6 is at 3 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(3, 49, accounts[1]);
      await cereneumInstance.testEndStakeSafely(3, accounts[1]);

      //7 is at 2 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(2, 56, accounts[1]);
      await cereneumInstance.testEndStakeSafely(2, accounts[1]);

      //8 is at 1 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(1, 63, accounts[1]);
      await cereneumInstance.testEndStakeSafely(1, accounts[1]);

      //9 is at 0 now
      await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
      await cereneumInstance.testAdjustStakeTime(0, 70, accounts[1]);
      await cereneumInstance.testEndStakeSafely(0, accounts[1]);

      assert(await cereneumInstance.GetNumberOfStakes(accounts[1]) == 0);
    });
    //Verify a contract with no claims still works
    it('TestContractWithNoClaims', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nAdjustedDays = 7;
      for(var j=0; j < 100; ++j)
        await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
    });
    //Verify a contract with 1 claim still works
    it('TestContractWithOneClaim', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 100000;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      var nAdjustedDays = 7;
      for(var j=0; j < 100; ++j)
        await cereneumInstance.testAdjustContractLaunchTime(nAdjustedDays);
    });
    //Test a single stake for 5 years.
    //Verify the contract wallet isn't a fractional reserve due to any bugs
    it('Test5YearStake', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
      nSatoshiAmountAtLaunch,
      1000,
      accounts[0]);

      var nClaimAmount = 10;
      await cereneumInstance.testFakeClaim(
            nClaimAmount,
            accounts[1],
            0
          );

      assert(await cereneumInstance.balanceOf(cereneumInstance.address) == (parseInt(nSatoshiAmountAtLaunch,10) - parseInt(nClaimAmount,10)));

      var nBalanceAfterClaim = await cereneumInstance.balanceOf(accounts[1]);
      assert(nBalanceAfterClaim == Math.floor(Math.floor(nClaimAmount*1.2)));

      var stakeReceipt = await cereneumInstance.StartStake(10, 365*5, 1, accounts[1]);
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

      var nPayout = await cereneumInstance.CalculatePayout(
        await cereneumInstance.getStakeStructShares(accounts[1]),
        await cereneumInstance.getStakeStructLockTime(accounts[1]),
        await cereneumInstance.getStakeStructEndTime(accounts[1])
      );

      await cereneumInstance.testEndStakeSafely(0, accounts[1]);
      assert(await cereneumInstance.balanceOf(accounts[1]) == (parseInt(nPayout,10) + parseInt(nBalanceAfterClaim, 10)))
      assert(await cereneumInstance.balanceOf(cereneumInstance.address) >= 0);
      assert(await cereneumInstance.balanceOf(cereneumInstance.address) < 500);  //Contract balance should be very low
    });
    //The following Unit Tests will all fail on purpose
    /*it('FAILClaimAfter50Weeks', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

      //Advance contract time 50 weeks
      await cereneumInstance.testAdjustContractLaunchTime(120);
      await cereneumInstance.testAdjustContractLaunchTime(120);
      await cereneumInstance.testAdjustContractLaunchTime(110);

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
    it('FAILStakeFor6Days', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

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

      await cereneumInstance.StartStake(10, 6, 1, "0xE658D355303e96425c38FB4778a3E8a56F582Eb0");
    });
    it('FAILStakeEmptyAccount', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

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

      await cereneumInstance.StartStake(10, 7, 1, accounts[1]);
    });
    it('FAILStakeOver5Years', async () => {
      var nSatoshiAmountAtLaunch = 10000000;
      const cereneumInstance = await Cereneum.new(
        "0x0c532d4403e2a9644626ec987849f89df97807b07badf54f360a538700c872fd",
        "0x3d0e9344f87244f6978f3b052c26d062610859e4563a57d07635e70b2177f149",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        "0x64b079b295aa002cf67475c9a370e1d0037ce0ce09e2bfe7b675fe9bf6d1c8c4",
        nSatoshiAmountAtLaunch,
        1000,
        accounts[0]);

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

      await cereneumInstance.StartStake(10, 1+(365*5), 1, "0xE658D355303e96425c38FB4778a3E8a56F582Eb0");
    });*/
});
