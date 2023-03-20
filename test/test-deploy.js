const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number zero", async function () {
    const favoriteNumber = await simpleStorage.favoriteNumber();
    const expectedValue = "0";
    assert.equal(favoriteNumber.toString(), expectedValue);
  });

  it("Should update when store function is called", async function () {
    const expectedValue = "100";
    const storeTx = await simpleStorage.store(expectedValue);
    storeTx.wait(2);
    const favoriteNumber = await simpleStorage.favoriteNumber();
    assert.equal(favoriteNumber.toString(), expectedValue);
  });
});
