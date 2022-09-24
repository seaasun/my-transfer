import { Button, Text, Grid, Spacer } from '@nextui-org/react';
import produce from 'immer';
import { useCallback, useState } from 'react';
import getPivateKeyAndAddress from '../../utils/getPivateKeyAndAddress';
import { setSender } from '../../stores/sender';
import { openError } from '../ErrorModal';
import goBack from '../../utils/goBack';
import MonicInput from './MonicInput';
import { TEST_PRIVATE_KEY, TEST_SENDER_ADDRESS } from '../../constants';

type Monics = string[];

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
      sender.privateKey = TEST_PRIVATE_KEY;
      sender.address = TEST_SENDER_ADDRESS;
      sender.isTest = true;
    });
  }, []);
  const handleBack = useCallback(() => {
    goBack();
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
      <Button onPress={handleNextStep} css={{ width: '100%' }} size="lg">
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
