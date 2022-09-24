import { Button, Text, Spacer, Link, Input } from '@nextui-org/react';
import { useCallback } from 'react';
import { SENDER_STATUS, setSender } from '../../stores/sender';
import { openError } from '../ErrorModal';
import { ethers } from 'ethers';
import { closeHoldMetaMask, openHoldMetaMask } from '../HoldMetaMaskModal';
import Box from '../Box';

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

  const handleWeb3Next = useCallback(() => {
    if (!window.ethereum) {
      openError(new Error('缺少ethereum环境,请安装MetaMask插件'));
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (!window.ethereum.selectedAddress) {
      openHoldMetaMask();
    }

    provider
      .send('eth_requestAccounts', [])
      .then(() => {
        closeHoldMetaMask();
        setSender((sender) => {
          sender.status = SENDER_STATUS.TRADE;
          sender.isWeb3 = true;
          sender.address = window.ethereum.selectedAddress;
        });
      })
      .catch((error) => {
        openError(error);
      });
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
      </Button>
    </Box>
  );
};

export default Step1Hello;
