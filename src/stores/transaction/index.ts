import { proxy } from "valtio";

type Transcation = {
  to: string,
  value: number,
  nonce: number,
  defaultNonce: number
}

export const transactionState = proxy({
  to: '0x24bE8580A9c1a611BD67ed376fEe1803168806d9',
  value: 0.00001,
  nonce: 0,
  defaultNonce: 0
})


export const setTransaction = ((fn: (transactionState: Transcation) => void) => {
  fn(transactionState)
})