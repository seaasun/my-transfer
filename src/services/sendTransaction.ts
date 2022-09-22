import { ethers } from "ethers";
import { snapshot } from "valtio";
import { senderState } from "../stores/sender";
import { setTransaction } from "../stores/transaction";

type SendTransaction = {
  provider: ethers.providers.JsonRpcProvider,
  to: string,
  value: number,
  nonce: string,
  feeData: ethers.providers.FeeData
}

const sendTransaction = async ({provider, to, value, nonce, feeData}: SendTransaction) => {
  const sender = snapshot(senderState)
  const tx: any = {
    from: sender.publicKey,
    to,
    value: ethers.utils.parseEther(`${value}`),
    type: 2,
    nonce: parseInt(nonce),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, // Recommended maxPriorityFeePerGas
    maxFeePerGas: feeData.maxFeePerGas, // Recommended maxFeePerGas
    gasLimit: "21000", // basic transaction costs exactly 21000
    // chainId: 42, // Ethereum network id
  };
  
  const wallet = new ethers.Wallet(sender.privateKey);
  const walletSigner = wallet.connect(provider);
  const result =1 // = await walletSigner.sendTransaction(tx);
  
  // 重置nonce
  setTransaction(transaction => {
    transaction.nonce = ''
    transaction.defaultNonce = transaction.defaultNonce + 1
  })
  provider.getTransactionCount(sender.publicKey, "latest").then(nonce => {
    setTransaction(transaction => {
      transaction.defaultNonce = nonce
    })
  })


  return result
  
}

export default sendTransaction