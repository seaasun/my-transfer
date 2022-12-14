import { Button, Text, Spacer, Link, Loading } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { SENDER_STATUS, setSender } from '../../stores/sender';
import { openError } from '../ErrorModal';
import { ethers } from 'ethers';
import { closeHoldMetaMask, openHoldMetaMask } from '../HoldMetaMaskModal';
import Box from '../Box';
import { setWeb3Provider } from '../../stores/web3Provider';
import providerOnNetwork from './prividerOnNetwork';

const btnCSS = {
  width: '100%',
};

const Step1Hello = () => {
  const handleRPCNext = useCallback(() => {
    setSender((sender) => {
      sender.status = SENDER_STATUS.TRADE;
      sender.isWeb3 = false;
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const handleWeb3Next = useCallback(() => {
    const process = async () => {
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        );
        setWeb3Provider(provider);
        if (!window.ethereum.selectedAddress) {
          openHoldMetaMask();
        }
        await provider.send('eth_requestAccounts', []);
        closeHoldMetaMask();
        setSender((sender) => {
          sender.status = SENDER_STATUS.TRADE;
          sender.isWeb3 = true;
          sender.address = window.ethereum.selectedAddress;
        });

        providerOnNetwork(provider);
        setLoading(false);
      } catch (error: unknown) {
        openError(error);
        setLoading(false);
      }
    };
    if (!window.ethereum) {
      openError(new Error('缺少ethereum环境,请安装MetaMask插件'));
      return;
    }
    process();
  }, []);

  return (
    <Box css={{ width: '100%' }}>
      <Spacer y={2} />
      <Text h1 css={{ fontSize: 48 }}>
        快转
      </Text>

      <Text>使用EIP-1559进行转账</Text>
      <Text>可同步添加、切换、监听MetaMask网络</Text>
      <Text>Power by React, TS, ethers, valtio, NextUI</Text>
      <Link href="https://github.com/seaasun/my-transfer" target="_blank">
        Github
      </Link>
      <Spacer y={8} />
      <Button onPress={handleRPCNext} size="lg" css={btnCSS}>
        使用助记词交易
      </Button>
      <Spacer y={1} />
      <Button onPress={handleWeb3Next} size="lg" css={btnCSS}>
        通过MetaMask交易
        {loading && (
          <Loading color="currentColor" size="sm" css={{ padding: 16 }} />
        )}
      </Button>
    </Box>
  );
};

export default Step1Hello;
