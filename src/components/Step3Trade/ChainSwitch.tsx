import { Button } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { snapshot, useSnapshot } from "valtio"
import { Chain, chainStats } from "../../stores/chains"
import { senderState, setSender } from "../../stores/sender"
import {ethers} from 'ethers'
import ChainAdd from "./ChainAdd"
import { openError } from "../ErrorModal"

type TChangeItem = {
  chain:Chain,
  switching: boolean,
  setSwitching: (switching: boolean) => void
}
const ChainItem = ({chain, switching, setSwitching}: TChangeItem) => {
  const handelChange = useCallback(() => {
    const switchRPC = () => {
      setSender((sender) => {
        sender.chainId = chain.chainId
        sender.chainName = chain.chainName
        sender.chainRPC = chain.rpcUrls[0]
      })
    }
    const switchWeb3 = async () => {
      if (switching) {
        openError(new Error('请等待切换完成'))
        return
      }
      try {
        setSwitching(true)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: `0x${Number(chain.chainId).toString(16)}`
          }]
        })
        setSender((sender) => {
          sender.chainId = chain.chainId
          sender.chainName = chain.chainName
          sender.chainRPC = ''
        })
      } catch (error: unknown){
        openError(error)
      }
      setSwitching(false)
    }
    const sender = snapshot(senderState)
    if (sender.isWeb3) {
      switchWeb3()
    } else {
      switchRPC()
    }
  }, [chain.chainId, chain.chainName, chain.rpcUrls, setSwitching, switching])

  const sender = useSnapshot(senderState)
  return <div>
    {chain.chainName}
    <Button onPress = {handelChange} disabled = {sender.chainId === chain.chainId}>切换</Button>
  </div>
}

type TChainSwitch = {
  setShowChain: (show: boolean) => void
}

const ChainSwitch = ({setShowChain}: TChainSwitch) => {
  const chains = useSnapshot(chainStats)
  const [switching , setSwitching] = useState(false)
  const handleClose = useCallback(() => {
    setShowChain(false)
  },[setShowChain])
  return <div>
    <ChainAdd />
    <div onClick = {handleClose}>关闭</div>
    {chains.map((chain) => <ChainItem chain = {chain as Chain} key = {chain.chainId} switching ={switching} setSwitching = {setSwitching}/>)}
  </div>
}

export default ChainSwitch