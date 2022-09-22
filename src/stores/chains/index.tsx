import { proxy } from "valtio";

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
    rpcUrls: ['https://goerli.infura.io/v3/'],
    nativeCurrency: {
      name: 'goerli Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
])