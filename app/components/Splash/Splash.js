/**
 * Splash Component
 * Raman Kant

 */

import React from 'react';
import {StyleSheet, View,Image} from 'react-native';
import {observer, inject} from 'mobx-react';
import ImagePath from '../../Utility/ImagePath';
@inject('GlobalStore')
@observer
class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          disableRtl
          resizeMode={'contain'}
          style={styles.appLogo}
          source={ImagePath.APP_LOGO}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLogo: {
    height: 60,
    width: 200,
  },
});

export default Splash;
