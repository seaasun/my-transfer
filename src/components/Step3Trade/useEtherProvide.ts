import { ethers } from "ethers";

import { useEffect, useRef, useState } from "react"
import { ref, snapshot } from "valtio";
import createProvide from "../../services/createProvide"
import { setEtherProvider } from "../../stores/etherProvider";
import { senderState } from "../../stores/serder";
import { setTransaction } from "../../stores/transaction";

const useEtherProvider = () => {
  
  useEffect(() => {
    const fn = async () => {
      
      const provider = await createProvide()
      const sender = snapshot(senderState)
      const nonce = await provider.getTransactionCount(sender.publicKey, "latest");
      setEtherProvider(provider)
      setTransaction(transaction => {
        transaction.nonce =nonce
      })
    }
    
    fn()
  }, [])
}




export default useEtherProvider