import { proxy, ref } from 'valtio';
import { ethers } from 'ethers';

type EtherProviderState = {
  provider?: ethers.providers.JsonRpcProvider;
};

export const etherProviderState = proxy<EtherProviderState>({
  provider: undefined,
});

export const resetEthherProvider = () => {
  etherProviderState.provider = undefined;
};

export const setEtherProvider = (
  provider: ethers.providers.JsonRpcProvider | undefined
) => {
  if (provider) {
    etherProviderState.provider = ref(provider);
  } else {
    etherProviderState.provider = undefined;
  }
};
