import {
  Button,
  Input,
  Text,
  Grid,
  Spacer,
  FormElement,
} from '@nextui-org/react';
import produce from 'immer';
import { memo, useCallback, useState } from 'react';
import getPivateKeyAndAddress from '../../services/getPivateKeyAndAddress';
import { resetChains } from '../../stores/chains';
import { resetEthherProvider } from '../../stores/etherProvider';
import { resetSender, setSender } from '../../stores/sender';
import { restTransactionState } from '../../stores/transaction';
import { openError } from '../ErrorModal';

type Monics = string[];

type IMonicInput = {
  index: number;
  setMonic: (index: number, value: string) => void;
  value: string;
};

const MonicInput = memo(({ index, value, setMonic }: IMonicInput) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<FormElement>) => {
      setMonic(index, event.target.value);
    },
    [index, setMonic]
  );

  return (
    <Grid xs={6}>
      <Input
        value={value}
        onChange={handleChange}
        aria-label="moni"
        css={{ width: '100%' }}
      />
    </Grid>
  );
});

const buttonCSS = {
  width: '100%',
};
const Step2Memo = () => {
  const [monics, setMonics] = useState<Monics>(() => new Array(12).fill(''));
  const setMonic = useCallback((index: number, value: string) => {
    setMonics((monics) => {
      const result = produce(monics, (draft) => {
        draft[index] = value;
      });
      return result;
    });
  }, []);

  const handleNextStep = useCallback(async () => {
    const { privateKey, address } = getPivateKeyAndAddress(monics);
    if (privateKey) {
      setSender((sender) => {
        sender.privateKey = privateKey;
        sender.address = address;
      });
    } else {
      openError(new Error('不正确的助记词，请重试'));
    }
  }, [monics]);

  const handleTest = useCallback(async () => {
    setSender((sender) => {
      sender.privateKey =
        'c6f25f9f4bc1ee724dd08a53cc27a90918d3a88e9d892e9e44c4a123d8f8a8bf';
      sender.address = '0xCeedB4f12A14CF86fEA9273f9E37ab6c4aB0d8d4';
      sender.isTest = true;
    });
  }, []);
  const handleBack = useCallback(() => {
    resetSender();
    restTransactionState();
    resetChains();
    resetEthherProvider();
  }, []);
  return (
    <div>
      <Text h1>输入助记词</Text>
      <Text>我们不会存储助记词, 敬请放心</Text>
      <Spacer y={2} />
      <Grid.Container gap={2} css={{ padding: 0 }}>
        {monics.map((monic: string, index: number) => (
          <MonicInput
            index={index}
            setMonic={setMonic}
            value={monic}
            key={index}
          />
        ))}
      </Grid.Container>
      <Spacer y={2} />
      <Button onPress={handleNextStep} css={buttonCSS} size="lg">
        最后一步
      </Button>
      <Spacer y={1} />
      <Button
        onPress={handleBack}
        css={{
          width: '100%',
          backgroundColor: '$blue50',
          color: '$primary',
        }}
        size="lg"
        color="secondary"
      >
        返回首页
      </Button>
      <Spacer y={1} />
      <Button
        onPress={handleTest}
        light
        auto
        color="primary"
        css={{ paddingLeft: 0 }}
      >
        使用测试账户（不可修改交易金额）
      </Button>
    </div>
  );
};

export default Step2Memo;
