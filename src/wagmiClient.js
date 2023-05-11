import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  optimism,
  arbitrum
} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [goerli, mainnet, polygon, polygonMumbai, optimism, arbitrum],
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
  autoConnect: true,
  connectors,
  provider
})

export default client
export { chains, provider }
