import { proxy } from "valtio/vanilla";

export enum SENDER_STATUS{
  HELLO = 'HELLO',
  TRADE = 'TRADE'
}

type Sender = {
  monic: string,
  privateKey: string,
  publicKey: string,
  chain: string,
  status: SENDER_STATUS,
  isTest: boolean
}



export const senderState = proxy<Sender>({
  monic: '',
  privateKey: '',
  publicKey: '',
  chain: '',
  status: SENDER_STATUS.HELLO,
  isTest: false,
})


export const setSender = (fn: (senderState: Sender) => void) => {
  fn(senderState)
}

