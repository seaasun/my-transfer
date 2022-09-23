import { ethers } from "ethers";

const getPivateKey: (monics: string[]) => {
  privateKey: string;
  publicKey: string;
} = (monics: string[]) => {

  const monic = monics.join(" ");
  
  try {
    const mnemonic = ethers.Wallet.fromMnemonic(monic);
    
    return {
      privateKey: mnemonic.privateKey,
      publicKey: mnemonic.address,
    };
  } catch {
    return {
      privateKey: "",
      publicKey: "",
    };
  }
};

export default getPivateKey;
