import { useState } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'

import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import client, { chains } from './wagmiClient'
import Bridge from './pages/Bridge/Bridge'

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route path="/bridge/:slug" element={<Bridge></Bridge>}></Route>
            <Route path="/bridge" element={<Bridge></Bridge>}></Route>
            <Route path="/collection/:slug" element={<Home></Home>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
