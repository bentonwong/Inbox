const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one of those accounts to deloy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });
  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
});
