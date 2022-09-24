import { ethers } from 'ethers';

import { useEffect, useRef } from 'react';
import { snapshot, useSnapshot } from 'valtio';
import {
  currentChainState,
  setChainDefaultNoance,
  setChainRpcProvider,
} from '../../stores/chains';
import { senderState } from '../../stores/sender';
import { restTransactionNonce } from '../../stores/transaction';
import { openError } from '../ErrorModal';

const useEtherProvider = () => {
  const sender = useSnapshot(senderState);
  const providerloading = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const currentChain = snapshot(currentChainState);
    const rpcProcess = async () => {
      const currentChainId = currentChain.current.chainId.toString();
      if (providerloading.current[currentChainId]) return;
      providerloading.current[currentChainId] = true;

      try {
        if (!currentChain.current.rpcUrls[0]) {
          throw new Error('没有rpcProvider');
        }
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.current.rpcUrls[0]
        );
        restTransactionNonce();
        const nonce = await provider.getTransactionCount(
          sender.address,
          'latest'
        );
        if (sender.id !== snapshot(senderState).id) return;
        setChainRpcProvider(sender.chainId, provider);
        setChainDefaultNoance(sender.chainId, `${nonce}`);
      } catch (error: unknown) {
        if (sender.id !== snapshot(senderState).id) return;
        openError(new Error('无法使用此网路, 请选择其他网路'));
        setChainDefaultNoance(sender.chainId, '', true);
      }
      providerloading.current[currentChainId] = false;
    };
    if (!sender.isWeb3 && !currentChain.current.rpcProvider) {
      rpcProcess();
    }
  }, [sender.isWeb3, sender.address, sender.chainId, sender.id]);
};

export default useEtherProvider;
