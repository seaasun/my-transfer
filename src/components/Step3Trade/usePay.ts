import { useCallback, useState } from 'react';
import { snapshot } from 'valtio';
import sendTransaction from '../../services/sendTransaction';
import { transactionState } from '../../stores/transaction';

import { setSuccessModal } from './SuccessModal';

import { openError } from '../ErrorModal';
import { closeHoldMetaMask } from '../HoldMetaMaskModal';

const usePay: () => [() => void, boolean] = () => {
  const [paying, setPaying] = useState(false);

  const handlePay = useCallback(() => {
    const pay = async () => {
      setPaying(true);
      const transaction = snapshot(transactionState);

      try {
        const result = await sendTransaction({
          value: parseFloat(transaction.value),
          to: transaction.to,
          nonce: transaction.nonce || transaction.defaultNonce,
        });

        setSuccessModal((successInfo) => {
          successInfo.open = true;
          successInfo.result = result;
        });
      } catch (error: unknown) {
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
