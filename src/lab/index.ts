/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers, Wallet } from "ethers";

const contractAddress = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"; // DAI
const sendTokenAmount = "0.00001";

const toAddress = "0x24bE8580A9c1a611BD67ed376fEe1803168806d9";
const sendAddress = "0xCeedB4f12A14CF86fEA9273f9E37ab6c4aB0d8d4";
const privateKey =
  "c6f25f9f4bc1ee724dd08a53cc27a90918d3a88e9d892e9e44c4a123d8f8a8bf";

// const signer = provider.getSigner()
let memo = [
  "minute",
  "gadget",
  "shaft",
  "woman",
  "answer",
  "amused",
  "open",
  "trend",
  "snake",
  "keen",
  "erode",
  "acquire",
];
let memos: string = memo.join(" ");
var monic: string =
  "peace mouse scrap chase order guess volume unit riot save reopen nation";
export const createProvider = async () => {
  
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_rinkeby"
  );
  const mnemonic  = ethers.Wallet.fromMnemonic(monic)
  var privateKey = mnemonic.privateKey;
}

export const createProvider3 = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_rinkeby"
  );
  const nonce = await provider.getTransactionCount(sendAddress, "latest");
  const feeData = await provider.getFeeData();
  if (!feeData["maxPriorityFeePerGas"] || !feeData["maxFeePerGas"]) return
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  const tx: ethers.providers.TransactionRequest = {
    // from: sendAddress,
    to: toAddress,
    value: ethers.utils.parseEther(sendTokenAmount),

    type: 2,
    nonce: nonce,
    maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
    maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
    gasLimit: "21000", // basic transaction costs exactly 21000
    // chainId: 42, // Ethereum network id
  };

  const result = await walletSigner.sendTransaction(tx);
};

export const createProvider2 = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_rinkeby"
  );
  // await provider.send("eth_requestAccounts", []);

  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);

  const gasPriceCurrent = await provider.getGasPrice();
  const gasPrice = ethers.utils.hexlify(gasPriceCurrent);
  const nonce = await provider.getTransactionCount(sendAddress, "latest");

  const tx = {
    from: sendAddress,
    to: toAddress,
    value: ethers.utils.parseEther(sendTokenAmount),
    nonce,
    gasLimit: ethers.utils.hexlify(21000),
    gasPrice,
  };


  const result = await walletSigner.sendTransaction(tx);
};
