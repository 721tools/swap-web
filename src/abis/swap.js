const swapAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_marketRegistry',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_converter',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    inputs: [],
    name: 'GOV',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        internalType: 'struct J721Tools.Call[]',
        name: 'calls',
        type: 'tuple[]'
      }
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'baseFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'tokenAddrs',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct J721Tools.ERC20Details',
        name: 'erc20Details',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'tradeData',
            type: 'bytes'
          }
        ],
        internalType: 'struct MarketRegistry.TradeDetails[]',
        name: 'tradeDetails',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'conversionData',
            type: 'bytes'
          }
        ],
        internalType: 'struct J721Tools.ConverstionDetails[]',
        name: 'converstionDetails',
        type: 'tuple[]'
      },
      {
        internalType: 'address[]',
        name: 'dustTokens',
        type: 'address[]'
      }
    ],
    name: 'batchBuyWithERC20s',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'tradeData',
            type: 'bytes'
          }
        ],
        internalType: 'struct MarketRegistry.TradeDetails[]',
        name: 'tradeDetails',
        type: 'tuple[]'
      }
    ],
    name: 'batchBuyWithETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'nonce',
            type: 'uint8'
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'amount',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'salt',
            type: 'string'
          }
        ],
        internalType: 'struct J721Tools.OfferOrder',
        name: 'offerOrder',
        type: 'tuple'
      }
    ],
    name: 'cancelOfferOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'closeAllTrades',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'converter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'nonce',
            type: 'uint8'
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'amount',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'salt',
            type: 'string'
          }
        ],
        internalType: 'struct J721Tools.OfferOrder',
        name: 'offerOrder',
        type: 'tuple'
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'fillOrder',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'nonce',
            type: 'uint8'
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'amount',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'salt',
            type: 'string'
          }
        ],
        internalType: 'struct J721Tools.OfferOrder',
        name: 'offerOrder',
        type: 'tuple'
      }
    ],
    name: 'getHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'offerer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'nonce',
            type: 'uint8'
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'amount',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]'
          },
          {
            internalType: 'string',
            name: 'salt',
            type: 'string'
          }
        ],
        internalType: 'struct J721Tools.OfferOrder',
        name: 'offerOrder',
        type: 'tuple'
      }
    ],
    name: 'getId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'increaseNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'marketRegistry',
    outputs: [
      {
        internalType: 'contract MarketRegistry',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'tokenAddrs',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct J721Tools.ERC20Details',
        name: 'erc20Details',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenAddr',
            type: 'address'
          },
          {
            internalType: 'address[]',
            name: 'to',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct SpecialTransferHelper.ERC721Details[]',
        name: 'erc721Details',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenAddr',
            type: 'address'
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct J721Tools.ERC1155Details[]',
        name: 'erc1155Details',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'conversionData',
            type: 'bytes'
          }
        ],
        internalType: 'struct J721Tools.ConverstionDetails[]',
        name: 'converstionDetails',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'tradeData',
            type: 'bytes'
          }
        ],
        internalType: 'struct MarketRegistry.TradeDetails[]',
        name: 'tradeDetails',
        type: 'tuple[]'
      },
      {
        internalType: 'address[]',
        name: 'dustTokens',
        type: 'address[]'
      },
      {
        internalType: 'uint256[2]',
        name: 'feeDetails',
        type: 'uint256[2]'
      }
    ],
    name: 'multiAssetSwap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'openForFreeTrades',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'openForTrades',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'orderStatuses',
    outputs: [
      {
        internalType: 'bool',
        name: 'isInited',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'isCancelled',
        type: 'bool'
      },
      {
        internalType: 'uint8',
        name: 'amount',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'punkProxy',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'rescueERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'rescueERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'rescueERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'rescueETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_baseFees',
        type: 'uint256'
      }
    ],
    name: 'setBaseFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_converter',
        type: 'address'
      }
    ],
    name: 'setConverter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract MarketRegistry',
        name: '_marketRegistry',
        type: 'address'
      }
    ],
    name: 'setMarketRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'setOneTimeApproval',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_openForFreeTrades',
        type: 'bool'
      }
    ],
    name: 'setOpenForFreeTrades',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_openForTrades',
        type: 'bool'
      }
    ],
    name: 'setOpenForTrades',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'setUp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        internalType: 'struct J721Tools.Call[]',
        name: 'calls',
        type: 'tuple[]'
      }
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool'
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes'
          }
        ],
        internalType: 'struct J721Tools.Result[]',
        name: 'returnData',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawEther',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]

export default swapAbi
