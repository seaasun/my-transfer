import {
  Button,
  Input,
  Spacer,
  Text,
  Card,
  Loading,
  FormElement,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import { resetSender, senderState } from '../../stores/sender';
import {
  restTransactionState,
  setTransaction,
  transactionState,
} from '../../stores/transaction';
import {
  validNumber,
  validNumberRequire,
  validStringRequire,
} from '../../utils/valid';
import ChainSwitch from './ChainSwitch';
import SuccessModal from './SuccessModal';
import useEtherProvide from './useEtherProvide';
import usePay from './usePay';

const inputCSS = {
  width: '100%',
};

const Step3Trade = () => {
  useEtherProvide();
  const sender = useSnapshot(senderState);

  const transaction = useSnapshot(transactionState);

  const [handlePay, paying] = usePay();

  const [showSwitchChain, setShowSwitchChain] = useState(false);
  const handleShowChain = useCallback(() => {
    setShowSwitchChain(true);
  }, []);

  const vaildValue = useMemo(() => {
    return validNumberRequire(transaction.value);
  }, [transaction.value]);

  const vaildTo = useMemo(() => {
    return validStringRequire(transaction.to);
  }, [transaction.to]);

  const vaildNonce = useMemo(() => {
    return validNumber(transaction.value);
  }, [transaction.value]);

  const isValidDisable = useMemo(() => {
    return (
      vaildValue.status === 'error' ||
      vaildTo.status === 'error' ||
      vaildNonce.status === 'error'
    );
  }, [vaildNonce.status, vaildTo.status, vaildValue.status]);

  const setTransactionInput = useCallback(
    (event: React.ChangeEvent<FormElement>, key: 'value' | 'to' | 'nonce') => {
      setTransaction((transaction) => {
        transaction[key] = event?.target?.value;
      });
    },
    []
  );

  const handleBack = useCallback(() => {
    resetSender();
    restTransactionState();
  }, []);

  if (showSwitchChain) {
    return <ChainSwitch setShowChain={setShowSwitchChain} />;
  }
  return (
    <div>
      <Text h1>现在，输入必要的信息</Text>

      <Spacer y={1} />
      <div>
        <Text>网路</Text>
        <Card isPressable isHoverable onPress={handleShowChain}>
          <Card.Body>{sender.chainName}</Card.Body>
        </Card>
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="数量"
          labelRight="ETH"
          {...vaildValue}
          onChange={(event) => {
            setTransactionInput(event, 'value');
          }}
          value={sender.isTest ? undefined : transaction.value}
          placeholder={transaction.value}
          css={inputCSS}
          disabled={sender.isTest}
        />
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="发送人"
          placeholder={sender.address}
          css={inputCSS}
          disabled
        />
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="接收人"
          {...vaildTo}
          onChange={(event) => {
            setTransactionInput(event, 'to');
          }}
          value={transaction.to}
          css={inputCSS}
        />
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="nonce"
          {...vaildNonce}
          onChange={(event) => {
            setTransactionInput(event, 'nonce');
          }}
          value={transaction.nonce || transaction.defaultNonce || ''}
          css={inputCSS}
        />
      </div>
      <Spacer y={2} />
      <Button
        size="lg"
        onPress={handlePay as () => void}
        disabled={isValidDisable || !transaction.defaultNonce || paying}
        css={{
          width: '100%',
        }}
      >
        {!transaction.defaultNonce && '连接节点中'}
        {transaction.defaultNonce && !paying && '立即交易'}
        {transaction.defaultNonce && paying && '交易中'}
        {(!transaction.defaultNonce || paying) && (
          <Loading color="currentColor" size="sm" css={{ padding: 16 }} />
        )}
      </Button>
      <Spacer y={1} />
      <Button
        size="lg"
        onPress={handleBack}
        css={{
          width: '100%',
          backgroundColor: '$blue50',
          color: '$primary',
        }}
      >
        返回首页
      </Button>
      <SuccessModal />
    </div>
  );
};

export default Step3Trade;
