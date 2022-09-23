import { Button, Input, Loading } from "@nextui-org/react"
import { useCallback, useMemo, useState } from "react"
import { snapshot } from "valtio"
import { FlatChain, pushChain } from "../../../stores/chains"
import { senderState } from "../../../stores/sender"
import { validNumberRequire, validStringRequire } from "../../../utils/valid"
import { openError } from "../../ErrorModal"
import { closeHoldMetaMask, openHoldMetaMask } from "../../HoldMetaMaskModal"
import useHandleAdd from "./useHandlAdd"





// https://stackoverflow.com/questions/67597665/how-to-change-network-in-metamask-using-react-js
type TChainAdd = {
  closeAdd: () => void
}

const ChainAdd = ({closeAdd}: TChainAdd) => {
  const [chain, setChain] = useState<FlatChain>({
    chainId: '56',
    chainName: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    symbol: 'BNB',
    decimals: '18',
    currencyName: 'BNB'
    // chainId: '5',
    // chainName: 'goerli',
    // rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    // symbol: 'ETH',
    // decimals: '18',
    // currencyName: 'goerli Ether'
  })
  const [adding, setAdding] = useState(false)
  const handelAdd = useHandleAdd(chain, setAdding, closeAdd)

  const setChainInput = useCallback((event: any, key: string) => {
    setChain(chain => {
      return {
        ...chain,
        [key]: event?.target?.value
      }
    })
  }, [])


  const validChainId = useMemo(() => {
    return validNumberRequire(chain.chainId)
  }, [chain.chainId])
  const validChainName = useMemo(() => {
    return validStringRequire(chain.chainName)
  }, [chain.chainName])
  const validRpcUrl = useMemo(() => {
    return validStringRequire(chain.rpcUrl)
  }, [chain.rpcUrl])
  const validSymol = useMemo(() => {
    return validStringRequire(chain.symbol)
  }, [chain.symbol])
  const validDecimals = useMemo(() => {
    return validNumberRequire(chain.decimals)
  }, [chain.decimals])
  const validCurrencyName = useMemo(() => {
    return validStringRequire(chain.currencyName)
  }, [chain.currencyName])

  const isAddDisabled = useMemo(() => {
    if (validChainId.status !== 'error' 
    && validChainName.status !== 'error'
    && validRpcUrl.status !== 'error'
    && validSymol.status !== 'error'
    && validDecimals.status !== 'error'
    && validCurrencyName.status !== 'error'
  ) {
    return false
  } else {
    return true
  }
  }, [validChainId.status, validChainName.status, validCurrencyName.status, validDecimals.status, validRpcUrl.status, validSymol.status])
  
  return <div>
    <div>
        <Input 
          label = 'chain Id' 
          value = {chain.chainId} 
          placeholder = 'number'
          {...validChainId}
          onChange = {(event) => {setChainInput(event, 'chainId')}} />
      </div>
      <div>
        <Input 
          label = 'chain Name' 
          value = {chain.chainName} 
          placeholder = 'string'
          {...validChainName}
          onChange = {(event) => {setChainInput(event, 'chainName')}} />
      </div>
      <div>
        <Input 
          label = 'RPC URL' 
          value = {chain.rpcUrl} 
          placeholder = 'string'
          {...validRpcUrl}
          onChange = {(event) => {setChainInput(event, 'rpcUrl')}} />
      </div>
      <div>
        <Input 
          label = 'symbol' 
          value = {chain.symbol} 
          placeholder = 'string'
          {...validSymol}
          onChange = {(event) => {setChainInput(event, 'symbol')}} />
      </div>
      <div>
        <Input 
          label = 'decimals' 
          value = {chain.decimals} 
          placeholder = 'number'
          {...validDecimals}
          onChange = {(event) => {setChainInput(event, 'decimals')}} />
      </div>
      <div>
        <Input 
          label = 'currency name' 
          value = {chain.currencyName} 
          placeholder = 'string'
          {...validCurrencyName}
          onChange = {(event) => {setChainInput(event, 'currencyName')}} />
      </div>
    <Button onPress = {handelAdd} disabled = {adding || isAddDisabled}>
      添加
      {adding && <Loading color="currentColor" size="sm" />}
    </Button>
  </div>
}

export default ChainAdd