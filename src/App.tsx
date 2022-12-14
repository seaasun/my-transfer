import { useSnapshot } from 'valtio';
import ErrorModal from './components/ErrorModal';
import HoldMetaMaskModal from './components/HoldMetaMaskModal';
import Layout from './components/Layout';
import Step1Hello from './components/Step1Hello';
import Step2Memo from './components/Step2Memo';
import Step3Trade from './components/Step3Trade';
import FinishModal from './components/Step3Trade/FinishModal';
import { senderState, SENDER_STATUS } from './stores/sender';

function App() {
  const sender = useSnapshot(senderState);

  return (
    <Layout>
      <HoldMetaMaskModal />
      <ErrorModal />
      <FinishModal />
      {sender.status === SENDER_STATUS.HELLO && <Step1Hello />}
      {sender.status === SENDER_STATUS.TRADE && !sender.address && (
        <Step2Memo />
      )}
      {sender.status === SENDER_STATUS.TRADE && sender.address && (
        <Step3Trade />
      )}
    </Layout>
  );
}

export default App;
