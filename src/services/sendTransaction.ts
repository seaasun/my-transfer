import { ethers } from "ethers";
import { snapshot } from "valtio";
import { senderState } from "../stores/serder";

const privateKey =
  "c6f25f9f4bc1ee724dd08a53cc27a90918d3a88e9d892e9e44c4a123d8f8a8bf";

const createProvide = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_rinkeby"
  );

  return provider
}


type SendTransaction = {
  provider: ethers.providers.JsonRpcProvider,
  to: string,
  value: number,
  nonce: number,
  feeData: ethers.providers.FeeData
}

const sendTransaction = async ({provider, to, value, nonce, feeData}: SendTransaction) => {
  const sender = snapshot(senderState)
  const tx: any = {
    from: sender.publicKey,
    to,
    value: ethers.utils.parseEther(`${value}`),
    type: 2,
    nonce,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, // Recommended maxPriorityFeePerGas
    maxFeePerGas: feeData.maxFeePerGas, // Recommended maxFeePerGas
    gasLimit: "21000", // basic transaction costs exactly 21000
    // chainId: 42, // Ethereum network id
  };
  
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  const result = await walletSigner.sendTransaction(tx);
  return result
  
}

export default sendTransaction