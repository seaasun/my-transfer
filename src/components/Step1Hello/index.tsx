import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import { SENDER_STATUS, setSender } from "../../stores/serder"

const Step1Hello = () => {
  const handleNext = useCallback(() => {
    setSender((sender) => {
      sender.status = SENDER_STATUS.TRADE
    })

  }, [])
  
  return <div>
    hello
    <Button onPress = {handleNext}>开始转账</Button>
  </div>
}

export default Step1Hello