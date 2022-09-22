import {ethers} from 'ethers'
import { useEffect } from 'react'

const onSwitch = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  provider.on("network", (newNetwork, oldNetwork) => {
    // // When a Provider makes its initial connection, it emits a "network"
    // // event with a null oldNetwork along with the newNetwork. So, if the
    // // oldNetwork exists, it represents a changing network
    // if (oldNetwork) {
    //     window.location.reload();
    // }
    console.log(3221, newNetwork)
});
}

const useOnSwitch = () => {
  useEffect(() => {
    onSwitch()
  }, [])
}

export default useOnSwitch