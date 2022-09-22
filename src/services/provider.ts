import { ethers } from "ethers"



const contractAddress = '0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D' // DAI
const sendTokenAmount = '0.00001'

const toAddress = '0x24bE8580A9c1a611BD67ed376fEe1803168806d9'
const sendAddress = '0xCeedB4f12A14CF86fEA9273f9E37ab6c4aB0d8d4'
const privateKey = 'c6f25f9f4bc1ee724dd08a53cc27a90918d3a88e9d892e9e44c4a123d8f8a8bf'

  // const signer = provider.getSigner()

export const createProvider = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_rinkeby');
  const nonce = await provider.getTransactionCount(sendAddress, 'latest')
  const feeData = await provider.getFeeData()
  console.log('feeData', feeData)
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  const tx: any = {
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

  console.log(311, tx)
  const result = await walletSigner.sendTransaction(tx)
  console.dir(result)

}

export const createProvider2 = async () => {
  console.log(441)
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_rinkeby');
  // await provider.send("eth_requestAccounts", []);
  
  
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  // const address = await walletSigner.getChainId()
  // const balance = await walletSigner.getBalance()
  // const balance: any = await provider.getBalance(toAddress)
  // console.log(parseInt(balance))
   
  const gasPriceCurrent: any = await provider.getGasPrice()
  const gasPrice = ethers.utils.hexlify(parseInt(gasPriceCurrent))
  const nonce = await provider.getTransactionCount(sendAddress, 'latest')

  const tx = {
    from: sendAddress,
    to: toAddress,
    value: ethers.utils.parseEther(sendTokenAmount),
    nonce,
    gasLimit: ethers.utils.hexlify(21000),
    gasPrice,
  }

  console.log(311, tx)
  
  const result = await walletSigner.sendTransaction(tx)
  console.dir(result)

 
}