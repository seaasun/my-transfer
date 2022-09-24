import { ethers } from 'ethers';
import { snapshot } from 'valtio';
import { etherProviderState } from '../../../stores/etherProvider';
import { senderState } from '../../../stores/sender';
import { openError } from '../../ErrorModal';
import { openFinishModal } from '../FinishModal';
import { SendTransaction } from './sendTransaction';

const sendRpcTransaction = async ({ to, value, nonce }: SendTransaction) => {
  const sender = snapshot(senderState);
  const providerSnapshot = snapshot(etherProviderState);
  const provider = providerSnapshot.provider;
  if (!provider) {
    throw new Error('provider 注册失败');
  }

  let result: ethers.providers.TransactionResponse;

  const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
    from: sender.address,
    to,
    value: ethers.utils.parseEther(`${value}`),
    type: 2,
    nonce: parseInt(nonce),
    gasLimit: '21000', // basic transaction costs exactly 21000
  };

  const wallet = new ethers.Wallet(sender.privateKey);
  const walletSigner = wallet.connect(provider);

  result = await walletSigner.sendTransaction(tx);

  result
    .wait()
    .then(() => {
      openFinishModal(result.hash);
    })
    .catch((error) => {
      openError(error);
    });

  return result.hash;
};

export default sendRpcTransaction;
