import * as React from 'react';
import { Image } from '@chakra-ui/react';
import { Types } from 'api';
import bitcoinLogo from 'icons/currencies/bitcoin.svg';
import chainlinkLogo from 'icons/currencies/chainlink.svg';
import ethereumLogo from 'icons/currencies/ethereum.svg';
import rippleLogo from 'icons/currencies/ripple.svg';

export type Props = {
  asset: Types.CrpytoAsset;
};

export const Logo: React.FC<Props> = ({ asset }) => {
  let src = '';
  switch (asset) {
    case 'BTC':
      src = bitcoinLogo;
      break;
    case 'ETH':
      src = ethereumLogo;
      break;
    case 'LINK':
      src = chainlinkLogo;
      break;
    case 'XRP':
      src = rippleLogo;
      break;
  }

  return <Image boxSize='20px' objectFit='cover' src={src} alt={asset} />;
};

export default Logo;
