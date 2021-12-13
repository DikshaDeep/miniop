/**
 * Common Functions Utility
 * @author Raman kant
 * @flow
 */

import moment from 'moment';
import {Alert, Platform, Linking} from 'react-native';

/**
 * @author Raman Kant
 * @description Display alert with text whenever called.
 * @param message Message That you want to display.
 */
export function customAlert(message, callback = () => {}) {
  setTimeout(() => {
    Alert.alert('Miniop', message, [{text: 'OK', onPress: callback}], {
      cancelable: false,
    });
  }, 100);
}

/**
 * @author Raman Kant
 * @description Display alert with text whenever called.
 * @param message Message That you want to display.
 * @param callback called on ok press.
 */
export function customAlertWithCancel(message, callback = () => {}) {
  setTimeout(() => {
    Alert.alert(
      'Miniop',
      message,
      [{text: 'Yes', onPress: callback}, {text: 'Cancel', onPress: () => {}}],
      {cancelable: true},
    );
  }, 100);
}


/**
 * @author Raman Kant
 * @description Conditional rendering.
 * @param condition to be passed on which render will be checked.
 * @param content to be rendered on condition true.
 */
export function renderIf(condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

/**
 * @author Raman Kant
 * @description Returns current timestamp
 */
export function getTimeStamp() {
  const dateTime = new Date();
  const date = dateTime.toISOString().slice(0, 10);
  const time = dateTime.toISOString().slice(11, 19);
  const timestamp = `${date} ${time}`;
  return timestamp;
}

/**
 * @author Raman Kant
 * @description alert box
 */
export function showAlertWithDelay(message) {
  setTimeout(() => {
    Alert.alert('Miniop', message);
  }, 100);
}

/**
 * @author Raman Kant
 * @description gives a URL for GET API with embeded params
 */
export const getUrl = (baseUrl, paramObj) => {
  let url = baseUrl + '?';
  let paramKeyArray = Object.keys(paramObj);
  let length = paramKeyArray.length;
  paramKeyArray.map((key, index) => {
    url = url + key + '=' + paramObj[key];
    if (index !== length - 1) {
      url = url + '&';
    }
  });
  return url;
};

export const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        customAlert('incorrect phone number');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const timeFormat = time => {
  return moment(time).format("DD-MM-YYYY")
}
