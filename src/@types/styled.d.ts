import 'styled-components';
import { defaultTheme } from '@theme/index'

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}