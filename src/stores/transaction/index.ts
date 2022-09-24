import { proxy } from 'valtio';

type Transcation = {
  to: string;
  value: string;
  nonce: string;
  defaultNonce: string;
  defaultNonceFail: boolean;
};
const defaultValue: Transcation = {
  to: '0x24bE8580A9c1a611BD67ed376fEe1803168806d9',
  value: '0.00001',
  nonce: '',
  defaultNonce: '',
  defaultNonceFail: false,
};

export const transactionState = proxy(defaultValue);

export const restTransactionState = () => {
  Object.assign(transactionState, defaultValue);
};

export const restTransactionNonce = () => {
  transactionState.nonce = '';
  transactionState.defaultNonce = '';
  transactionState.defaultNonceFail = false;
};

export const setTransaction = (fn: (transactionState: Transcation) => void) => {
  fn(transactionState);
};
