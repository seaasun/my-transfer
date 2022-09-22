import { Button, Input, Link } from "@nextui-org/react";
import { useSnapshot } from "valtio";
import { etherProviderState } from "../../stores/etherProvider";
import { resetSender, senderState, setSender } from "../../stores/sender";
import { transactionState } from "../../stores/transaction";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import useEtherProvide from "./useEtherProvide";
import usePay from "./usePay";

const Step3Trade = () => {
  useEtherProvide()
  const {loading: etherProviderLoading} = useSnapshot(etherProviderState)
  const sender = useSnapshot(senderState)
  
  const transaction = useSnapshot(transactionState);

  const [handlePay, paying] = usePay();
  const changeSender = () => {
    resetSender()
  }

  return (
    <div>
      <div>节点</div>
      <div>
        <Input label="价格" labelRight="ETH" value={transaction.value} />
      </div>
      <div>
        <div><span>发送人<span onClick = {changeSender}>修改</span></span></div>
        <Input value={sender.publicKey} disabled aria-label= "发送人"/>
        
      </div>
      <div>
        <Input label="接收人" value={transaction.to} />
      </div>
      <div>
        <Input label="nonce" value={transaction.nonce || transaction.defaultNonce || ''} />
      </div>
      <Button onPress={handlePay as () => void}>
        {etherProviderLoading && '连接节点中'}
        {!etherProviderLoading && !paying && '立即交易'}
        {!etherProviderLoading && paying && '交易中'}
      </Button>

      <SuccessModal />
      <ErrorModal />
    </div>
  );
};

export default Step3Trade;
