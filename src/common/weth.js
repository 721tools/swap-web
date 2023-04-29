import { getNetwork } from '@wagmi/core'
import { ethers } from 'ethers'
import wethAbi from '../abis/weth'
import config from '../config/default'

export async function approve(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const { chain } = getNetwork()
  const kiwiContract = config[chain.network]['kiwiContractAddress']
  const contract = new ethers.Contract(
    config[chain.network]['wETHContractAddress'],
    wethAbi,
    signer
  )
  const tx = await contract.approve(
    kiwiContract,
    ethers.BigNumber.from(amount).toHexString()
  )
  return await tx.wait()
}

export async function allowance(from) {
  const { chain } = getNetwork()
  // const signer = provider.getSigner()
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(
    config[chain.network]['wETHContractAddress'],
    wethAbi,
    provider
  )
  const to = config[chain.network]['kiwiContractAddress']
  const res = await contract.allowance(from, to)
  return ethers.utils.formatEther(res)
}
