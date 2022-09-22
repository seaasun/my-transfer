import {ethers} from 'ethers'
import { useEffect } from 'react'
import { setSender } from '../stores/sender';

const onSwitch = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  provider.on("network", (newNetwork, oldNetwork) => {
    
    setSender(sender => {
      sender.web3Chain = {
        chainId: newNetwork,
        endAddress: newNetwork.endAddress,
        name: newNetwork.name
      }
    })
});
}

const useOnSwitch = () => {
  useEffect(() => {
    onSwitch()
  }, [])
}

export default useOnSwitch