import { ethers} from "ethers";

const createProvide = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_rinkeby"
  );

  return provider
}

export default createProvide