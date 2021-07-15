var mm_contract = require('../index.js');
// var abi = require('./nft-abi.js');
var abi = require('./test_abi.js');

/**
 * 调用合约所需配置
 * @property {String} contract_address 合约地址
 * @property {String} user_address 用户地址
 */
var config = {
	// chain: "HT",
	contract_address: "0xfe25A97B5E3257e6e7164Ede813C3d4FBb1C2e3b",
	account_address: "0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1",
	host: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
	chainId: 3,
	abi
};

/**
 * 测试方法
 */
async function test() {
	var mm = new mm_contract(config);
	var web3 = mm.init();

	// var contract = new web3.eth.Contract(abi, config.contract_address);
	// var ret = await contract.methods.getNFTsOf("0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1").call();
	// console.log(ret);

	// var ret = await mm.call("getNFTsOf", "0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1");
	// console.log(ret);
	var balance = await mm.get_balance("0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1");
	console.log(balance);

	var balance = await mm.call("balanceOf", "0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1");
	console.log(balance);

	// var ret_post = await mm.send("approve", "0xfe25A97B5E3257e6e7164Ede813C3d4FBb1C2e3b", 1000000000000000);
	// console.log(ret_post);
	// console.log(contract.methods.balanceOf("0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1").call());
	// var chain = contract.at(config.contract_address);
	// console.log(chain);
	// var account_one = web3.eth.accounts[0];
	// console.log(account_one);
	// var balance = await contract.methods.balanceOf("0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1").call({
	// 	from: "0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1"
	// });
	// console.log(balance);
	// var nft_info = await contract.methods.getNFTsOf("0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1").call({
	// 	from: "0x87e73A055000F0D1B8c47A8A9a0431245e3Baaa1"
	// });
	// console.log(nft_info);

	// // 查询余额
	// var balance = await mm.get_balance();
	// console.log('当前余额', balance);
	// var hex = mm.toHex({name:12});
	// console.log('对象转哈希', hex);

	// var obj = mm.toObj(hex);
	// console.log('哈希转对象', obj);
	// console.log(mm.toHash("666"));
}

test();
