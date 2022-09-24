import { ethers } from 'ethers';

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { setEtherProvider } from '../../stores/etherProvider';
import { senderState } from '../../stores/sender';
import { restTransactionNonce, setTransaction } from '../../stores/transaction';
import { openError } from '../ErrorModal';

const useEtherProvider = () => {
  const sender = useSnapshot(senderState);
  useEffect(() => {
    const rpcProcess = async () => {
      try {
        setEtherProvider(undefined);
        const provider = new ethers.providers.JsonRpcProvider(sender.chainRPC);
        restTransactionNonce();
        const nonce = await provider.getTransactionCount(
          sender.address,
          'latest'
        );
        setEtherProvider(provider);
        setTransaction((transaction) => {
          transaction.defaultNonce = `${nonce}`;
        });
      } catch (error: unknown) {
        // console.log(error);
        openError(new Error('无法使用此网路, 请选择其他网路'));
        setTransaction((transaction) => {
          transaction.defaultNonceFail = true;
        });
        // resetSender();
        // restTransactionState();
      }
    };
    if (!sender.isWeb3) {
      rpcProcess();
    }
  }, [sender.chainRPC, sender.isWeb3, sender.address]);
};

export default useEtherProvider;
