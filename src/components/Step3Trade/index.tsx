import { Button, Input } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { etherProviderState } from "../../stores/etherProvider";
import { resetSender, senderState } from "../../stores/sender";
import { setTransaction, transactionState } from "../../stores/transaction";
import { validNumber, validNumberRequire, validStringRequire } from "../../utils/valid";
import ChainSwitch from "./ChainSwitch";
import SuccessModal from "./SuccessModal";
import useEtherProvide from "./useEtherProvide";
import usePay from "./usePay";

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
    return vaildValue.status === 'error' 
    || vaildTo.status === 'error' 
    ||vaildNonce.status === 'error'
  }, [vaildNonce.status, vaildTo.status, vaildValue.status])

  const setTransactionInput = useCallback((event: any, key: 'value' | 'to' | 'nonce') => {
    setTransaction(transaction => {
      transaction[key] = event?.target?.value
    })
  }, [])

  if (showSwitchChain) {
    return <ChainSwitch setShowChain={setShowSwitchChain} />;
  }

  

  
  
  return (
    <div>
      <div onClick={handleShowChain}>
        节点
        {sender.chainName}
      </div>
      <div>
        <Input
          label="价格"
          labelRight="ETH"
          {...vaildValue}
          onChange = {(event) => {setTransactionInput(event, 'value')}}
          value={transaction.value}
        />
      </div>
      <div>
        <Input label="发送人" value={sender.publicKey} disabled />
      </div>
      <div>
        <Input 
          label="接收人" 
          {...vaildTo} 
          onChange = {(event) => {setTransactionInput(event, 'to')}}
          value={transaction.to} />
      </div>
      <div>
        <Input
          label="nonce"
          {...vaildNonce}
          onChange = {(event) => {setTransactionInput(event, 'nonce')}}
          value={transaction.nonce || transaction.defaultNonce || ""}
        />
      </div>
      <Button 
        onPress={handlePay as () => void}
        disabled = {isValidDisable || !transaction.defaultNonce}>
        {!transaction.defaultNonce && "连接节点中"}
        {transaction.defaultNonce && !paying && "立即交易"}
        {transaction.defaultNonce && paying && "交易中"}
      </Button>
      <Button onPress={resetSender}>返回首页</Button>

      <SuccessModal />
    </div>
  );
};

export default Step3Trade;
