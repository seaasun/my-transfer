import { ethers } from "ethers";

const send = async () => {
  const ethereum = window.ethereum
  console.log(441, window.ethereum.selectedAddress, ethers.utils.parseEther('0.00001'))
  const transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    to: '0x24bE8580A9c1a611BD67ed376fEe1803168806d9', // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: `0x${Number(1).toString(16)}`, // Only required to send ether to the recipient from the initiating external account.
    // maxPriorityFeePerGas: '0x09184e72a000',
    // maxFeePerGas: '0x09184e72a000',
    data:
      '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    type: '0x2',
  };

  const nonce = await ethereum.request({
    method: 'eth_getTransactionCount',
    params: [
      ethereum.selectedAddress,
      'latest'
    ],
  })
  console.log(991, nonce)
  return
  
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  try {
    console.log(551)
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(321, txHash)
  } catch (e) {
    console.log(4449)
  }
}

const send2 = async () => {
  const ethereum = window.ethereum
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    gas: '0x2710', // customizable by user during MetaMask confirmation.
    to: '0x24bE8580A9c1a611BD67ed376fEe1803168806d9', // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: `0x${Number(1).toString(16)}`, // Only required to send ether to the recipient from the initiating external account.
    data:
      '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  signer.sendTransaction(transactionParameters as any)
 
}

export default send