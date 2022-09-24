import { proxy, ref } from 'valtio';
import { ethers } from 'ethers';

type Web3ProviderState = {
  current?: ethers.providers.JsonRpcProvider;
};

export const web3ProviderState = proxy<Web3ProviderState>({
  current: undefined,
});

export const resetEthherProvider = () => {
  web3ProviderState.current = undefined;
};

export const setWeb3Provider = (
  provider: ethers.providers.JsonRpcProvider | undefined
) => {
  if (provider) {
    web3ProviderState.current = ref(provider);
  } else {
    web3ProviderState.current = undefined;
  }
};
