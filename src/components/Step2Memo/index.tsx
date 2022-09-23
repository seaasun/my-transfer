import { Button, Input, Link, Loading } from "@nextui-org/react"
import { type } from "@testing-library/user-event/dist/type"
import produce from "immer"
import { memo, useCallback, useState } from "react"
import getSenderKey from "../../services/getSenderKey"
import { setSender } from "../../stores/sender"

type Monics = string[]

type IMonicInput = {
  index: number,
  setMonic: (index: number, value: string) => void,
  value: string
}

const MonicInput = memo(({index, value, setMonic}: IMonicInput) => {
  const handleChange = useCallback((e: any) => {
    setMonic(index, e.target.value)
  }, [index, setMonic])


  return <Input value = {value} onChange = {handleChange} aria-label = 'moni'/>
})

const Step2Memo = () => {
  const [monics, setMonics] = useState<Monics>(() => new Array(12).fill(''))
  const setMonic = useCallback((index: number, value: string) => {
    setMonics(monics => {
      return produce(monics, draft => {
        draft[index] = value
      })
    })
  }, [])

  const handleNextStep = useCallback(async ()=> {
    const {privateKey, publicKey} =  getSenderKey(monics)
    if (privateKey) {
      setSender(sender => {
        sender.privateKey = privateKey
        sender.publicKey = publicKey
      })
    }
  }, [monics])

  const handleTest = useCallback(async () => {
    setSender(sender => {
      sender.privateKey = "c6f25f9f4bc1ee724dd08a53cc27a90918d3a88e9d892e9e44c4a123d8f8a8bf"
      sender.publicKey = "0xCeedB4f12A14CF86fEA9273f9E37ab6c4aB0d8d4"
      sender.isTest = true
    })
  }, [])
  
  return <div>
    输入助记词
    <div>
    {monics.map((monic: string, index: number) => 
      <MonicInput index = {index} setMonic = {setMonic} value = {monic[index]} key = {index}/>
    )
    }
    </div>
    <Button onPress = {handleNextStep}>
      下一步
    </Button>
    <Link onPress = {handleTest}>如果想测试</Link>
  </div>
}

export default Step2Memo