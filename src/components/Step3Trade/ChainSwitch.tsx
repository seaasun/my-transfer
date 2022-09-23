import { Button, Text, Link, Spacer, Card } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { snapshot, useSnapshot } from "valtio"
import { Chain, chainStats } from "../../stores/chains"
import { senderState, setSender } from "../../stores/sender"
import {ethers} from 'ethers'
import ChainAdd from "./ChainAdd"
import { openError } from "../ErrorModal"
import { closeHoldMetaMask, openHoldMetaMask } from "../HoldMetaMaskModal"

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
        openHoldMetaMask()
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: `0x${Number(chain.chainId).toString(16)}`
          }]
        })
        closeHoldMetaMask()
        setSender((sender) => {
          sender.chainId = chain.chainId
          sender.chainName = chain.chainName
          sender.chainRPC = ''
        })
      } catch (error: unknown){
        closeHoldMetaMask()
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
  return <Card css={{marginBottom: 32}}>
    <Card.Body css= {{
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
    <div>{chain.chainName}</div>
    <Button 
      css={{minWidth: 'min-content', paddingLeft: 24, paddingRight: 24, marginRight: 24}}
      size="sm"
      onPress = {handelChange} 
      disabled = {sender.chainId === chain.chainId}>
        切换
    </Button>
    </Card.Body>
  </Card>
}

type TChainSwitch = {
  setShowChain: (show: boolean) => void
}

const ChainSwitch = ({setShowChain}: TChainSwitch) => {
  const chains = useSnapshot(chainStats)
  const [switching , setSwitching] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const handleClose = useCallback(() => {
    setShowChain(false)
  },[setShowChain])

  const openAdd = useCallback(() => {
    setShowAdd(true)
  }, [])

  const closeAdd = useCallback(() => {
    setShowAdd(false)
  }, [])
  
  if (showAdd) {
    return <div>
      <ChainAdd closeAdd = {closeAdd}/>
    </div>
  }

  return <div>
    <Text h1>选择合适的网路</Text>
    <Text>或者, 
      <Link css= {{cursor: 'pointer'}} onPress={openAdd}>添加新节点</Link>
    </Text>
    <Spacer y={2} />
    
    {chains.map((chain) => <ChainItem chain = {chain as Chain} key = {chain.chainId} switching ={switching} setSwitching = {setSwitching}/>)}
    <Spacer y={2} />

    <Button css={{
      width: '100%',
      backgroundColor: '$blue50',
      color: '$primary'
    }} onPress = {handleClose}>
      返回
    </Button>

  
  </div>
}

export default ChainSwitch