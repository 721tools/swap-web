import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import wethAbi from '../../abis/weth'
import './Process.scss'

export default function Process({ onClose }) {
  const [step, setStep] = useState(0) // 0: give permission, 1: review limit order, 2: review sweep order
  const [type, setType] = useState(0) // 0: limit order, 1: sweep order
  const process = useSelector((state) => state.process)

  const wethAddress = {
    main: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    goerli: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
  }

  const spenderAddress = '0x1a92f7381b9f03921564a437210bb9396471050c'
  const amount = ethers.utils.parseUnits('10', 18)

  async function approveWeth() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const wethContract = new ethers.Contract(
      wethAddress.goerli,
      wethAbi,
      provider.getSigner()
    )
    console.log(await provider.getNetwork())
    // const tx = await wethContract.approve(spenderAddress, amount)
    // const res = await tx.wait()
  }

  useEffect(() => {
    // if (type === 0  && write && !isLoading && !isSuccess) {
    approveWeth()
    // }
  }, [])
  return (
    <div className="process">
      <div className="process__con">
        {process.type === 'limit' && (
          <div className="process__step hide">
            <div className="process__title">Give permission to use WETH</div>
            <div className="process__subtitle">
              This request requires gas fee
            </div>
            <div className="process__icon"></div>
            <div className="process__description">
              To continue, you need to allow KiwiSwap smart contracts to use
              your WETH. This has to be done only once.
            </div>
            <div className="process__button">Proceed</div>
            <div className="process__tip">On-Chain, require gas fee</div>
          </div>
        )}

        {false && (
          <div className="process__step">
            <div className="process__title">Review Limit order</div>
            <div className="process__subtitle">Confirm limit order again</div>
            <div className="process__icon book"></div>
            <div className="process__description">
              Waiting to buy 3 Moonbirds NFTs with 23.20 limit order. This order
              valid until March 23 at 12:30
            </div>
            <div className="process__attribute">
              <div className="process__attribute__title">Attribute</div>
              <ul className="process__attribute__list">
                <li>background: yellow</li>
                <li>background: yellow</li>
              </ul>
            </div>
            <div className="process__button">Verify limit order</div>
            <div className="process__tip">
              Off-Chain, verify signatures only
            </div>
          </div>
        )}
        {false && (
          <div className="process__step">
            <div className="process__title">Review Sweep order</div>
            <div className="process__subtitle">Confirm swap order again</div>
            <div className="process__collections">
              <div className="process__collection">
                <img src=""></img>
              </div>
            </div>
            <div className="process__description">
              There are 12 moonbirds NFTs that meet purchase requirements. The
              total price only 9.32 ETH
            </div>
            <div className="process__attribute">
              <div className="process__attribute__title">Attribute</div>
              <ul className="process__attribute__list">
                <li>background: yellow</li>
                <li>background: yellow</li>
              </ul>
            </div>
            <div className="process__button">Verify limit order</div>
            <div className="process__tip">
              Off-Chain, verify signatures only
            </div>
          </div>
        )}
      </div>
      <div className="process__close" onClick={onClose}></div>
    </div>
  )
}
