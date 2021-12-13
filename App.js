/**
  Raman Kant
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, observer} from 'mobx-react';
import AppRouter from './app/Routes/MainNavigator';
import stores from './app/Stores/Stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getAsync} from './app/Utility/AsyncStorageUtil';
import {ASYNC_KEYS} from './app/Utility/Constants';
import SplashScreen from 'react-native-splash-screen';
import LoginStore from './app/Stores/LoginStore';
import {StatusBar} from 'react-native';
import GlobalStyles from './app/Utility/GlobalStyles';

@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launched: null,
    };
  }

  getFirstLaunch = async (launched) => {
    this.setState({
      launched: !launched,
    });
  };
  setStoreFomStorage = async () => {
    LoginStore.userDetails = await getAsync(ASYNC_KEYS.USER_DETAILS);
    let launched = await getAsync(ASYNC_KEYS.LAUNCHED);
    const token = await getAsync(ASYNC_KEYS.ACCESS_TOKEN);
    token && LoginStore.setUserToken(token);
    const role = await getAsync(ASYNC_KEYS.USER_ROLE);
    role && LoginStore.setUserRole(role);
    this.getFirstLaunch(launched);
  };
  async componentDidMount() {
    //  clearAsync();
    //  console.disableYellowBox = true;
    await this.setStoreFomStorage();
    SplashScreen.hide();
  }

  render() {
    const {launched} = this.state;
    return (
      <Provider {...stores}>
        <StatusBar
          backgroundColor={GlobalStyles.colorCodes.white}
          barStyle={'dark-content'}
        />
        <SafeAreaProvider>
          <NavigationContainer>
            {launched !== null && (
              <AppRouter launched={launched} />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
