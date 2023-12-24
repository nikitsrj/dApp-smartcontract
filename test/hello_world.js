const helloworld = artifacts.require("HelloWorld");
contract("HelloWorld", (accounts) => {

// Test to check if the default value is set to Hello World!
    it("Should be Hello, World!", async () => {
      const helloWorldInstance = await helloworld.deployed();
      const message = await helloWorldInstance.message.call({from: accounts[0]});
  
      assert.equal(message, "Hello, World!","Incorrect message.");
    });

// Test to check whether the message save after the transaction
    it("Should display new message", async () => {
    const helloWorldInstance = await helloworld.deployed();
    const updated = await helloWorldInstance.updateMessage.sendTransaction('Hello Nikit', {from: accounts[0]});
    const message = await helloWorldInstance.message.call({from: accounts[0]});

    assert.equal(message, "Hello Nikit","Incorrect message.");
    });
});