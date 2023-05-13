import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { watchNetwork } from '@wagmi/core'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork
} from 'wagmi'
import wethAbi from '../../abis/weth'
import { request } from '../../common/request'
import config from '../../config/default'
import Loading from '../Loading/Loading'
import { message } from '../Message/Message'
import './BridgeCore.scss'
import nftAbi from '../../abis/nft'
import bridgeAbi from '../../abis/bridge'

export default function BridgeCore({ slug }) {
  // const testNFTOnMumbai = '0xA1193302CB1E02166D6df4e8C66E068b1a7c2BDA'
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [isTransfering, setIsTransfering] = useState(false)
  const { chain } = useNetwork()
  const dispatch = useDispatch()
  const [collection, setCollection] = useState({})
  const { address } = useAccount()
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const [destination, setDestination] = useState({
    to: {
      name: 'Polygon Mumbai',
      chainId: 80001,
      bridgeContract: '0xcf14d6d83146a76779d27e9b2a579c59c50138d5'
    },
    from: {
      name: 'Goerli Ethereum',
      chainId: 5,
      bridgeContract: '0x7405fa3a6f82c094e1bc36303a1a660e02ce76b6'
    }
  })

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: config[chain?.network]?.wETHContractAddress,
    abi: wethAbi,
    functionName: 'approve',
    args: [
      '0x41e81aC34E5C36505E624819a94C231889Cfe989',
      ethers.BigNumber.from(1).toHexString()
    ]
  })

  useEffect(() => {
    const unwatch = watchNetwork((network) => {
      if (!network?.chain) {
        location.reload()
      }
    })

    return () => {
      unwatch()
    }
  }, [])

  useEffect(() => {
    async function fetchCollectionInfo() {
      const res = await request({
        path: `/api/collections/${slug}`,
        uesSessionStorage: true
      })
      // dispatch(setMoreInfo(res))
      setContractAddress(res.contract)
      setCollection(res)
    }
    slug && fetchCollectionInfo()
  }, [slug])

  async function handleTransfer() {
    if (contractAddress === '' || tokenId === '') {
      return message.warn('Type in a contract address and token ID please')
    }

    setIsTransfering(true)
    // write({ args: [] })
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const nftContract = new ethers.Contract(
        contractAddress,
        nftAbi,
        provider.getSigner()
      )
      const isApproved = await nftContract.isApprovedForAll(
        address,
        destination.from.bridgeContract
      )
      console.log(isApproved, 'isApproved')
      if (!isApproved) {
        const approveToBridge = await nftContract.setApprovalForAll(
          destination.from.bridgeContract,
          true
        )

        const reciept = await approveToBridge.wait()
      }

      const bridgeContract = new ethers.Contract(
        destination.from.bridgeContract,
        bridgeAbi,
        provider.getSigner()
      )
      const targetFun =
        destination.from.chainId === 5
          ? 'transferFromL1toL2'
          : 'transferFromL2toL1'
      const transfer = await bridgeContract[targetFun](
        contractAddress,
        tokenId,
        address,
        {
          value: ethers.utils.parseEther(
            targetFun === 'transferFromL1toL2' ? '0.1' : '10'
          )
        }
      )
      const transferReciept = await transfer.wait()

      message.success('The cross-chain process will take 10-20 minutes!')
      setIsTransfering(false)
    } catch (e) {
      console.log(e)
      setIsTransfering(false)
      message.error(e.reason || e.message)
    }
  }

  function handleToggleDestination() {
    console.log(1)
    setDestination({
      from: destination.to,
      to: destination.from
    })
  }

  function handleSwitchNetwork() {
    switchNetwork(destination.from.chainId)
  }
  useEffect(() => {
    setIsTransfering(isLoading)
  }, [isLoading])
  const isNetworkMatch = chain?.id === destination.from.chainId
  return (
    <div className="bridge-core">
      <div className="bridge-core__title">NFT Bridge</div>
      <div className="bridge-core__con">
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            From
            <span className="bridge-core__con__chain">
              {destination.from.name}
            </span>
          </div>
          <div className="bridge-core__con__label">Contract Address</div>
          <div className="bridge-core__con__input">
            <input
              value={contractAddress}
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
        <div
          className="bridge-core__con__arrow"
          onClick={handleToggleDestination}
        ></div>
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            To
            <span className="bridge-core__con__chain">
              {destination.to.name}
            </span>
          </div>
          <div className="bridge-core__con__collection">
            <div className="bridge-core__con__pic">
              <img src={collection.image}></img>
            </div>
            <div className="bridge-core__con__name empty"></div>
          </div>
        </div>
      </div>
      {isNetworkMatch && (
        <div className="bridge-core__button" onClick={handleTransfer}>
          {isTransfering && <Loading color="white"></Loading>}
          Transfer
        </div>
      )}
      {!isNetworkMatch && (
        <div className="bridge-core__button" onClick={handleSwitchNetwork}>
          Switch network to {destination.from.name}
        </div>
      )}
    </div>
  )
}
