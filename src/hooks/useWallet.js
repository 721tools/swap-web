import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { request } from '../common/request'
import { useEffect } from 'react'
import { login } from '../reducers/userSlice'
import { useDispatch } from 'react-redux'

const domain = window.location.host
const origin = window.location.origin

async function createSiweMessage(address, statement) {
  const response = await request({ path: '/api/auth/nonce' })

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
  const dispatch = useDispatch()

  async function _login(signature, message) {
    const res = await request({
      path: '/api/auth/login',
      data: {
        message: message.message,
        signature
      },
      method: 'POST'
    })
  }

  const { signMessage } = useSignMessage({
    message: '',
    onSuccess: async (signature, message) => {
      onSuccess(signature, message)
      _login(signature, message)
    }
  })

  useEffect(() => {
    isConnected && sign()
  }, [isConnected, address])

  async function _sign() {
    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    )
    signMessage({
      message: message
    })
  }
  async function sign() {
    try {
      const meInfo = await request({ path: '/api/auth/me' })
      if (address !== meInfo.address) {
        setTimeout(() => {
          _sign()
        }, 500)
        return
      }
      dispatch(login(meInfo))
    } catch (e) {
      _sign()
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
