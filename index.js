var Web3 = require('web3');
var BigNumber = require('bignumber.js');

/**
 * 方法
 */
class mm_contract {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		/**
		 * 配置参数
		 * @property {String} chain 区块链类型，默认eth
		 * @property {String} host 连接地址
		 * @property {String} contract_address 合约地址
		 * @property {String} account_address 默认账户地址
		 * @property {Number} gasLimit 手续费上限
		 * @property {Number} chain_accuracy 主链计算精度，默认以太坊18位小数 1 ether = 10^16 wei
		 * @property {Number} token_accuracy 代币计算精度，默认18位小数
		 */
		this.config = Object.assign({
			chain: "eth",
			host: "http://localhost:8545",
			chainId: 128,
			contract_address: "",
			account_address: "",
			gasLimit: 0,
			chain_accuracy: 18,
			token_accuracy: 18,
			gas: 0,
			gas_add: 20000,
			abi: []
		}, config);

		/**
		 * 默认账户，当前使用的账户地址
		 */
		this.default_address = "";

		/**
		 * 当前账户余额
		 */
		this.balance = 0;

		/**
		 * 以太坊web3.eth
		 */
		this.web3 = null;

		/**
		 * 合约
		 */
		this.contract = {};

		/**
		 * 方法集合
		 */
		this.methods = {};
	}
}

/**
 * 初始化
 */
mm_contract.prototype.init = function() {
	var {
		chain,
		host,
		abi,
		account_address,
		contract_address
	} = this.config;
	var web3;
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.HttpProvider(host));
		web3.eth.defaultAccount = account_address;
	}
	console.log(web3.eth.defaultAccount)
	this.web3 = web3;
	if (abi.length) {
		this.contract = new this.web3.eth.Contract(abi, contract_address);
		Object.assign(this.methods, this.contract.methods);
	}
	return this.web3;
};

/**
 * 呼叫
 * @param {String} method 方法
 * @param {Object} param 参数
 * @return {Object} 返回查询结果
 */
mm_contract.prototype.call = async function(method, ...param) {
	var ret;
	if (this.contract) {
		if (this.contract.methods[method]) {
			var {
				account_address,
				gasLimit
			} = this.config;
			ret = await this.contract.methods[method](...param).call({
				from: account_address,
				gasLimit
			});
		} else {
			console.error(method + "方法不存在！");
		}
	}
	return ret;
};

/**
 * 推送
 * @param {String} method 方法
 * @param {Object} param 参数
 * @return {Object} 返回推送结果
 */
mm_contract.prototype.send = async function(method, ...param) {
	var ret;
	if (this.contract) {
		if (this.contract.methods[method]) {
			var {
				account_address,
				gasLimit
			} = this.config;
			ret = await this.contract.methods[method](...param).send({
				from: account_address,
				gasLimit
			});
		} else {
			console.error(method + "方法不存在！");
		}
	}
	return ret;
};

/**
 * 获取以太网上的账户
 * @return {Array} 账户数组
 */
mm_contract.prototype.get_account = async function() {
	this.default_address = this.web3.eth.defaultAccount;
	return this.default_address;
};

/**
 * 获取以太网上的账户
 * @return {Array} 账户数组
 */
mm_contract.prototype.get_accounts = async function() {
	var accounts = await this.web3.eth.getAccounts();
	if (accounts.length) {
		this.web3.eth.defaultAccount = accounts[0];
		this.default_address = this.web3.eth.defaultAccount;
	}
	return accounts;
};

/**
 * 获取指定账户余额
 * @param {String} address 账户地址
 * @return {Number} 余额
 */
mm_contract.prototype.get_balance = async function(address) {
	var {
		chain_accuracy
	} = this.config;
	var y = Math.pow(10, chain_accuracy);
	
	if (!this.default_address) {
		await this.get_accounts();
	}
	
	if (!address) {
		address = this.default_address;
	}
	// 查询余额
	var num_str = await this.web3.eth.getBalance(address);
	// 转为大数字类型
	var num_b = new BigNumber(num_str);
	// 除以小数位
	var balance = num_b.div(y).toNumber();
	// 保存余额
	this.balance = balance;
	return balance;
};

/**
 * 转为16进制字符串
 * @param {Object} data 要转换的值
 * @return {String} 16进制字符串
 */
mm_contract.prototype.toHex = function(data) {
	return this.web3.utils.toHex(data);
};

/**
 * 将16进制字符串转回对象
 * @param {String} str 要转换的值
 * @return {Object} 对象
 */
mm_contract.prototype.toObj = function(str) {
	return this.web3.utils.hexToUtf8(str);
};

/**
 * 转为哈希字符串
 * @param {String} str 要转换的值
 * @return {String} 哈希字符串
 */
mm_contract.prototype.toHash = function(str) {
	return this.web3.utils.sha3(str);
};

module.exports = mm_contract;
