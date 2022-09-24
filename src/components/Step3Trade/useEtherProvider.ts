import { ethers } from 'ethers';

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
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
  const currentChain = useSnapshot(currentChainState);

  useEffect(() => {
    const rpcProcess = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(sender.chainRPC);
        restTransactionNonce();
        const nonce = await provider.getTransactionCount(
          sender.address,
          'latest'
        );
        setChainRpcProvider(sender.chainId, provider);
        setChainDefaultNoance(sender.chainId, `${nonce}`);
      } catch (error: unknown) {
        openError(new Error('无法使用此网路, 请选择其他网路'));
        setChainDefaultNoance(sender.chainId, '', true);
      }
    };
    if (!sender.isWeb3 && !currentChain.current.rpcProvider) {
      rpcProcess();
    }
  }, [
    sender.chainRPC,
    sender.isWeb3,
    sender.address,
    sender.chainId,
    currentChain,
  ]);
};

export default useEtherProvider;
