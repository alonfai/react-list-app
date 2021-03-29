import { extendTheme, ThemeOverride } from '@chakra-ui/react';

/**
 * Pre-defined set of custom themeing object used in the Chakra-UI provider
 */
export default extendTheme({
  styles: {
    global: {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        bgColor: '#F2F3F8',
        opacity: 1,
      },
      '#root': {
        height: '100%',
      },
    },
  },
  fonts: {
    heading: "'MarkPro-Heavy', 'MarkPro-Bold', 'SFProText-Medium', 'SFProText-Regular'",
    body: "'MarkPro-Heavy', 'MarkPro-Bold', 'SFProText-Medium', 'SFProText-Regular'",
  },
}) as ThemeOverride;
