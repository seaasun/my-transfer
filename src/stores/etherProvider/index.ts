import { proxy, ref } from "valtio"
import {ethers} from 'ethers'

type EtherProviderState = {
  provider?: ethers.providers.JsonRpcProvider,
  loading: boolean,
}

export const etherProviderState = proxy<EtherProviderState>({
  provider: undefined,
  loading: true
})

export const setEtherProvider = (provider: ethers.providers.JsonRpcProvider | undefined) => {
  if (provider) {
    etherProviderState.provider = ref(provider)
  } else {
    etherProviderState.provider = undefined
  }
 
  etherProviderState.loading = !provider
}