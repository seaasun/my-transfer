import { Button } from "@nextui-org/react"
import { useCallback, useState } from "react"

// https://stackoverflow.com/questions/67597665/how-to-change-network-in-metamask-using-react-js
const ChainAdd = () => {
  const [chain, setChain] = useState({
    chainId: 56,
    chainName: 'Binance Smart Chain',
    rpcUrls: 'https://bsc-dataseed.binance.org/',
    Symbol: 'BNB',
    decimals: 18,
    currencyName: 'BNB'
    
  })

  const handelAdd = useCallback(() => {

    
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${Number(chain.chainId).toString(16)}`,
        chainName: chain.chainName,
        nativeCurrency: {
          name: chain.currencyName,
          symbol: chain.Symbol,
          decimals: chain.decimals
        },
        rpcUrls: [chain.rpcUrls]
      }]
    })
  },[chain.Symbol, chain.chainId, chain.chainName, chain.currencyName, chain.decimals, chain.rpcUrls])


  return <div>
    
    <Button onClick = {handelAdd}>添加</Button>
  </div>
}

export default ChainAdd