
import { Fragment, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import Step1Hello from './components/Step1Hello';
import Step2Memo from './components/Step2Memo';
import Step3Trade from './components/Step3Trade';
import { start } from './services/test';
import { senderState, SENDER_STATUS } from './stores/serder';


function App() {
  const sender = useSnapshot(senderState)
  return (
    <div>
      {sender.status === SENDER_STATUS.HELLO && <Step1Hello />}
      {sender.status === SENDER_STATUS.TRADE && !sender.privateKey && <Step2Memo /> }
      {sender.status === SENDER_STATUS.TRADE && sender.privateKey && <Step3Trade /> }
    </div>
  );
}

export default App;
