import { StatusBar } from 'react-native';
import {ThemeProvider} from 'styled-components/native'
import {useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';
import { defaultTheme } from './src/theme';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  return (
      <ThemeProvider theme={defaultTheme}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        
        {fontsLoaded ? <Routes /> : <Loading />}
      </ThemeProvider>
  );
}
