/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from './src/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import { StoreProvider } from './src/store/provider';
import { RootStore } from './src/store';
import { Provider } from 'mobx-react';


function App(): React.JSX.Element {

  
  return (
    <SafeAreaProvider>
      <Provider store={RootStore}>
        <RootNavigation />
      </Provider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({});

export default App;
