var mm_contract = require('../index.js');

/**
 * 调用合约所需配置
 * @property {String} contract_address 合约地址
 * @property {String} user_address 用户地址
 */
var config = {
	account_address: "0x404f94B549A7538dd403986FBd2C92a8Cff122Bf",
	chainId: 97,
	chainName: "BSC"
};

/**
 * 测试方法
 */
async function test() {
	var ct = new mm_contract(config);
	var web3 = ct.init();
	
	ct.nft = {
		"TEST": {
			address: "0xe7b4856fE12B4f008a6a347c33a14E9564a051B2"
		}
	}
	
	// var contract = new web3.eth.Contract(abi, config.contract_address);
	// var ret = await contract.methods.getNFTsOf("0x404f94B549A7538dd403986FBd2C92a8Cff122Bf").call();
	// console.log(ret);
	
	var ret = await ct.call("nft", "TEST", "getNFTsOf", "0x404f94B549A7538dd403986FBd2C92a8Cff122Bf");
	console.log(ret);
	// var balance = await ct.get_balance("0x404f94B549A7538dd403986FBd2C92a8Cff122Bf");
	// console.log(balance);
	
	// var ret_post = await ct.send("nft", "TEST", "approve", "0xe7b4856fE12B4f008a6a347c33a14E9564a051B2", 1000000000000000);
	// console.log(ret_post);
	// console.log(contract.methods.balanceOf("0x404f94B549A7538dd403986FBd2C92a8Cff122Bf").call());
	// var chain = contract.at(config.contract_address);
	// console.log(chain);
	// var account_one = web3.eth.accounts[0];
	// console.log(account_one);
	// var balance = await contract.methods.balanceOf("0x404f94B549A7538dd403986FBd2C92a8Cff122Bf").call({
	// 	from: "0x404f94B549A7538dd403986FBd2C92a8Cff122Bf"
	// });
	// console.log(balance);
	// var nft_info = await contract.methods.getNFTsOf("0x404f94B549A7538dd403986FBd2C92a8Cff122Bf").call({
	// 	from: "0x404f94B549A7538dd403986FBd2C92a8Cff122Bf"
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
