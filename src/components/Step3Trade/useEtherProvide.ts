import { ethers } from "ethers";

import { useEffect, useRef, useState } from "react"
import { ref, snapshot, useSnapshot } from "valtio";
import createProvide from "../../services/createProvide"
import { setEtherProvider } from "../../stores/etherProvider";
import { senderState } from "../../stores/sender";
import { setTransaction } from "../../stores/transaction";

const useEtherProvider = () => {
  const sender = useSnapshot(senderState)
  useEffect(() => {
    const rpcProcess = async () => { 
      const provider = new ethers.providers.JsonRpcProvider(
        sender.chainRPC
      );
      setTransaction(transaction => {
        transaction.nonce = ''
        transaction.defaultNonce = ''
      })
      const nonce = await provider.getTransactionCount(sender.publicKey, "latest");
      setEtherProvider(provider)
      setTransaction(transaction => {
        transaction.defaultNonce = `${nonce}`
      })
    }
    if (!sender.isWeb3) {
      rpcProcess()
    } 
  }, [sender.chainRPC, sender.isWeb3, sender.publicKey])

}




export default useEtherProvider