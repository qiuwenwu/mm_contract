"use strict";

function mm_eth(config) {
	this.config = Object.assign({
		// 0x6132808224420bb702e2f6d342f2ac7214818593
		contract_address: "",
		// 0xdCF92d05f4BcdAC8cb3135E0C9FE755C4fA5C64B
		chainId: 3,
		precision: 100000000,
		gas: 0,
		gas_add: 20000
	}, config);

	/**
	 *当前用户的钱包地址
	 */
	this.address = "";
	/**
	 * 当前账户余额
	 */
	this.balance = 0;

	/**
	 * 方法集合
	 */
	this.methods = {};
}

/**
 * 调用事件
 * @param {事件名称} name
 * @param {参数} param
 * @return {Object} 返回执行结果
 */
mm_eth.prototype.event = function(name, param) {
	return null;
};

/**
 * 处理以太函数
 */
mm_eth.prototype.handle_ethereum = function() {
	if (ethereum) {
		ethereum.autoRefreshOnNetworkChange = false;
		if (ethereum.isMetaMask) {
			console.log('ethereum successfully detected!');
		} else {
			console.log('Please install MetaMask!');
		}
		// Access the decentralized web!
	} else {
		console.log('Please install MetaMask!');
	}
};

/**
 * 初始化
 */
mm_eth.prototype.init = function() {
	if (window.ethereum) {
		this.handle_ethereum();
	} else {
		window.addEventListener('ethereum#initialized', () => {
			this.handle_ethereum()
		}, {
			once: true
		});
		// If the event is not dispatched by the end of the timeout,
		// the user probably doesn't have MetaMask installed.
		setTimeout(() => {
			this.handle_ethereum();
		}, 3000); // 3 seconds
	}
};

/**
 * 账户改变时
 * @param {Array} accounts 账户数组
 */
mm_eth.prototype.accountsChanged = function(accounts) {
	if (accounts.length) {
		this.address = accounts[0];
	} else {
		this.address = '';
	}

	this.event('accountsChanged', accounts);
};

/**
 * 字符串转16进制
 * @param {String} str
 * @return {String} 返回16进制值
 */
mm_eth.prototype.toHex = function(str) {
	if (str === "") return "";
	var hexCharCode = [];
	hexCharCode.push("0x");

	for (var i = 0; i < str.length; i++) {
		hexCharCode.push(str.charCodeAt(i).toString(16));
	}

	return hexCharCode.join("");
};

/**
 * 补零
 * @param {String} value 需要补零的字符串
 * @return {String} 补零后的字符串
 */
mm_eth.prototype.full_zore = function(value) {
	var len = 64 - value.length;
	var val = "";

	for (var i = 0; i < len; i++) {
		val += "0";
	}

	return val + value;
};

/**
 * 转16进制
 * @param {String} num 数值
 * @param {Number} map 精度
 * @return {String} 转换结果
 */
mm_eth.prototype.toChage_16 = function(num, map) {
	return '0x' + (num * (map || this.config.precision)).toString(16);
};

/**
 * 转10进制
 * @param {String} num 数值
 * @param {Number} map 精度
 * @return {String} 转换结果
 */
mm_eth.prototype.toChage_10 = function(value, map) {
	return parseInt(value.replace('0x', ''), 16) / (map || this.config.precision);
};

/**
 * 转为参数
 * @param {String} name 请求方法名称
 * @param {Array} param 请求参数集合
 * @return {Object} 返回参数
 */
mm_eth.prototype.to_param = function(name) {
	var code = this.methods[name];
	var data = code;

	for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
		var o = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

		if (typeof o == 'string') {
			data += this.full_zore(o.replace('0x', ''));
		} else if (typeof o == 'number') {
			data += this.full_zore(this.toChage_16(o, 1).replace('0x', ''));
		}
	}

	return {
		to: this.config.contract_address,
		// 必需，合同发布期间除外 Required except during contract publications.
		from: this.address,
		// 发送地址 must match user's active address.
		data: data,
		// '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // 可选，但用于定义智能合约的创建和交互 Optional, but used for defining smart contract creation and interaction.
		chainId: this.config.chainId // 用于防止跨区块链的事务重用，由MetaMask自动填充 Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
	};
};

/**
 * 获取手续费
 */
mm_eth.prototype.get_gas = async function(param) {
	var ret = await ethereum.request({
		method: "eth_estimateGas",
		params: [param]
	});

	if (this.config.gas_add) {
		var fee = this.toChage_10(ret, 1) + this.config.gas_add;
		return this.toChage_16(fee, 1);
	} else {
		return ret;
	}
};

/**
 * 推送 —— 发送到链上
 * @param {String} name 方法名
 * @param {String} value 数值
 * @param {Array} param 参数
 */
mm_eth.prototype.send = async function(name, value) {
	for (var _len = arguments.length, param = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		param[_key - 2] = arguments[_key];
	}

	var pm = this.to_param.apply(this, [name].concat(param));
	var _this$config = this.config,
		gas = _this$config.gas,
		chainId = _this$config.chainId;

	if (gas) {
		pm.gas = this.toChage_16(gas, 1);
	} else if (chainId == 1) {
		pm.gas = await this.get_gas();
	} else {
		pm.gas = this.toChage_16(400000, 1);
	}

	if (value) {
		// 仅需要从初始外部帐户向以太币发送以太币。Only required to send ether to the recipient from the initiating external account.
		pm.value = this.toChage_16(value, 1);
	}
	console.log('call req', pm);
	var res = await this.req('eth_sendTransaction', [pm]);
	console.log('send res', res);
	return this.toChage_10(res, 1);
};


/**
 * 呼叫 —— 接收到本地
 * @param {String} name 方法名
 * @param {String} value 数值
 * @param {Array} param 参数
 */
mm_eth.prototype.call = async function(name, value) {
	for (var _len2 = arguments.length, param = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		param[_key2 - 2] = arguments[_key2];
	}

	var pm = this.to_param.apply(this, [name].concat(param));

	if (value) {
		pm.value = this.toChage_16(value, 1);
	}
	console.log('call req', pm);
	try {
		var res = await this.req('eth_call', [pm]);

		if (res == '0x') {
			res = '0x00';
		}

		return this.toChage_10(res, 1);
	} catch (e) {
		console.log("错误", e);
	}
};

/**
 * 转到合约地址
 * @param {String} form_address 发送地址
 * @param {String} to_address 接收地址
 * @param {Number} amount 转账金额
 * @param {String} value 数值
 * @return {object} 返回执行结果
 */
mm_eth.prototype.trade = async function(form_address, to_address, amount) {
	var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '0x00';

	if (!to_address) {
		to_address = this.config.contract_address;
	}

	var code = "0xa9059cbb";
	var addr = to_address.replace('0x', '');
	var data = code + this.full_zore(addr) + this.full_zore(this.toChage_16(amount).replace('0x', ''));
	var pm = {
		to: to_address || this.config.contract_address,
		// 必需，合同发布期间除外 Required except during contract publications.
		from: form_address,
		// 发送地址 must match user's active address.
		value: value,
		data: data,
		// '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // 可选，但用于定义智能合约的创建和交互 Optional, but used for defining smart contract creation and interaction.
		chainId: this.config.chainId // 用于防止跨区块链的事务重用，由MetaMask自动填充 Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.

	};

	if (this.config.gas) {
		pm.gas = this.toChage_16(this.config.gas, 1);
	} else {
		pm.gas = await this.get_gas();
	}

	if (value) {
		pm.value = value; // 仅需要从初始外部帐户向以太币发送以太币。Only required to send ether to the recipient from the initiating external account.
	}

	console.log('trade req', pm);

	try {
		var res = await this.req('eth_sendTransaction', [pm]);
		return this.toChage_10(res, 1);
	} catch (e) {
		console.log("错误", e);
	}
};

/**
 * 转到合约地址
 * @param {String} name 方法名
 * @param {Array} param 参数
 * @return {}
 */
mm_eth.prototype.get_balance = async function(address) {
	var pm = this.to_param('balance', address);
	pm.from = address;
	var res = await this.req('eth_call', [pm]);
	var balance = 0;

	if (res) {
		balance = this.toChage_10(res.replace('0x', ''));
	}

	this.balance = balance;
	return this.balance;
};

/**
 * 警示
 * @param {String} message 消息内容
 * @param {String} type
 */
mm_eth.prototype.alert = async function(message) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "error";
	console.log(message, type);
};

/**
 * 请求
 * @param {String} method 方法
 * @param {Array} params 参数
 * @param {Funciton} func 回调函数
 * @return {Object} 执行结果
 */
mm_eth.prototype.req = async function() {
	var _this2 = this;

	var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eth_accounts';
	var params = arguments.length > 1 ? arguments[1] : undefined;
	var func = arguments.length > 2 ? arguments[2] : undefined;

	if (!params) {
		params = {};
	}

	if (!params.gas) {
		if (this.config.gas) {
			params.gas = this.toChage_16(this.config.gas, 1);
		} else {
			params.gas = await this.get_gas();
		}
	}

	if (ethereum.request) {
		if (func) {
			ethereum.request({
				method: method,
				params: params
			}).then(function(res) {
				func(res);
			}).catch(function(error) {
				if (error.code === 4001) {
					// EIP-1193 userRejectedRequest error
					_this2.alert('Please connect to MetaMask.');
				} else {
					_this2.alert(error);
				}
			});
		} else {
			return await ethereum.request({
				method: method,
				params: params
			});
		}
	} else {
		if (func) {
			ethereum.send({
				method: method,
				params: params
			}).then(function(res) {
				func(res);
			}).catch(function(error) {
				if (error.code === 4001) {
					// EIP-1193 userRejectedRequest error
					_this2.alert('Please connect to MetaMask.');
				} else {
					_this2.alert(error);
				}
			});
		} else {
			return await ethereum.send({
				method: method,
				params: params
			});
		}
	}
};

/**
 * 获取账户
 */
mm_eth.prototype.get_accounts = async function() {
	return await this.req("eth_requestAccounts");
};

/**
 * 获取地址
 */
mm_eth.prototype.login = async function() {
	var res = await this.req("eth_requestAccounts");

	if (res && res.length) {
		var address = res[0];
		this.address = address;
		return this.address;
	}
};

/**
 * 是否已登录
 * @return {object} 执行结果
 * @return {Boolean} 登录成功返回true, 失败返回false
 */
mm_eth.prototype.isLink = function() {};

/**
 * 获取地址
 */
mm_eth.prototype.get_address = function() {
	var address = ethereum.selectedAddress;

	if (address) {
		this.address = address;
	}

	return this.address;
};

module.exports = mm_eth;
