const bridgeAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'l1Address', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'desc', type: 'address' }
    ],
    name: 'transferFromL1toL2',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'l2Address', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'desc', type: 'address' }
    ],
    name: 'transferFromL2toL1',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
]
export default bridgeAbi
