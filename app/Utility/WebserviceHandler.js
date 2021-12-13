/**
 * Common WebService Handler Component
 * @author Raman kant
 * @flow
 */
import NetInfo from '@react-native-community/netinfo';

import {customAlert, showAlertWithDelay} from './CommonFunctions';
import {getAsync, removeAsync} from '../Utility/AsyncStorageUtil';
window.btoa = require('Base64').btoa;
const axios = require('axios');
import {URL, ASYNC_KEYS} from '../Utility/Constants';
const tokenRequiredAPI = [
  URL.LIST_USER,
  URL.LIST_ALL_ORDER,
  URL.CREATE_ORDER,
  URL.LIST_ONE_ORDER,
  URL.UPDATE_ORDER,
  URL.DELETE_ORDER
];
export async function callRemoteMethod(
  url,
  type = 'GET',
  data,
  successKey = true,
) {
  const method = type.toLowerCase();
  try {
    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected) {
      let options = {
        method: method,
        url: url,
        headers: await getRequestHeader(url),
      };
      (type === 'POST' || type === 'PUT' || type === 'DELETE') && (options.data = data);
     // type === 'POST' ? (options.data = data) : null;
     console.log('option val='+JSON.stringify(options));
     const response = await axios(options);
      if (response.status === 200) {
        if (successKey) {
          if (response)
           {
            return response.data;
          } else if (response && response.data.message) {
            customAlert(response.data.message);
          }
        } else {
          return response.data;
        }
      } else {
        throw {response: response};
      }
    } else {
      customAlert('Please check your internet connection!!');
    }
  } catch (err) {
    console.log('err', err)
    if (err.response && err.response.status) {
      handleStatus(err.response);
    } else {
      customAlert('Internal Server Error');
    }
  }
}

function handleStatus(response) {
  //TODO MAY CHANGE IN FUTURE W.R.T CONDITIONS
  switch (response.status) {
    case 400:
      customAlert(response.data.message);
      console.warn('Bad request');
      break;
    case 401:
      customAlert(response.data.message);
      console.warn('Unauthorized Access');
      break;
    case 403:
      customAlert(response.data.message);
      console.warn('Forbidden Access');
      break;
    case 404:
      console.warn('Page not Found');
      break;
    case 500:
      console.warn('Internal Server Error');
      break;
    default:
      console.warn('Something went wrong! Please try again later.');
  }
}
async function getRequestHeader(url) {
 const token = await getAsync(ASYNC_KEYS.ACCESS_TOKEN);
  var header = {  
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  header.Authorization = `Bearer ${token}`;
  const isToken = tokenRequiredAPI.findIndex(ele => {
    return url.includes(ele);
  });
  if (isToken !== -1) {
    header.Authorization = `Bearer ${token}`;
   }
  return header;
}


/**
 * @author Raman Kant
 * @description function called if there is a failure in API call
 */
export async function onFailure(response) {
  if (response.data.success === false) {
    showAlertWithDelay(response.data.errormsg);
    return false;
  }
  return true;
}
