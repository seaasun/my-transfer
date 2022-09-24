import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { openError } from '../components/ErrorModal';
import { setChainDefaultNoance } from '../stores/chains';
import { senderState, setSender } from '../stores/sender';
import { restTransactionNonce, setTransaction } from '../stores/transaction';

const onNetwork = () => {
  if (!window.ethereum) return;
  setSender((sender) => {
    sender.web3Chain = {
      chainId: NaN,
      endAddress: '',
      name: '',
    };
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  provider.on('network', (newNetwork) => {
    setSender((sender) => {
      sender.web3Chain = {
        chainId: newNetwork.chainId,
        endAddress: newNetwork.endAddress,
        name: newNetwork.name,
      };
      sender.chainId = newNetwork.chainId;
      sender.chainName = newNetwork.name;
    });
    restTransactionNonce();
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

const offNetwork = () => {
  if (!window.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  provider.off('network');
};

const useOnSwitch = () => {
  const sender = useSnapshot(senderState);
  useEffect(() => {
    if (sender.isWeb3) {
      onNetwork();
    } else {
      offNetwork();
    }
    return () => {
      offNetwork();
    };
  }, [sender.isWeb3]);
};

export default useOnSwitch;
