import { useBalance, useEnsName } from 'wagmi'
import { useWallet } from '../../hooks/useWallet'
import displayAddress from '../../utils/displayAdddress'
import Search from '../Search/Search'
import './Header.scss'

export default function Header() {
  const { connect, address, isConnected } = useWallet({
    onSuccess: () => {}
  })

  const {
    data: balance,
    isBalanceError,
    isBalanceLoading
  } = useBalance({
    address,
    watch: true
  })

  const {
    data: ens,
    isError,
    isLoading
  } = useEnsName({
    address
  })

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo"></div>
        <span className="header__title">Kiwiswap</span>

        <a href="" className="header__link">
          Collections
        </a>
        <a className="header__link">portfolios</a>
      </div>
      <div className="header__right">
        {isConnected && (
          <div className="header__balance">
            <span className="header__icon"></span>
            {parseFloat(balance.formatted).toFixed(3)}E
            <div className="header__address">
              {ens || displayAddress(address)}
            </div>
          </div>
        )}
        {!isConnected && (
          <div onClick={() => connect()} className="header__connect">
            Connect Wallet
          </div>
        )}
        <div className="header__notifications">
          <span className="header__icon__bell"></span>
        </div>
      </div>

      <Search></Search>
    </div>
  )
}
