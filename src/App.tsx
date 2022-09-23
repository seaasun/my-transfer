
import { NextUIProvider, Spacer } from '@nextui-org/react';
import { useSnapshot } from 'valtio';
import Box from './components/Box';
import ErrorModal from './components/ErrorModal';
import HoldMetaMaskModal from './components/HoldMetaMaskModal';
import Step1Hello from './components/Step1Hello';
import Step2Memo from './components/Step2Memo';
import Step3Trade from './components/Step3Trade';
import { createProvider } from './lab/provider';
import useOnSwitch from './services/useOnSwitch';
import { senderState, SENDER_STATUS } from './stores/sender';

createProvider()
function App() {
  const sender = useSnapshot(senderState)
  useOnSwitch()
  return (
    <NextUIProvider>
    <Box css = {{
      display: 'flex',
      minHeight: '100vh',
      // background: 'red'
    }}>
      <Box css = {{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
      }}>
        <Box css= {{width: '100%', maxWidth: 500}}>
          <Spacer y={2} />
          <HoldMetaMaskModal />
          <ErrorModal />
          {sender.status === SENDER_STATUS.HELLO && <Step1Hello />}
          {sender.status === SENDER_STATUS.TRADE && !sender.address && <Step2Memo /> }
          {sender.status === SENDER_STATUS.TRADE && sender.address && <Step3Trade /> }
          <Spacer y={2} />
        </Box>
      </Box>
      <Box css={{
        flexGrow: 1,
        opacity: 1,
        background: '#CCC',
        backgroundImage: 'url("https://images.unsplash.com/photo-1515856251934-766e064d7b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=160")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto' 
      }}/>
    </Box>
    </NextUIProvider>
  );
}

export default App;
