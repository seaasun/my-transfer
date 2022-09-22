import { ethers } from "ethers";

const getPivateKey: (monics: string[]) => {
  privateKey: string;
  publicKey: string;
} = (monics: string[]) => {
  if (monics.some((item) => item === "")) {
    return  {
      privateKey: "",
      publicKey: "",
    };
  }

  const monic = monics.join(" ");
  try {
    const mnemonic = ethers.Wallet.fromMnemonic(monic);
    return {
      privateKey: mnemonic.privateKey,
      publicKey: mnemonic.publicKey,
    };
  } catch {
    return {
      privateKey: "",
      publicKey: "",
    };
  }
};

export default getPivateKey;
