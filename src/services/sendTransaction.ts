import { ethers } from 'ethers';
import { snapshot } from 'valtio';
import { openError } from '../components/ErrorModal';
import {
  closeHoldMetaMask,
  openHoldMetaMask,
} from '../components/HoldMetaMaskModal';
import { etherProviderState } from '../stores/etherProvider';
import { senderState } from '../stores/sender';
import { setTransaction } from '../stores/transaction';

type SendTransaction = {
  // provider: ethers.providers.JsonRpcProvider,
  to: string;
  value: number;
  nonce: string;
};

const sendRpcTransaction = async ({ to, value, nonce }: SendTransaction) => {
  const sender = snapshot(senderState);
  const providerSnapshot = snapshot(etherProviderState);
  const provider = providerSnapshot.provider;
  if (!provider) {
    throw new Error('provider 注册失败');
  }

  let result;

  const feeData = await provider.getFeeData();
  if (!feeData.maxPriorityFeePerGas || !feeData.maxFeePerGas) {
    throw new Error('获取Gas失败');
  }
  const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
    from: sender.address,
    to,
    value: ethers.utils.parseEther(`${value}`),
    type: 2,
    nonce: parseInt(nonce),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, // Recommended maxPriorityFeePerGas
    maxFeePerGas: feeData.maxFeePerGas, // Recommended maxFeePerGas
    gasLimit: '21000', // basic transaction costs exactly 21000
    // chainId: 42, // Ethereum network id
  };

  const wallet = new ethers.Wallet(sender.privateKey);
  const walletSigner = wallet.connect(provider);

  result = await walletSigner.sendTransaction(tx);

  provider
    .getTransactionCount(sender.address, 'latest')
    .then((nonce: number) => {
      setTransaction((transaction) => {
        transaction.defaultNonce = `${nonce}`;
      });
    })
    .catch((error: unknown) => {
      openError(error);
    });

  return result.hash;
};

type SendWeb3Transaction = {
  to: string;
  value: number;
  nonce: string;
};

const sendWeb3Transaction = async ({
  to,
  value,
  nonce,
}: SendWeb3Transaction) => {
  const ethereum = window.ethereum;
  let result;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const feeData = await await provider.getFeeData();
  if (!feeData.maxPriorityFeePerGas) {
    return;
  }
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

  ethereum
    .request({
      method: 'eth_getTransactionCount',
      params: [ethereum.selectedAddress, 'latest'],
    })
    .then((nonce: string) => {
      setTransaction((transaction) => {
        transaction.defaultNonce = `${parseInt(nonce)}`;
      });
    })
    .catch((error: unknown) => {
      openError(error);
    });

  return result;
};

const sendTransaction = async ({ to, value, nonce }: SendTransaction) => {
  const sender = snapshot(senderState);
  let result;
  if (sender.isWeb3) {
    result = await sendWeb3Transaction({ to, value, nonce });
  } else {
    result = await sendRpcTransaction({ to, value, nonce });
  }

  // 重置nonce
  setTransaction((transaction) => {
    transaction.nonce = '';
    transaction.defaultNonce = `{${parseInt(transaction.defaultNonce) + 1}`;
  });

  return result;
};

export default sendTransaction;
