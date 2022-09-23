import { proxy, snapshot } from "valtio";
import { openError } from "../../components/ErrorModal";

type NativeCurrency = {
  name: string,
  symbol: string,
  decimals: number
}

export type Chain = {
  chainId: number,
  chainName: string,
  rpcUrls: string[],
  nativeCurrency: NativeCurrency
}

export const chainStats = proxy<Chain[]> ([
  {
    chainId: 4,
    chainName: 'Rinkeby',
    rpcUrls: ['https://rpc.ankr.com/eth_rinkeby'],
    nativeCurrency: {
      name: 'Rinkeby Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    chainId: 5,
    chainName: 'goerli',
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    nativeCurrency: {
      name: 'goerli Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
])

export type FlatChain = {
  chainId: string,
  chainName: string, 
  rpcUrl: string,
  symbol: string,
  decimals: string,
  currencyName: string,
}
export const pushChain = (chain: FlatChain) => {
  const chains = snapshot(chainStats)
  const hasThisChain = chains.some(item => {
    if (item.chainId === parseInt(chain.chainId)) {
      return true
    }
    return false
  })

  if (!hasThisChain) {
    chainStats.push({
      chainId: parseInt(chain.chainId),
      chainName: chain.chainName,
      rpcUrls: [chain.rpcUrl],
      nativeCurrency: {
        name: chain.currencyName,
        symbol: chain.symbol,
        decimals: parseInt(chain.decimals)
      }
    })
    return true
  } else {
    openError(new Error('已经添加'))
    return false
  }

}