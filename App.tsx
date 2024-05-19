import {AppRegistry} from 'react-native';
import Routes from './components/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
        <Routes />
    </NavigationContainer>
  );
}



AppRegistry.registerComponent('Appname', () => App);


