import {
  Button,
  FormElement,
  Input,
  Loading,
  Spacer,
  Text,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { FlatChain } from '../../../stores/chains';
import { validNumberRequire, validStringRequire } from '../../../utils/valid';
import useHandleAdd from './useHandlAdd';

const inputCSS = {
  width: '100%',
};

// https://stackoverflow.com/questions/67597665/how-to-change-network-in-metamask-using-react-js
type TChainAdd = {
  closeAdd: () => void;
};

const ChainAdd = ({ closeAdd }: TChainAdd) => {
  const [chain, setChain] = useState<FlatChain>({
    chainId: '56',
    chainName: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    symbol: 'BNB',
    decimals: '18',
    currencyName: 'BNB',
    // chainId: '5',
    // chainName: 'goerli',
    // rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    // symbol: 'ETH',
    // decimals: '18',
    // currencyName: 'goerli Ether'
  });
  const [adding, setAdding] = useState(false);
  const handelAdd = useHandleAdd(chain, setAdding, closeAdd);

  const setChainInput = useCallback(
    (event: React.ChangeEvent<FormElement>, key: string) => {
      setChain((chain) => {
        return {
          ...chain,
          [key]: event?.target?.value,
        };
      });
    },
    []
  );

  const validChainId = useMemo(() => {
    return validNumberRequire(chain.chainId);
  }, [chain.chainId]);
  const validChainName = useMemo(() => {
    return validStringRequire(chain.chainName);
  }, [chain.chainName]);
  const validRpcUrl = useMemo(() => {
    return validStringRequire(chain.rpcUrl);
  }, [chain.rpcUrl]);
  const validSymol = useMemo(() => {
    return validStringRequire(chain.symbol);
  }, [chain.symbol]);
  const validDecimals = useMemo(() => {
    return validNumberRequire(chain.decimals);
  }, [chain.decimals]);
  const validCurrencyName = useMemo(() => {
    return validStringRequire(chain.currencyName);
  }, [chain.currencyName]);

  const isAddDisabled = useMemo(() => {
    if (
      validChainId.status !== 'error' &&
      validChainName.status !== 'error' &&
      validRpcUrl.status !== 'error' &&
      validSymol.status !== 'error' &&
      validDecimals.status !== 'error' &&
      validCurrencyName.status !== 'error'
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    validChainId.status,
    validChainName.status,
    validCurrencyName.status,
    validDecimals.status,
    validRpcUrl.status,
    validSymol.status,
  ]);

  return (
    <div>
      <Text h1>创建新网络</Text>
      <Spacer y={1} />
      <Input
        label="chain Id"
        value={chain.chainId}
        placeholder="number"
        {...validChainId}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'chainId');
        }}
      />
      <Spacer y={1} />
      <Input
        label="chain Name"
        value={chain.chainName}
        placeholder="string"
        {...validChainName}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'chainName');
        }}
      />
      <Spacer y={1} />
      <Input
        label="RPC URL"
        value={chain.rpcUrl}
        placeholder="string"
        {...validRpcUrl}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'rpcUrl');
        }}
      />
      <Spacer y={1} />
      <Input
        label="symbol"
        value={chain.symbol}
        placeholder="string"
        {...validSymol}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'symbol');
        }}
      />
      <Spacer y={1} />
      <Input
        label="decimals"
        value={chain.decimals}
        placeholder="number"
        {...validDecimals}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'decimals');
        }}
      />
      <Spacer y={1} />
      <Input
        label="currency name"
        value={chain.currencyName}
        placeholder="string"
        {...validCurrencyName}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'currencyName');
        }}
      />

      <Spacer y={2} />
      <Button
        css={{ width: '100%' }}
        onPress={handelAdd}
        disabled={adding || isAddDisabled}
      >
        添加
        {adding && <Loading color="currentColor" size="sm" />}
      </Button>
      <Spacer y={1} />
      <Button
        size="lg"
        onPress={closeAdd}
        css={{
          width: '100%',
          backgroundColor: '$blue50',
          color: '$primary',
        }}
      >
        取消
      </Button>
    </div>
  );
};

export default ChainAdd;
