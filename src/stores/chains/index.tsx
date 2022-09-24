import { ethers } from 'ethers';
import { proxy, ref, snapshot } from 'valtio';
import { derive } from 'valtio/utils';
import { Sender, senderState } from '../sender';

type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

export type Chain = {
  chainId: number;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency?: NativeCurrency;
  defaultNonce: string;
  defaultNonceFail: boolean;
  rpcProvider?: ethers.providers.JsonRpcProvider;
};

const defaultValue: Chain[] = [
  {
    chainId: 4,
    chainName: 'Rinkeby',
    rpcUrls: ['https://rpc.ankr.com/eth_rinkeby'],
    nativeCurrency: {
      name: 'Rinkeby Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    defaultNonce: '',
    defaultNonceFail: false,
  },
  {
    chainId: 5,
    chainName: 'goerli',
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    nativeCurrency: {
      name: 'goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    defaultNonce: '',
    defaultNonceFail: false,
  },
];

export const chainStats = proxy<Chain[]>(defaultValue);

export const resetChains = () => {
  chainStats.splice(0, chainStats.length);
  defaultValue.forEach((chain) => {
    chainStats.push(chain);
  });
};

export type FlatChain = {
  chainId: string;
  chainName: string;
  rpcUrl?: string;
  symbol?: string;
  decimals?: string;
  currencyName?: string;
};

export const checkHasChain = (chainId: number | string) => {
  if (typeof chainId === 'string') {
    chainId = parseInt(chainId);
  }
  const chains = snapshot(chainStats);
  return chains.some((item) => {
    return item.chainId === chainId;
  });
};
export const pushChain = (chain: FlatChain) => {
  const hasThisChain = checkHasChain(chain.chainId);
  if (!hasThisChain) {
    chainStats.push({
      chainId: parseInt(chain.chainId),
      chainName: chain.chainName,
      rpcUrls: [chain.rpcUrl ?? ''],
      nativeCurrency: {
        name: chain.currencyName ?? '',
        symbol: chain.symbol ?? '',
        decimals: parseInt(chain.decimals ?? '18'),
      },
      defaultNonce: '',
      defaultNonceFail: false,
    });
  }
};

export const setChainDefaultNoance = (
  chainId: number,
  defaultNonce: string,
  defaultNonceFail: boolean = false
) => {
  const index = chainStats.findIndex(
    (chain: Chain) => chain.chainId === chainId
  );

  if (index > -1) {
    chainStats[index].defaultNonce = defaultNonce;
    chainStats[index].defaultNonceFail = defaultNonceFail;
    return;
  }
  throw new Error('找不到chain');
};

export const setChainRpcProvider = (
  chainId: number,
  provider: ethers.providers.JsonRpcProvider
) => {
  const index = chainStats.findIndex(
    (chain: Chain) => chain.chainId === chainId
  );
  if (index > -1) {
    chainStats[index].rpcProvider = ref(provider);
    return;
  }
  throw new Error('找不到chain');
};

type CurrentChain = {
  current: Chain;
};
export const currentChainState = derive<CurrentChain, CurrentChain>({
  current: (get) => {
    const chains: Chain[] = get(chainStats);
    const sender: Sender = get(senderState);
    const index = chains.findIndex(
      (chain: Chain) => chain.chainId === sender.chainId
    );

    if (index > -1) return chains[index];
    return {
      chainId: sender.chainId,
      chainName: '',
      rpcUrls: [],
      defaultNonce: '',
      defaultNonceFail: false,
    };
  },
});
