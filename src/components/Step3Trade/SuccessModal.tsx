import { Button, Modal, Text } from '@nextui-org/react';
import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { senderState } from '../../stores/sender';

type SuccessModalState = {
  open: boolean;
  result: string;
};

const successModalState = proxy<SuccessModalState>({
  open: false,
  result: '',
});

export const setSuccessModal = (
  fn: (successInfo: SuccessModalState) => void
) => {
  fn(successModalState);
};

const SuccessModal = () => {
  const successInfo = useSnapshot(successModalState);
  const handleClose = useCallback(() => {
    setSuccessModal((successInfo) => {
      successInfo.open = false;
      successInfo.result = '';
    });
  }, []);
  const sender = useSnapshot(senderState);

  return (
    <Modal open={successInfo.open} onClose={handleClose}>
      <Modal.Header>
        <Text h2>已成功发送交易！</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>交易在进行中， 请稍后</Text>
        <Text>
          {sender.isWeb3
            ? '请查看MateMask的交易提醒'
            : '交易完成后您会收到提示'}
        </Text>
        <Text>token信息:</Text>
        <Text>{successInfo.result}</Text>
        <Button onPress={handleClose}>继续交易</Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
