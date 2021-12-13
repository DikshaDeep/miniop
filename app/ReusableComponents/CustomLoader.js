/**
 * @author Raman Kant
 * @description Custom Loader
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, Modal, ActivityIndicator, View, Text } from 'react-native';
import GlobalStyles from '../Utility/GlobalStyles';

export default class CustomLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true
    }
  }

  /**
  * @author Nikita Singh
  * @description renders Loader
  * @flow
  */
  render() {
    const { showLoader } = this.state;
    return (
      <Modal animationType={"none"}
        transparent={true}
        visible={showLoader}  >
        <View style={styles.loaderView}>
          <View style={styles.loading}>
            <ActivityIndicator style={styles.loader} animating={showLoader} size="large" color={'black'} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  loaderView: {
    backgroundColor: GlobalStyles.colorCodes.loaderColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    alignSelf: 'center',
    opacity: 1
  },
  text: { marginLeft: 20, fontSize: 15 },
  loading: {
    backgroundColor: GlobalStyles.colorCodes.white,
    width: 100,
    height: 100,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    opacity: 0.6
  }
})
