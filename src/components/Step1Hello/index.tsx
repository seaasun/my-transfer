import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import { SENDER_STATUS, setSender } from "../../stores/sender"
import { openError } from "../ErrorModal"
import {ethers} from 'ethers'

const Step1Hello = () => {
  const handleRPCNext = useCallback(() => {
    setSender((sender) => {
      sender.status = SENDER_STATUS.TRADE
      sender.isWeb3 = false
    })

  }, [])

  const handleWeb3Next = useCallback(() => {
    if (!window.ethereum) {
      openError(new Error('缺少ethereum环境,请安装MetaMaster插件'))
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.send("eth_requestAccounts", []).then(() => {
      setSender((sender) => {
      sender.status = SENDER_STATUS.TRADE
      sender.isWeb3 = true
      sender.publicKey = window.ethereum.selectedAddress
    })
    }).catch(error => {
      openError(error)
    })

    
  },[])
  
  return <div>
    hello
    <Button onPress = {handleRPCNext}>使用助记词交易</Button>
    <Button onPress = {handleWeb3Next}>通过MetaMaster交易</Button>
  </div>
}

export default Step1Hello