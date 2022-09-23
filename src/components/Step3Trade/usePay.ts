import { useCallback, useState } from "react"
import { snapshot } from "valtio"
import sendTransaction from "../../services/sendTransaction"
import { senderState } from "../../stores/sender"
import { transactionState } from "../../stores/transaction"
import {ethers} from 'ethers'
import { etherProviderState } from "../../stores/etherProvider"

import { setSuccessModal } from "./SuccessModal"
import { setErrorModal } from "./ErrorModal"
import { openError } from "../ErrorModal"


const usePay = () => {
  const [Paying, setPaying] = useState(false)

  const handlePay = useCallback(() => {
    
    const pay = async () => {
      setPaying(true)
      const transaction =  snapshot(transactionState)
      
      try {
        const result = await sendTransaction({
          value: transaction.value,
          to: transaction.to,
          nonce: transaction.nonce || transaction.defaultNonce,
        })
        
        setSuccessModal(sucessInfo => {
          sucessInfo.open = true
        })
        
      } catch (error: unknown) {
        openError(error)
      }
      
      setPaying(false)
    }
    pay()
    
  }, [])

  return [handlePay, Paying]
  
}

export default usePay