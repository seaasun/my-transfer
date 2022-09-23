import { Button, Loading } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { snapshot } from "valtio"
import { pushChain } from "../../stores/chains"
import { senderState } from "../../stores/sender"
import { openError } from "../ErrorModal"
import { closeHoldMetaMask, openHoldMetaMask } from "../HoldMetaMaskModal"

// https://stackoverflow.com/questions/67597665/how-to-change-network-in-metamask-using-react-js
const ChainAdd = () => {
  const [chain, setChain] = useState({
    chainId: '56',
    chainName: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    symbol: 'BNB',
    decimals: '18',
    currencyName: 'BNB'
    // chainId: '5',
    // chainName: 'goerli',
    // rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    // symbol: 'ETH',
    // decimals: '18',
    // currencyName: 'goerli Ether'
  })
  const [adding, setAdding] = useState(false)

  const handelAdd = useCallback(() => {
    const web3Add = async () => {
      setAdding(true)
      try {
        openHoldMetaMask()
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${Number(chain.chainId).toString(16)}`,
            chainName: chain.chainName,
            nativeCurrency: {
              name: chain.currencyName,
              symbol: chain.symbol,
              decimals: parseInt(chain.decimals)
            },
            rpcUrls: [chain.rpcUrl]
          }]
        })
        pushChain(chain)
      } catch (error: unknown) {
        openError(error)
      }
      closeHoldMetaMask()
      setAdding(false)
    }
    const sender = snapshot(senderState)
    if (sender.isWeb3) {
      web3Add()
    } else {
      pushChain(chain)
    }
    
  },[chain])


  return <div>
    
    <Button onPress = {handelAdd} disabled = {adding}>
      添加
      {adding && <Loading color="currentColor" size="sm" />}
    </Button>
  </div>
}

export default ChainAdd