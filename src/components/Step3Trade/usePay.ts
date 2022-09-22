import { useCallback, useState } from "react"
import { snapshot } from "valtio"
import sendTransaction from "../../services/sendTransaction"
import { senderState } from "../../stores/sender"
import { transactionState } from "../../stores/transaction"
import {ethers} from 'ethers'
import { etherProviderState } from "../../stores/etherProvider"

import { setSuccessModal } from "./SuccessModal"
import { setErrorModal } from "./ErrorModal"


const usePay = () => {
  const [Paying, setPaying] = useState(false)

  const handlePay = useCallback(() => {
    
    const fn = async () => {
      const {provider} = snapshot(etherProviderState)
      if (!provider) return
     
      setPaying(true)
      const transaction =  snapshot(transactionState)
      
      try {
        const feeData = await provider.getFeeData();
        const result = await sendTransaction({
          provider: (provider as unknown as ethers.providers.JsonRpcProvider),
          value: transaction.value,
          to: transaction.to,
          nonce: transaction.nonce ?? transaction.defaultNonce,
          feeData: feeData
        })
        
        setSuccessModal(sucessInfo => {
          sucessInfo.open = true
        })
        
      } catch (e) {
        setErrorModal(errorInfo => {
          errorInfo.open = true
        })
      }
      
      setPaying(false)
    }
    fn()
    
  }, [])

  return [handlePay, Paying]
  
}

export default usePay