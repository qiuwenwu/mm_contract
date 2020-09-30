var mm_contract = require('../index.js');

/**
 * 调用合约所需配置
 * @property {String} contract_address 合约地址
 * @property {String} user_address 用户地址
 */
var config = {
	contract_address: "",
	account_address: ""
};

/**
 * 测试方法
 */
async function test(){
	var mm = new mm_contract(config);
	var web3 = mm.init();
	
	// 查询余额
	var balance = await mm.get_balance();
	console.log(balance);
	console.log(web3.utils);
	var hex = web3.utils.toHex({name:12});
	console.log(hex);
	
	var obj = mm.toObj(hex);
	console.log(obj);
	console.log(mm.toHash("123"));
}

test();
