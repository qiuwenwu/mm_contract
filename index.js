var Web3 = require('web3');
var mm_eth = require('./mm_eth.js');
var mm_tron = require('./mm_tron.js');

/**
 * 方法
 */
class mm_contract {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config, type) {
		if (type == "tron") {
			return new mm_tron(config);
		} else {
			return new mm_eth(config);
		}
	}
}

module.exports = mm_contract;
