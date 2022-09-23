import { Button, Modal, Text } from "@nextui-org/react"
import { useCallback } from "react"
import { proxy, useSnapshot } from "valtio"

type HoldMetaMaskModalState = {
  open: boolean,
  msg: string,
}

const holdMetaMaskModalState = proxy<HoldMetaMaskModalState>({
  open: false,
  msg: ''
})

const setHoldMetaMaskModal = ((fn: (holdMetaMaskInfo: HoldMetaMaskModalState)=> void) => {
  fn(holdMetaMaskModalState)
})

export const openHoldMetaMask = () => {
  holdMetaMaskModalState.open = true
}

export const closeHoldMetaMask = () => {
  holdMetaMaskModalState.open = false
}


const HoldMetaMaskModal = () => {
  const holdMetaMaskInfo = useSnapshot(holdMetaMaskModalState)
  const handleClose = useCallback(() => {
    setHoldMetaMaskModal(holdMetaMaskInfo => {
      holdMetaMaskInfo.open = false
    })
  }, [])
  
  return <Modal
    open = {holdMetaMaskInfo.open}
    onClose = {handleClose}
  >
    <Modal.Header>
        <Text h1>请打卡MetaMask插件进行操作</Text>
    </Modal.Header>
    <Modal.Body>
      <Button onPress = {handleClose}>关闭</Button>  
    </Modal.Body>
  </Modal>
}

export default HoldMetaMaskModal
