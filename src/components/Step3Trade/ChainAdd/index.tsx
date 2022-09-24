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
    chainId: '',
    chainName: '',
    rpcUrl: '',
    symbol: '',
    decimals: '',
    currencyName: '',
    // chainId: '2',
    // chainName: 'ThaiChain',
    // rpcUrl: 'https://node.expanse.tech',
    // symbol: 'TCH',
    // decimals: '18',
    // currencyName: 'ThaiChain Ether',
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
    return validStringRequire(chain.rpcUrl ?? '');
  }, [chain.rpcUrl]);
  const validSymol = useMemo(() => {
    return validStringRequire(chain.symbol ?? '');
  }, [chain.symbol]);
  const validDecimals = useMemo(() => {
    return validNumberRequire(chain.decimals ?? '');
  }, [chain.decimals]);
  const validCurrencyName = useMemo(() => {
    return validStringRequire(chain.currencyName ?? '');
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
        helperText={validChainId.helperText}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'chainId');
        }}
      />
      <Spacer y={1} />
      <Input
        label="chain Name"
        value={chain.chainName}
        helperText={validChainName.helperText}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'chainName');
        }}
      />
      <Spacer y={1} />
      <Input
        label="RPC URL"
        value={chain.rpcUrl}
        helperText={validRpcUrl.helperText}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'rpcUrl');
        }}
      />
      <Spacer y={1} />
      <Input
        label="symbol"
        value={chain.symbol}
        helperText={validSymol.helperText}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'symbol');
        }}
      />
      <Spacer y={1} />
      <Input
        label="decimals"
        value={chain.decimals}
        helperText={validDecimals.helperText}
        css={inputCSS}
        onChange={(event) => {
          setChainInput(event, 'decimals');
        }}
      />
      <Spacer y={1} />
      <Input
        label="currency name"
        value={chain.currencyName}
        helperText={validCurrencyName.helperText}
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
        添加并切换
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
