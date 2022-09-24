import { proxy } from 'valtio/vanilla';

export enum SENDER_STATUS {
  HELLO = 'HELLO',
  TRADE = 'TRADE',
}
type Web3Chain = {
  chainId: number;
  endAddress: string;
  name: string;
};

type Sender = {
  monic: string;
  privateKey: string;
  address: string;
  chainId: number;
  chainName: string;
  chainRPC: string;
  status: SENDER_STATUS;
  isTest: boolean;
  isWeb3: boolean;
  web3Chain: Web3Chain;
};

const defaultValue: Sender = {
  monic: '',
  privateKey: '',
  address: '',
  chainId: 4,
  chainName: 'Rinkeby',
  chainRPC: 'https://rpc.ankr.com/eth_rinkeby',
  status: SENDER_STATUS.HELLO,
  isTest: false,
  isWeb3: false,
  web3Chain: {
    chainId: NaN,
    endAddress: '',
    name: '',
  },
};

export const senderState = proxy<Sender>(defaultValue);

export const setSender = (fn: (senderState: Sender) => void) => {
  fn(senderState);
};

export const resetSender = () => {
  Object.assign(senderState, defaultValue);
};
