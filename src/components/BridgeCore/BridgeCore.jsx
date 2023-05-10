import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useContract, useContractWrite, useNetwork } from 'wagmi'
import wethAbi from '../../abis/weth'
import config from '../../config/default'
import { provider } from '../../wagmiClient'
import Loading from '../Loading/Loading'
import { message } from '../Message/Message'
import './BridgeCore.scss'

export default function BridgeCore() {
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [isTransfering, setIsTransfering] = useState(false)
  const { chain } = useNetwork()
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: config[chain?.network]?.wETHContractAddress,
    abi: wethAbi,
    functionName: 'approve',
    args: [
      '0x41e81aC34E5C36505E624819a94C231889Cfe989',
      ethers.BigNumber.from(1).toHexString()
    ]
  })

  async function handleTransfer() {
    if (contractAddress === '' || tokenId === '') {
      return message.warn('Type in a contract address and token ID please')
    }
    setIsTransfering(true)
    write({ args: [] })
  }
  useEffect(() => {
    setIsTransfering(isLoading)
  }, [isLoading])
  return (
    <div className="bridge-core">
      <div className="bridge-core__title">NFT Bridge</div>
      <div className="bridge-core__con">
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            From
            <span className="bridge-core__con__chain">L2</span>
          </div>
          <div className="bridge-core__con__label">Contract Address</div>
          <div className="bridge-core__con__input">
            <input
              onChange={(e) => {
                setContractAddress(e.target.value)
              }}
            ></input>
          </div>
          <div className="bridge-core__con__label">Token ID</div>
          <div className="bridge-core__con__input">
            <input
              onChange={(e) => {
                setTokenId(e.target.value)
              }}
            ></input>
          </div>
        </div>
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            To
            <span className="bridge-core__con__chain">Ethereum</span>
          </div>
          <div className="bridge-core__con__collection">
            <div className="bridge-core__con__pic"></div>
            <div className="bridge-core__con__name empty"></div>
          </div>
        </div>
      </div>
      <div className="bridge-core__button" onClick={handleTransfer}>
        {isTransfering && <Loading color="white"></Loading>}
        Transfer
      </div>
    </div>
  )
}
