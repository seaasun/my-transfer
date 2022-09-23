import { ethers} from "ethers";
import { snapshot } from "valtio";
import { senderState } from "../stores/sender";

const createProvide = async () => {
  const sender = snapshot(senderState)
  // const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  const provider = new ethers.providers.JsonRpcProvider(
    sender.chainRPC
  );

  return provider
}

export default createProvide