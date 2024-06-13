import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from 'next-themes';
import StoreProvider from './StoreProvider';
import PageProvider from './providers/pageProvider';
import ThemeUpdater from './components/ThemeUpdater';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="es">
        <body>
          <ThemeProvider>
            <AppRouterCacheProvider>
              <PageProvider>
                <CssBaseline />
                <div style={{ padding: 20 }}>
                  <ThemeUpdater />
                </div>
                {children}
              </PageProvider>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
