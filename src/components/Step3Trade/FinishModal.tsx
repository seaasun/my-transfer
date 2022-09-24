import { Button, Modal, Text } from '@nextui-org/react';
import { Fragment, useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

const finishModalStates = proxy<Record<string, boolean>>({});

const closeFinishModal = (token: string) => {
  if (finishModalStates[token]) {
    finishModalStates[token] = false;
  }
};

export const openFinishModal = (token: string) => {
  finishModalStates[token] = true;
};

type TModalItem = {
  token: string;
};
const ModalItem = ({ token }: TModalItem) => {
  const handleClose = useCallback(() => {
    closeFinishModal(token);
  }, [token]);
  return (
    <Modal open={true} onClose={handleClose}>
      <Modal.Header>
        <Text h2>交易已经完成！</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>token信息:</Text>
        <Text>{token}</Text>
        <Button onPress={handleClose}>确定</Button>
      </Modal.Body>
    </Modal>
  );
};

const FinishModal = () => {
  const finishModals = useSnapshot(finishModalStates);
  const modals = Object.keys(finishModals)
    .map((key) => {
      if (finishModals[key]) return key;
      return '';
    })
    .filter((item) => item !== '');

  return (
    <Fragment>
      {modals.map((token) => (
        <ModalItem token={token} key={token} />
      ))}
    </Fragment>
  );
};

export default FinishModal;
