import { proxy, snapshot } from 'valtio';
import { derive } from 'valtio/utils';
import { openError } from '../../components/ErrorModal';
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
  rpcUrl: string;
  symbol: string;
  decimals: string;
  currencyName: string;
};
export const pushChain = (chain: FlatChain) => {
  const chains = snapshot(chainStats);
  const hasThisChain = chains.some((item) => {
    if (item.chainId === parseInt(chain.chainId)) {
      return true;
    }
    return false;
  });

  if (!hasThisChain) {
    chainStats.push({
      chainId: parseInt(chain.chainId),
      chainName: chain.chainName,
      rpcUrls: [chain.rpcUrl],
      nativeCurrency: {
        name: chain.currencyName,
        symbol: chain.symbol,
        decimals: parseInt(chain.decimals),
      },
      defaultNonce: '',
      defaultNonceFail: false,
    });
    return true;
  } else {
    openError(new Error('已经添加'));
    return false;
  }
};

export const setChainDefaultNoance = (
  chainId: number,
  defaultNonce: string,
  defaultNonceFail: boolean = false
) => {
  console.log(315, chainId, defaultNonce);
  const index = chainStats.findIndex(
    (chain: Chain) => chain.chainId === chainId
  );

  if (index > -1) {
    chainStats[index].defaultNonce = defaultNonce;
    chainStats[index].defaultNonceFail = defaultNonceFail;
    console.log(316);
  }
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
    console.log(3221, sender.chainId, chains[index]?.defaultNonce);
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
