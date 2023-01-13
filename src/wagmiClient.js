import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: 'LlvVrMtdxyjUMr63E-Qhp1qctQwTwBFB' }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Kiwi Swap',
  chains
})

const client = createClient({
  autoConnect: false,
  connectors,
  provider
})

export default client
export { chains }
