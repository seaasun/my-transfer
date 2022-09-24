import { ethers } from 'ethers';
import { snapshot } from 'valtio';
import { senderState } from '../../../stores/sender';
import { closeHoldMetaMask, openHoldMetaMask } from '../../HoldMetaMaskModal';
import { SendTransaction } from './sendTransaction';

const sendWeb3Transaction = async ({ to, value, nonce }: SendTransaction) => {
  const ethereum = window.ethereum;
  let result;

  const weiValue = ethers.utils.parseUnits(value.toString(), 'ether');

  const tx = {
    nonce: `0x${nonce}`, // ignored by MetaMask
    to: to, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: `0x${Number(weiValue).toString(16)}`, // Only required to send ether to the recipient from the initiating external account.
    // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    type: '0x2',
    gasLimit: '21000',
  };

  openHoldMetaMask();
  result = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });

  closeHoldMetaMask();
  return result;
};

export default sendWeb3Transaction;
