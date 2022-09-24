import { snapshot } from 'valtio';
import { senderState } from '../../../stores/sender';
import { setTransaction } from '../../../stores/transaction';
import sendWeb3Transaction from './sendWeb3Transaction';
import sendRpcTransaction from './sendRpcTransaction';

export type SendTransaction = {
  to: string;
  value: number;
  nonce: string;
};

const sendTransaction = async ({ to, value, nonce }: SendTransaction) => {
  const sender = snapshot(senderState);
  let result;
  if (sender.isWeb3) {
    result = await sendWeb3Transaction({ to, value, nonce });
  } else {
    result = await sendRpcTransaction({ to, value, nonce });
  }

  // 重置nonce
  setTransaction((transaction) => {
    if (
      transaction.nonce === '' &&
      transaction.nonce !== transaction.defaultNonce
    ) {
      transaction.defaultNonce = `${parseInt(transaction.defaultNonce) + 1}`;
    }
    transaction.nonce = '';
  });

  return result;
};

export default sendTransaction;
