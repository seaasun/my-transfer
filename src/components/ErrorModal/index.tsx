import { Button, Modal } from "@nextui-org/react"
import { useCallback } from "react"
import { proxy, useSnapshot } from "valtio"

type ErrorModalState = {
  open: boolean,
  msg: string,
}

const errorModalState = proxy<ErrorModalState>({
  open: false,
  msg: ''
})

const setErrorModal = ((fn: (errorInfo: ErrorModalState)=> void) => {
  fn(errorModalState)
})

export const openError = ((error: unknown)=> {
  errorModalState.open = true
  
  if (typeof error === 'string') {
    errorModalState.msg = error
  } else if (typeof error === 'object' && (error as Record<string, unknown>)?.message){
    errorModalState.msg = (error as Record<string, unknown>)?.message as string
  } else {
    errorModalState.msg = '请再次尝试'
  }
})

const ErrorModal = () => {
  const errorInfo = useSnapshot(errorModalState)
  const handleClose = useCallback(() => {
    setErrorModal(errorInfo => {
      errorInfo.open = false
      errorInfo.msg = ''
    })
  }, [])
  
  return <Modal
    open = {errorInfo.open}
    onClose = {handleClose}
  >
    <Modal.Header>
        错误！
    </Modal.Header>
    <Modal.Body>
      {errorInfo.msg}
      <Button onPress = {handleClose}>关闭</Button>  
    </Modal.Body>
  </Modal>
}

export default ErrorModal
