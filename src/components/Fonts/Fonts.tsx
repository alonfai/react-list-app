import { css, Global } from '@emotion/react';

const Fonts = () => {
  return (
    <Global
      styles={css`
        /* @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,200&display=swap'); */
        html {
          @font-face {
            font-family: 'MarkPro-Bold';
            src: url('${process.env.REACT_APP_PUBLIC_URL}/fonts/MarkPro-Bold.otf') format('otf');
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
          }
          @font-face {
            font-family: 'MarkPro-Heavy';
            src: url'(${process.env.REACT_APP_PUBLIC_URL}/fonts/MarkPro-Heavy.otf') format('otf');
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
          }
          @font-face {
            font-family: 'SFProText-Medium';
            src: url('${process.env.REACT_APP_PUBLIC_URL}/fonts/SFProText-Medium.otf') format('otf');
            font-style: normal;
            font-stretch: normal;
          }
          @font-face {
            font-family: 'SFProText-Regular';
            src: url('${process.env.REACT_APP_PUBLIC_URL}/fonts/SFProText-Regular.otf')
              format('otf');
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
          }
        }
      `}
    />
  );
};

export default Fonts;
