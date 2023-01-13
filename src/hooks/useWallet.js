import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { request } from '../common/request'
import { useEffect, useState } from 'react'

const domain = window.location.host
const origin = window.location.origin

async function createSiweMessage(address, statement) {
  const response = await request('/auth/web3-nonce', { address }, 'POST')

  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1',
    nonce: response.nonce
  })
  return message.prepareMessage()
}

export function useWallet({ onSuccess }) {
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const [isWaitingConnect, setIsWaitingConnect] = useState(false)
  const { signMessage } = useSignMessage({
    message: '',
    onSuccess: async (signature, message) => {
      onSuccess(signature, message)
    }
  })

  useEffect(() => {
    isWaitingConnect && isConnected && sign()
  }, [isConnected])

  async function sign() {
    if (!isConnected) {
      setIsWaitingConnect(true)
      openConnectModal()
    } else {
      setIsWaitingConnect(false)
      const message = await createSiweMessage(
        address,
        'Sign in with Ethereum to the app.'
      )
      signMessage({
        message: message
      })
    }
  }

  function connect() {
    openConnectModal()
  }

  return {
    sign,
    connect,
    address,
    isConnected
  }
}
