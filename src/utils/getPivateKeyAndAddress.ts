import { ethers } from 'ethers';

const getPivateKeyAndAddress: (monics: string[]) => {
  privateKey: string;
  address: string;
} = (monics: string[]) => {
  const monic = monics.join(' ');

  try {
    const mnemonic = ethers.Wallet.fromMnemonic(monic);

    return {
      privateKey: mnemonic.privateKey,
      address: mnemonic.address,
    };
  } catch {
    return {
      privateKey: '',
      address: '',
    };
  }
};

export default getPivateKeyAndAddress;
