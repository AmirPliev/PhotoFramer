/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#E0E2DB';
const tintColorDark = '#071E22';

export const Colors = {
  light: {
    text: '#1B0E0E',
    background: '#BEB7A4',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#BEB7A4',
    background: '#1B0E0E',
    tint: tintColorDark,
    icon: '#BEB7A4',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
