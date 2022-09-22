import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import { useSnapshot } from "valtio"
import { Chain, chainStats } from "../../stores/chains"
import { setSender } from "../../stores/sender"
import {ethers} from 'ethers'
import ChainAdd from "./ChainAdd"

type TChangeItem = {
  chain:Chain
}
const ChainItem = ({chain}: TChangeItem) => {
  const handelChange = useCallback(() => {
    setSender((sender) => {
      sender.chainId = chain.chainId
      sender.chainName = chain.chainName
      sender.chainRPC = chain.rpcUrls[0]
    })

    const fn = async () => {
      const resp = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x${Number(chain.chainId).toString(16)}`
        }]
        
      })
      console.log(321, resp)
    }
    fn()
  }, [chain.chainId, chain.chainName, chain.rpcUrls])


  return <div>
    {chain.chainName}
    <Button onPress = {handelChange}>切换</Button>
  </div>
}

type TChainSwitch = {
  setShowChain: (show: boolean) => void
}

const ChainSwitch = ({setShowChain}: TChainSwitch) => {
  const chains = useSnapshot(chainStats)
  const handleClose = useCallback(() => {
    setShowChain(false)
  },[setShowChain])
  return <div>
    <ChainAdd />
    <div onClick = {handleClose}>关闭</div>
    {chains.map((chain) => <ChainItem chain = {chain as Chain} key = {chain.chainId}/>)}
  </div>
}

export default ChainSwitch