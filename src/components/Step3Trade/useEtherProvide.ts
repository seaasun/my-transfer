import { ethers } from "ethers";

import { useEffect, useRef, useState } from "react"
import { ref, snapshot, useSnapshot } from "valtio";
import createProvide from "../../services/createProvide"
import { setEtherProvider } from "../../stores/etherProvider";
import { resetSender, senderState } from "../../stores/sender";
import { restTransactionState, setTransaction } from "../../stores/transaction";
import { openError } from "../ErrorModal";

const useEtherProvider = () => {
  const sender = useSnapshot(senderState)
  useEffect(() => {
    const rpcProcess = async () => { 
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          sender.chainRPC
        );
        setTransaction(transaction => {
          transaction.nonce = ''
          transaction.defaultNonce = ''
        })
        const nonce = await provider.getTransactionCount(sender.address, "latest");
        setEtherProvider(provider)
        setTransaction(transaction => {
          transaction.defaultNonce = `${nonce}`
        })
      } catch (error: unknown){
        openError(new Error('发生错误,请重试'))
        resetSender()
        restTransactionState()
      }
    }
    if (!sender.isWeb3) {
      rpcProcess()
    } 
  }, [sender.chainRPC, sender.isWeb3, sender.address])

}




export default useEtherProvider