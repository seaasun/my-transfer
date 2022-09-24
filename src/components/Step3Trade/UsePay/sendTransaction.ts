import { snapshot } from 'valtio';
import { senderState } from '../../../stores/sender';
import { setTransaction, transactionState } from '../../../stores/transaction';
import sendWeb3Transaction from './sendWeb3Transaction';
import sendRpcTransaction from './sendRpcTransaction';
import {
  currentChainState,
  setChainDefaultNoance,
} from '../../../stores/chains';

export type SendTransaction = {
  to: string;
  value: number;
  nonce: string;
};

const sendTransaction = async ({ to, value, nonce }: SendTransaction) => {
  const sender = snapshot(senderState);
  const currentChain = snapshot(currentChainState);
  const transaction = snapshot(transactionState);
  let result;
  if (sender.isWeb3) {
    result = await sendWeb3Transaction({ to, value, nonce });
  } else {
    result = await sendRpcTransaction({ to, value, nonce });
  }

  // 重置nonce
  if (
    transaction.nonce === '' &&
    transaction.nonce !== currentChain.current.defaultNonce
  ) {
    setChainDefaultNoance(
      sender.chainId,
      `${parseInt(currentChain.current.defaultNonce) + 1}`
    );
  }

  setTransaction((transaction) => {
    transaction.nonce = '';
  });

  return result;
};

export default sendTransaction;
