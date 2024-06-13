'use client';

import React, { FC, useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useTheme } from 'next-themes';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ComputerIcon from '@mui/icons-material/Computer';

function ThemeUpdater() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={theme}
        onChange={(a) => setTheme(a.target.value)}
      >
        <MenuItem value="system"><ComputerIcon /></MenuItem>
        <MenuItem value="light"><WbSunnyIcon /></MenuItem>
        <MenuItem value="dark"><ModeNightIcon /></MenuItem>
      </Select>
    </div>
  );
}

export default ThemeUpdater;
