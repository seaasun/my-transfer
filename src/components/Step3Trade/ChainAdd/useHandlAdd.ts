import { useCallback } from 'react';
import { snapshot } from 'valtio';
import { checkHasChain, FlatChain, pushChain } from '../../../stores/chains';
import { senderState, setSender } from '../../../stores/sender';
import { openError } from '../../ErrorModal';
import { closeHoldMetaMask, openHoldMetaMask } from '../../HoldMetaMaskModal';

const useHandleAdd = (
  chain: FlatChain,
  setAdding: (adding: boolean) => void,
  closeAdd: () => void
) =>
  useCallback(() => {
    const web3Add = async () => {
      setAdding(true);
      let timeoutId;
      try {
        timeoutId = setTimeout(() => {
          openHoldMetaMask();
        }, 10000);

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${Number(chain.chainId).toString(16)}`,
              chainName: chain.chainName,
              nativeCurrency: {
                name: chain.currencyName,
                symbol: chain.symbol,
                decimals: parseInt(chain.decimals ?? '18'),
              },
              rpcUrls: [chain.rpcUrl],
            },
          ],
        });
        clearTimeout(timeoutId);
        pushChain(chain);
        closeAdd();
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        openError(error);
      }
      closeHoldMetaMask();
      setAdding(false);
    };
    const sender = snapshot(senderState);

    if (sender.isWeb3) {
      web3Add();
    } else {
      if (checkHasChain(chain.chainId)) {
        openError(new Error('已存在此chain'));
      }
      pushChain(chain);

      closeAdd();
      setSender((sender) => {
        sender.chainId = parseInt(chain.chainId);
        sender.chainName = chain.chainName;
        sender.chainRPC = chain.rpcUrl ?? '';
      });
    }
  }, [chain, closeAdd, setAdding]);

export default useHandleAdd;
