import { useCallback, useState } from "react"
import { snapshot } from "valtio"
import sendTransaction from "../../services/sendTransaction"
import { senderState } from "../../stores/serder"
import { transactionState } from "../../stores/transaction"
import {ethers} from 'ethers'
import { etherProviderState } from "../../stores/etherProvider"
import { createProvider3 } from "../../services/provider"


const usePay = () => {
  const [Paying, setPaying] = useState(false)

  const handlePay = useCallback(() => {
    
    const fn = async () => {
      const {provider} = snapshot(etherProviderState)
      if (!provider) return
     
      setPaying(true)
      const transaction =  snapshot(transactionState)
      

      const feeData = await provider.getFeeData();
      const result = await sendTransaction({
        provider: (provider as unknown as ethers.providers.JsonRpcProvider),
        value: transaction.value,
        to: transaction.to,
        nonce: transaction.nonce ?? transaction.defaultNonce,
        feeData: feeData
      })
      setPaying(true)
    }
    fn()
    
  }, [])

  return [handlePay, Paying]
  
}

export default usePay