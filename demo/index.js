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
	console.log('当前余额', balance);
	var hex = mm.toHex({name:12});
	console.log('对象转哈希', hex);
	
	var obj = mm.toObj(hex);
	console.log('哈希转对象', obj);
	console.log(mm.toHash("666"));
}

test();
