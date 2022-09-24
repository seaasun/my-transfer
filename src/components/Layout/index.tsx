import { NextUIProvider, Spacer } from '@nextui-org/react';
import { memo } from 'react';
import Box from '../Box';

type TLayout = {
  children: React.ReactNode;
};

const Layout = memo(({ children }: TLayout) => {
  return (
    <NextUIProvider>
      <Box
        css={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <Box
          css={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 24,
            paddingRight: 24,
            maxWidth: 800,
          }}
        >
          <Box css={{ width: '100%', maxWidth: 600 }}>
            <Spacer y={2} />
            {children}
            <Spacer y={2} />
          </Box>
        </Box>
        <Box
          css={{
            display: 'none',
            '@xs': {
              display: 'block',
            },
            flexGrow: 1,
            opacity: 1,
            background: '#CCC',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1515856251934-766e064d7b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=160")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Box>
    </NextUIProvider>
  );
});

export default Layout;
