import { snapshot } from 'valtio';
import { resetChains } from '../stores/chains';
import { resetSender } from '../stores/sender';
import { restTransactionState } from '../stores/transaction';
import { setWeb3Provider, web3ProviderState } from '../stores/web3Provider';

const goBack = () => {
  resetSender();
  restTransactionState();
  resetChains();
  const web3Provider = snapshot(web3ProviderState);
  const provider = web3Provider.current;
  if (provider) {
    provider.off('network');
    setWeb3Provider(undefined);
  }
};

export default goBack;
