import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'nio-d-lab-region';

const REGION_CONFIG = {
  us: {
    id: 'us',
    label: 'US',
    flag: '🇺🇸',
    timeZone: 'America/New_York',
    primary: '#0A3161',
    primaryDark: '#4598ff',
    secondary: '#B31942',
    palettes: {
      light: {
        bg: '#f7f9fc',
        text: '#12233f',
        muted: '#57657f',
        surface: '#ffffff',
        border: '#d6dfed',
        accentHover: '#08284e',
        navbar: 'rgba(247, 249, 252, 0.86)',
        navbarScrolled: 'rgba(247, 249, 252, 0.96)',
      },
      dark: {
        bg: '#07111f',
        text: '#eef4ff',
        muted: '#a7b6d0',
        surface: '#10203a',
        border: '#233553',
        accentHover: '#35578b',
        navbar: 'rgba(7, 17, 31, 0.76)',
        navbarScrolled: 'rgba(7, 17, 31, 0.93)',
      },
    },
  },
  bahrain: {
    id: 'bahrain',
    label: 'Bahrain',
    flag: '🇧🇭',
    timeZone: 'Asia/Bahrain',
    primary: '#DA291C',
    secondary: '#1CCCDA',
    palettes: {
      light: {
        bg: '#fff8f7',
        text: '#341513',
        muted: '#7a5551',
        surface: '#ffffff',
        border: '#f0cdc8',
        accentHover: '#b92217',
        navbar: 'rgba(255, 248, 247, 0.88)',
        navbarScrolled: 'rgba(255, 248, 247, 0.96)',
      },
      dark: {
        bg: '#170b0c',
        text: '#fff1ee',
        muted: '#d5b5b0',
        surface: '#2a1517',
        border: '#4b2327',
        accentHover: '#f05549',
        navbar: 'rgba(23, 11, 12, 0.8)',
        navbarScrolled: 'rgba(23, 11, 12, 0.94)',
      },
    },
  },
};

const RegionThemeContext = createContext(null);

const getStoredRegion = () => {
  if (typeof window === 'undefined') {
    return 'us';
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  return storedValue && REGION_CONFIG[storedValue] ? storedValue : 'us';
};

const getModeForTimeZone = (timeZone, dateInput = Date.now()) => {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      hour12: false,
    }).format(new Date(dateInput))
  );

  return hour >= 6 && hour < 18 ? 'light' : 'dark';
};

const getRegionTimeLabel = (timeZone, dateInput = Date.now()) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateInput));

export const RegionThemeProvider = ({ children }) => {
  const [regionId, setRegionId] = useState(getStoredRegion);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, regionId);
  }, [regionId]);

  useEffect(() => {
    setNow(Date.now());
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [regionId]);

  const mode = useMemo(() => getModeForTimeZone(REGION_CONFIG[regionId].timeZone, now), [now, regionId]);

  useEffect(() => {
    const region = REGION_CONFIG[regionId];
    const palette = region.palettes[mode];
    const root = document.documentElement;

    root.dataset.region = region.id;
    root.dataset.mode = mode;
    root.style.setProperty('--color-bg', palette.bg);
    root.style.setProperty('--color-text', palette.text);
    root.style.setProperty('--color-text-muted', palette.muted);
    root.style.setProperty('--color-surface', palette.surface);
    root.style.setProperty('--color-border', palette.border);
    root.style.setProperty('--color-accent', mode === 'dark' && region.primaryDark ? region.primaryDark : region.primary);
    root.style.setProperty('--color-secondary', region.secondary);
    root.style.setProperty('--color-accent-hover', palette.accentHover);
    root.style.setProperty('--navbar-bg', palette.navbar);
    root.style.setProperty('--navbar-bg-scrolled', palette.navbarScrolled);
    root.style.colorScheme = mode;
  }, [regionId, mode]);

  const value = useMemo(() => {
    const region = REGION_CONFIG[regionId];

    return {
      mode,
      region,
      regionId,
      regions: Object.values(REGION_CONFIG),
      regionTime: getRegionTimeLabel(region.timeZone, now),
      setRegion: setRegionId,
    };
  }, [mode, now, regionId]);

  return <RegionThemeContext.Provider value={value}>{children}</RegionThemeContext.Provider>;
};

export const useRegionTheme = () => {
  const context = useContext(RegionThemeContext);

  if (!context) {
    throw new Error('useRegionTheme must be used within a RegionThemeProvider');
  }

  return context;
};
