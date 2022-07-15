module.exports = [{
	"inputs": [{
		"internalType": "address",
		"name": "_admin",
		"type": "address"
	}],
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "approved",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "Approval",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "bool",
			"name": "approved",
			"type": "bool"
		}
	],
	"name": "ApprovalForAll",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "Transfer",
	"type": "event"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "_ownerOf",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "_tokenInfoOf",
	"outputs": [{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "grade",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "bTokenAmount",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "efficiency",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "mintTime",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "wuxing",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "power",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "admin",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"name": "auth",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "_admin",
		"type": "address"
	}],
	"name": "setAdmin",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "_account",
			"type": "address"
		},
		{
			"internalType": "bool",
			"name": "_authState",
			"type": "bool"
		}
	],
	"name": "setAuth",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "name",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "symbol",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "totalSupply",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "currentTokenId",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "_owner",
		"type": "address"
	}],
	"name": "getTokenIdsOf",
	"outputs": [{
		"internalType": "uint256[]",
		"name": "ids",
		"type": "uint256[]"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "_owner",
		"type": "address"
	}],
	"name": "getNFTsOf",
	"outputs": [{
		"components": [{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "grade",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bTokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "efficiency",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wuxing",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "power",
				"type": "uint256"
			}
		],
		"internalType": "struct ERC721.TokenInfo[]",
		"name": "nfts",
		"type": "tuple[]"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "_tokenId",
		"type": "uint256"
	}],
	"name": "getPowerInfo",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "_tokenId",
		"type": "uint256"
	}],
	"name": "getTokenInfo",
	"outputs": [{
		"components": [{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "grade",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bTokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "efficiency",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wuxing",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "power",
				"type": "uint256"
			}
		],
		"internalType": "struct ERC721.TokenInfo",
		"name": "",
		"type": "tuple"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "_to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "_tokenId",
			"type": "uint256"
		},
		{
			"components": [{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "grade",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "bTokenAmount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "efficiency",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "mintTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "wuxing",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "power",
					"type": "uint256"
				}
			],
			"internalType": "struct ERC721.TokenInfo",
			"name": "_tokenInfo",
			"type": "tuple"
		}
	],
	"name": "mintOnlyBy",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "_tokenId",
		"type": "uint256"
	}],
	"name": "burnOnlyBy",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}],
	"name": "balanceOf",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}],
	"name": "ownerOf",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "approve",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}],
	"name": "getApproved",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "bool",
			"name": "approved",
			"type": "bool"
		}
	],
	"name": "setApprovalForAll",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		}
	],
	"name": "isApprovedForAll",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "transferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		}
	],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}]
