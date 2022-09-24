import { useCallback, useState } from 'react';
import { snapshot } from 'valtio';
import sendTransaction from './sendTransaction';
import { transactionState } from '../../../stores/transaction';

import { openError } from '../../ErrorModal';
import { closeHoldMetaMask } from '../../HoldMetaMaskModal';
import { currentChainState } from '../../../stores/chains';
import { senderState } from '../../../stores/sender';

const usePay: () => [() => void, boolean] = () => {
  const [paying, setPaying] = useState(false);

  const handlePay = useCallback(() => {
    const pay = async () => {
      setPaying(true);
      const transaction = snapshot(transactionState);
      const currentChain = snapshot(currentChainState);
      const senderId = snapshot(senderState).id;
      try {
        await sendTransaction({
          value: parseFloat(transaction.value),
          to: transaction.to,
          nonce: transaction.nonce || currentChain.current.defaultNonce,
        });
      } catch (error: unknown) {
        if (senderId !== snapshot(senderState).id) return;
        openError(error);
        closeHoldMetaMask();
      }

      setPaying(false);
    };
    pay();
  }, []);

  return [handlePay, paying];
};

export default usePay;
