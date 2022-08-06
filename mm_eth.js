require("mm_logs");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");

var pdr;

class MM_eth {
	constructor(config) {
		this.config = Object.assign({
			defaultAccount: '0xF4Df46425a6689e170E2D6306aa5389A42ae1062',
			chainId: 97,
			chainName: "BSC",
			symbol: "BNB",
			decimals: 18,
			gas: 0,
			gas_add: 100000,
			coin: {
			  address: "0x226d4E1eA7f203d1908bae3D4D65CbAaa4f7aB94",
			  name: "CDTC",
			  symbol: "CDTC",
			  image: null,
			  decimals: 18
			},
			precision: Math.pow(10, 18),
			rpc: {
				// 以太坊 Ethereum 主网络
				"1": "https://mainnet.infura.io/v3/dff1613e70d445b8bf5dcd060ac9a9eb",
				// Ropsten 测试网络
				"3": "https://ropsten.infura.io/v3/dff1613e70d445b8bf5dcd060ac9a9eb",
				// Kovan 测试网络
				"42": "https://kovan.infura.io/v3/dff1613e70d445b8bf5dcd060ac9a9eb",
				// BSC币安智能链
				"38": "https://bsc-dataseed.binance.org/",
				// BSC币安智能链
				"56": "https://bsc-dataseed.binance.org/",
				// BSC币安智能链
				"97": "https://bsc.elins.cn/",
				// Heco链
				"128": "https://http-mainnet.hecochain.com",
				// 本地测试链
				"545": "http://localhost:8545"
				// ...
			}
		}, config);

		/**
		 * 事件集合
		 */
		this.list_event = {};
		
		this.list_count = 0;

		/**
		 * 地址
		 */
		this.address = "";

		/**
		 * 当前账户余额
		 */
		this.balance = 0;
	}
}

/**
 * 新建驱动
 */
MM_eth.prototype.new_provider = function() {
	var host = this.config.rpc[this.config.chainId];
	// 使用web3来进行区块链接口的调用
	var web3 = new Web3();
	web3.setProvider(new Web3.providers.HttpProvider(host));
	web3.eth.defaultAccount = this.config.defaultAccount;
	return web3;
};

/**
 * 登录
 * @param {String} way 登录
 * @return {String} 地址
 */
MM_eth.prototype.login = async function(way) {
	if (!pdr) {
		var provider = this.new_provider();
		pdr = provider;
	}
	this.web3 = pdr;
	if (!this.web3.toBigNumber) {
		this.web3.toBigNumber = function(val) {
			return new BigNumber(val);
		}
	}

	if (!this.address) {
		var accounts = await this.web3.eth.accounts;
		this.address = accounts[0] || this.config.defaultAccount;
	}
	return this.address;
}

/**
 * 构建连接
 * @param {Object} Type
 */
MM_eth.prototype.link = async function(type) {
  var dict = this[type];
  var abi = this.config[type + "_abi"];
  for (var k in dict) {
    var o = dict[k];
    o.contract = new this.web3.eth.Contract(abi, o.address + "");
  }
};

/**
 * 初始化
 */
MM_eth.prototype.init_abi = async function() {
	for (var k in this.config) {
		if (k.indexOf("_abi") !== -1) {
			await this.link(k.replace("_abi", ""));
		}
	}
}

/**
 * 初始化
 * @param {String} way 登录方式
 * @return {String} 返回地址
 */
MM_eth.prototype.init = async function(way) {
	await this.login(way);
	await this.init_abi();
	return this.web3;
};

/**
 * 发送
 * @param {String} type 类型
 * @param {String} name 登录方式
 * @param {String} method ABI方法
 * @param {Number} value 数值
 * @param {Array} param 参数集合
 * @return {String}  返回地址
 */
MM_eth.prototype.send = async function(type, name, method, value, ...param) {
	console.log("send req", type, name, method, value, ...param);
	try {
		var res = await this[type][name].contract.methods[method](...param).send({
			from: this.address,
			gasLimit: this.config.gas,
			value: value
		});
		console.log("send res", type, name, method, res);
	} catch (err) {
		console.error(method, err);
	}
	console.log("send res", name, method, res);
	return res;
};

/**
 * 查询
 * @param {String} name 登录方式
 * @param {String} method ABI方法
 * @param {Number} value 数值
 * @param {Array} param 参数集合
 * @return {String} 返回地址
 */
MM_eth.prototype.call = async function(type, name, method, value, ...param) {
	if (!this.address) {
		await this.init();
	}
	console.log("call req", type, name, method, ...param);
	try {
		var res = await this[type][name].contract.methods[method](...param).call({
			from: this.address
		});
	} catch (err) {
		console.error(method, err);
	}
	// console.log("call res", name, method, res);
	return res;
};


/**
 * 事件管理器
 * @param {String} name 事件名称
 * @param {String} accounts 账号组
 * @param {Number} chainId 区块链频道
 */
MM_eth.prototype.event_after = function(name, accounts, chainId) {
	// console.log(name);
};

/**
 * 事件管理器
 * @param {String} name 事件名称
 * @param {String} accounts 账号组
 * @param {Number} chainId 区块链频道
 */
MM_eth.prototype.event = function(name, accounts, chainId) {
  console.log("event:", name, accounts, chainId);
  if (accounts && accounts.length) {
    this.address = pdr.selectedAddress || accounts[0];
  }
  if (!chainId) {
    this.chainId = chainId;
  } else if (!this.chainId) {
    this.chainId = this.chainId || this.config.chainId;
  }
  switch (name) {
    case "session_update":
    case "connect":
    case "connected":
    case "accountsChanged":
      if (this.address && pdr.isConnected && pdr.isConnected()) {
        this.is_connected = pdr.isConnected();
      } else {
        this.is_connected = false;
      }
      break;
    case "disconnect":
      this.is_connected = false;
      this.address = "";
      this.balance = 0;
      break;
    case "chainChanged":
      if (this.address && pdr.isConnected && pdr.isConnected()) {
        this.is_connected = pdr.isConnected();
      } else {
        this.is_connected = false;
      }
      break;
  }

  var list = this.list_event;
  for (var k in list) {
    var o = list[k];
    try {
      o(name, this.address, this.chainId);
    } catch (e) {
      console.log(e);
    }
  }
  this.event_after(name, accounts, this.chainId);
};

/**
 * 执行供应器
 * @param {Object} provider
 */
MM_eth.prototype.subscribe_event = function(provider) {
	if (!provider) {
		return;
	}
	// Subscribe to accounts change
	provider.on("accountsChanged", (accounts) => {
		this.event("accountsChanged", accounts)
	});

	// Subscribe to chainId change
	provider.on("chainChanged", (chainId) => {
		this.event("chainChanged", null, this.toChage_10(chainId, 1))
	});

	/**
	 * 发起交易的时候会触发这个事件
	 */
	provider.on("session_update", async (error, payload) => {
		if (error) {
			throw error;
		}
		const {
			chainId,
			accounts
		} = payload.params[0];
		this.event("session_update", accounts, this.toChage_10(chainId, 1));
	});

	/**
	 * 连接时
	 */
	provider.on("connect", (error, payload) => {
		if (error) {
			throw error;
		}
		const {
			chainId,
			accounts
		} = payload;
		console.log("连接成功");
		console.log(chainId, accounts);
		console.log(Object.keys(payload));
		this.event('connect', accounts, this.toChage_10(chainId, 1));
	});

	/**
	 * 断开连接时
	 */
	provider.on("disconnect", (error, payload) => {
		if (error) {
			throw error;
		}
		this.event('disconnect');
	});
};

/**
 * 转10进制
 * @param {String} num 数值
 * @param {Number} map 精度
 * @return {String} 转换结果
 */
MM_eth.prototype.toChage_10 = function(value, map) {
	if (value) {
		return parseInt(value.replace('0x', ''), 16) / (map || this.config.precision);
	} else {
		return 0;
	}
};

/**
 * 新建合约连接器
 * @param {String} name 名称
 * @param {String} address 合约地址
 * @param {Array} abi ABI方法集合
 * @return {Object} 返回连接后的对象
 */
MM_eth.prototype.new = function(name, abi, address) {
	if (!this[name]) {
		this[name] = new this.web3.eth.Contract(abi, address);
	}
	return this[name];
};

/**
 * 转16进制
 * @param {String} num 数值
 * @param {Number} map 精度
 * @return {String} 转换结果
 */
MM_eth.prototype.toChage_16 = function(num, map) {
	if (typeof(num) === "string") {
		return num;
	}
	return '0x' + (num * (map || this.config.precision)).toString(16);
};

/**
 * 补零
 * @param {String} value 需要补零的字符串
 * @return {String} 补零后的字符串
 */
MM_eth.prototype.full_zore = function(value) {
	var len = 64 - value.length;
	var val = "";

	for (var i = 0; i < len; i++) {
		val += "0";
	}

	return val + value;
};

/**
 * 转为参数
 * @param {String} name 请求方法名称
 * @param {Array} param 请求参数集合
 * @return {Object} 返回参数
 */
MM_eth.prototype.to_param = function(name, ...param) {
	var code = this.methods[name];
	var data = code;
	for (var i = 0; i < param.length; i++) {
		var o = param[i];
		if (typeof(o) == 'string') {
			data += this.full_zore(o.replace('0x', ''));
		} else if (typeof(o) == 'number') {
			data += this.full_zore(this.toChage_16(o, 1).replace('0x', ''));
		}
	}

	return {
		to: this.config.contract_address, // 必需，合同发布期间除外 Required except during contract publications.
		from: this.address, // 发送地址 must match user's active address.
		data: data, // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // 可选，但用于定义智能合约的创建和交互 Optional, but used for defining smart contract creation and interaction.
		// chainId: this.chainId || this.config.chainId, // 用于防止跨区块链的事务重用，由MetaMask自动填充 Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
	};
};

/**
 * 获取 nonce
 */
MM_eth.prototype.get_nonce = async function() {
	var nonce_online = await this.web3.eth.getTransactionCount(this.web3.eth.defaultAccount || this.address);
	var key = "wr_nonce";
	var nonce = this.nonce;
	if (nonce) {
		nonce++;
		if (nonce < nonce_online) {
			nonce = nonce_online;
		}
	} else {
		nonce = nonce_online;
	}
	this.nonce = nonce;
	return nonce;
};

/**
 * 转账
 * @param {String} type 类型
 * @param {String} name 名称
 * @param {String} method 合约方法
 * @param {Number} value 转账数量
 * @param {Array} 合约传参
 * @return {Object} 成功返回转账结果, 否则返回空
 */
MM_eth.prototype.sendS = async function(type, name, method, value, ...param) {
	let address_my = this.web3.eth.defaultAccount || this.address;

	if (!this[type]) {
		console.error("合约类型不正确");
		return
	}
	if (!this[type][name]) {
		console.error("合约不正确");
		return
	}
	if (!this[type][name].contract.methods[method]) {
		console.error("函数不存在！");
		return
	}

	let data = await this[type][name].contract.methods[method](...param).encodeABI();
	var contract_address = this[type][name].address;


	var nonce = await this.get_nonce();

	var rawTx = {
		// from: address_my,
		nonce,
		// eth用 0x14F46B0400, bsc用 0x12A05F200
		gasPrice: "0x12A05F200",
		gasLimit: '0x249F0',
		to: contract_address,
		// 调用receiveEth 给合约转入0.1eth ，如果调用合约方法不给合约转入eth，这个值是0
		value: value ? this.toChage_16(value) : '0x0',
		// 这个数据需要自己拼接，在gitee/gkai/metamask里面有方法(通过encodeABI可以不用自己拼接了)
		data
	};

	// console.info("数据", rawTx);
	var sign_data = await this.web3.eth.accounts.signTransaction(rawTx, this.config.private_key);
	if (!sign_data) {
		console.error("签名失败", rawTx, err);
		return null;
	}
	// console.info("签名", sign_data);
	// $.sleep(1000);
	var tx = null;
	try {
		tx = await this.web3.eth.sendSignedTransaction(sign_data.rawTransaction);
	} catch (err) {
		console.error("链上交易超时", rawTx, err);
	}
	// console.info("广播", tx);
	if (tx) {
		if (!tx.status) {
			this.nonce = 0;
			return null;
		}
	} else {
		this.nonce -= 1
	}

	console.log('send res', name, tx);
	return tx;
};



/** 追加 **/
/**
 * call obj
 * @param {String} name Login Method
 * @param {String} method ABI method
 * @param {Array} keys object prop
 * @param {Array} param parameter set
 * @return {String} return address
 */
MM_eth.prototype.callObj = async function(type, name, method, keys, ...param) {
  console.log("call req", type, name, method, ...param);
  try {
    var res = await this[type][name].contract.methods[method](...param).call({
      from: this.address
    });
  } catch (err) {
    console.error(method, err)
  }
  var arr = res.split('_');
  var obj = {};
  for(var i = 0; i < keys.length; i++){
    obj[keys[i]] = arr.length > i ? arr[i] : 0;
  }
  console.log("call res", name, method, obj);
  return obj;
};

/**
 * call list
 * @param {String} name Login Method
 * @param {String} method ABI method
 * @param {Array} keys object prop
 * @param {Array} param parameter set
 * @return {String} return address
 */
MM_eth.prototype.callList = async function(type, name, method, keys, ...param) {
  console.log("call req", type, name, method, ...param);
  try {
    var res = await this[type][name].contract.methods[method](...param).call({
      from: this.address
    });
  } catch (err) {
    console.error(method, err)
  }
  var list = res.map((o) => {
      var arr = o.split('_');
      var obj = {};
      for(var i = 0; i < keys.length; i++){
        obj[keys[i]] = arr.length > i ? arr[i] : 0;
      }
      return obj
  });
  console.log("call res", name, method, list);
  return list;
};

/**
 * Add event
 * @param {Function} name event name
 * @param {Function} func event method
 * @returns {Funtion} this event function key
 */
MM_eth.prototype.add_event = function(func, name) {
  if (!name) {
    this.list_count++;
    name = this.list_count;
  }
  this.list_event[name] = func;
  return name;
};

/**
 * Delete event
 * @param {Function} name event name
 */
MM_eth.prototype.del_event = function(name) {
  delete this.list_event[name];
};

/**
 * execute provider
 * @param {Object} provider
 */
MM_eth.prototype.subscribe_event = function(provider) {
  if (!provider) {
    return;
  }
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    this.event("accountsChanged", accounts)
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    this.event("chainChanged", null, this.toChage_10(chainId, 1))
  });

  /**
   * This event is fired when a transaction is initiated
   */
  provider.on("session_update", async (error, payload) => {
    if (error) {
      throw error;
    }
    const {
      chainId,
      accounts
    } = payload.params[0];
    this.event("session_update", accounts, this.toChage_10(chainId, 1));
  });

  /**
   * when connected
   */
  provider.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }
    if (!payload) {
      return;
    }
    const {
      chainId,
      accounts
    } = payload;
    this.event('connect', accounts, this.toChage_10(chainId, 1));
  });

  /**
   * when disconnected
   */
  provider.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
    this.event('disconnect');
  });
};

/**
 *  Web3 签名加密
 *  @param {String} content 签名内容
 *  @param {String} address 签名地址
 *  @param {Function} func 回调函数(可选)
 */
MM_eth.prototype.sign = async function(content, address, func) {
  var ret = null;
  if (func) {
    this.web3.eth.sign(content, address, func);
  } else {
    ret = await this.web3.eth.sign(content, address);
  }
  return ret;
}

MM_eth.prototype.get_balance = async function(address) {
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
 * 获取以太网上的账户
 * @return {Array} 账户数组
 */
MM_eth.prototype.get_account = async function() {
	this.default_address = this.web3.eth.defaultAccount;
	return this.default_address;
};

/**
 * 获取以太网上的账户
 * @return {Array} 账户数组
 */
MM_eth.prototype.get_accounts = async function() {
	var accounts = await this.web3.eth.getAccounts();
	if (accounts.length) {
		this.web3.eth.defaultAccount = accounts[0];
		this.default_address = this.web3.eth.defaultAccount;
	}
	return accounts;
};

/**
 * 加载ABI
 * @param {String} path 地址
 * @return {String} 加载成功返回true
 */
MM_eth.prototype.load_abi = function(path){
	
}

module.exports = MM_eth;
