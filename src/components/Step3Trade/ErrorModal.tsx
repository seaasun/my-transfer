import { Button, Modal } from "@nextui-org/react"
import { useCallback } from "react"
import { proxy, useSnapshot } from "valtio"

type ErrorModalState = {
  open: boolean,
  result: object
}

const errorModalState = proxy<ErrorModalState>({
  open: false,
  result: {}
})

export const setErrorModal = ((fn: (errorInfo: ErrorModalState)=> void) => {
  fn(errorModalState)
})

const ErrorModal = () => {
  const errorInfo = useSnapshot(errorModalState)
  const handleClose = useCallback(() => {
    setErrorModal(errorInfo => {
      errorInfo.open = false
      errorInfo.result = {}
    })
  }, [])
  
  return <Modal
    open = {errorInfo.open}
    onClose = {handleClose}
  >
    <Modal.Header>
        交易失败！
    </Modal.Header>
    <Modal.Body>
      <Button onPress = {handleClose}>再次交易</Button>  
    </Modal.Body>
  </Modal>
}

export default ErrorModal