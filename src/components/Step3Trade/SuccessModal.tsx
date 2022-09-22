import { Button, Modal } from "@nextui-org/react"
import { useCallback } from "react"
import { proxy, useSnapshot } from "valtio"

type SuccessModalState = {
  open: boolean,
  result: object
}

const successModalState = proxy<SuccessModalState>({
  open: false,
  result: {}
})

export const setSuccessModal = ((fn: (successInfo: SuccessModalState)=> void) => {
  fn(successModalState)
})

const SuccessModal = () => {
  const successInfo = useSnapshot(successModalState)
  const handleClose = useCallback(() => {
    setSuccessModal(successInfo => {
      successInfo.open = false
      successInfo.result = {}
    })
  }, [])
  
  return <Modal
    open = {successInfo.open}
    onClose = {handleClose}
  >
    <Modal.Header>
        祝贺您， 交易成功！
    </Modal.Header>
    <Modal.Body>
      <Button onPress = {handleClose}>继续交易</Button>  
    </Modal.Body>
  </Modal>
}

export default SuccessModal