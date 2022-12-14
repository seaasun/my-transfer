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
import { currentChainState } from '../../stores/chains';
import { senderState } from '../../stores/sender';
import { setTransaction, transactionState } from '../../stores/transaction';
import goBack from '../../utils/goBack';
import {
  validNumber,
  validNumberRequire,
  validStringRequire,
} from '../../utils/valid';
import ChainSwitch from './ChainSwitch';
import SuccessModal from './SuccessModal';
import useEtherProvider from './useEtherProvider';
import usePay from './UsePay';

const inputCSS = {
  width: '100%',
};

const Step3Trade = () => {
  useEtherProvider();
  const sender = useSnapshot(senderState);

  const transaction = useSnapshot(transactionState);
  const chainCurrent = useSnapshot(currentChainState);
  const currentChain = chainCurrent.current;

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
    goBack();
  }, []);

  const btnText = useMemo(() => {
    if (currentChain.defaultNonceFail) return '??????????????????';
    if (!currentChain.defaultNonce) return '???????????????';
    if (paying) return '?????????';
    return '????????????';
  }, [currentChain.defaultNonce, currentChain.defaultNonceFail, paying]);

  if (showSwitchChain) {
    return <ChainSwitch setShowChain={setShowSwitchChain} />;
  }
  return (
    <div>
      <Text h1>??????????????????????????????</Text>

      <Spacer y={1} />
      <div>
        <Text>??????</Text>
        <Card isPressable isHoverable onPress={handleShowChain}>
          <Card.Body>{currentChain.chainName}</Card.Body>
        </Card>
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="??????"
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
          label="?????????"
          placeholder={sender.address}
          css={inputCSS}
          disabled
        />
      </div>
      <Spacer y={1} />
      <div>
        <Input
          label="?????????"
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
          value={transaction.nonce || currentChain.defaultNonce || ''}
          css={inputCSS}
        />
      </div>
      <Spacer y={2} />
      <Button
        size="lg"
        onPress={handlePay as () => void}
        disabled={isValidDisable || btnText !== '????????????'}
        css={{
          width: '100%',
        }}
      >
        {btnText}
        {(btnText === '?????????' || btnText === '???????????????') && (
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
        ???????????????????????????
      </Button>
      <SuccessModal />
    </div>
  );
};

export default Step3Trade;
