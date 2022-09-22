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

const defaultValue: Sender = {
  monic: '',
  privateKey: '',
  publicKey: '',
  chain: '',
  status: SENDER_STATUS.HELLO,
  isTest: false,
}

export const senderState = proxy<Sender>(defaultValue)


export const setSender = (fn: (senderState: Sender) => void) => {
  fn(senderState)
}

export const resetSender = () => {
  Object.keys(defaultValue).map((key: string) => {
    Object.assign(senderState, defaultValue)
  })
}

