import { ethers } from 'ethers';
import {
  checkHasChain,
  pushChain,
  setChainDefaultNoance,
} from '../../stores/chains';
import { setSender } from '../../stores/sender';
import { restTransactionNonce } from '../../stores/transaction';
import { openError } from '../ErrorModal';

const providerOnNetwork = (provider: ethers.providers.JsonRpcProvider) => {
  provider.on('network', (newNetwork) => {
    setSender((sender) => {
      sender.chainId = newNetwork.chainId;
      sender.chainName = newNetwork.name;
    });
    restTransactionNonce();
    if (!checkHasChain(newNetwork.chainId)) {
      pushChain({
        chainId: newNetwork.chainId,
        chainName: newNetwork.name,
      });
    }
    provider
      .send('eth_getTransactionCount', [
        window.ethereum.selectedAddress,
        'latest',
      ])
      .then((nonce) => {
        setChainDefaultNoance(newNetwork.chainId, `${parseInt(nonce)}`);
      })
      .catch((error) => {
        openError(error);
        setChainDefaultNoance(newNetwork.chainId, '', true);
      });
  });
};

export default providerOnNetwork;
