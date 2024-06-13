'use client';

import { ThemeProvider } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { darkTheme, lightTheme } from '../theme';

interface PageProviderProps {
  children: ReactNode;
}
function PageProvider({ children }: PageProviderProps) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  useEffect(() => {
    resolvedTheme === 'light'
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}
export default PageProvider;
