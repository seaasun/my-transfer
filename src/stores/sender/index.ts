import { proxy, snapshot } from 'valtio/vanilla';

export enum SENDER_STATUS {
  HELLO = 'HELLO', // 在首页
  TRADE = 'TRADE', // 在助记词or交易页
}
export type Sender = {
  privateKey: string;
  address: string;
  chainId: number;
  status: SENDER_STATUS;
  isTest: boolean;
  isWeb3: boolean;
  id: number;
};

const defaultValue: Sender = {
  privateKey: '',
  address: '',
  chainId: 4,
  status: SENDER_STATUS.HELLO,
  isTest: false,
  isWeb3: false,
  id: 1, // 用于标注当前登陆人
};

export const senderState = proxy<Sender>(defaultValue);

export const setSender = (fn: (senderState: Sender) => void) => {
  fn(senderState);
};

export const resetSender = () => {
  const value = {
    ...defaultValue,
    id: snapshot(senderState).id + 1, // 切换登陆人
  };
  Object.assign(senderState, value);
};
