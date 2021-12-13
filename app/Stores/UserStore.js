/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class UserStore {
  @observable userToken = '';
  @observable listUserData = [];
  @observable userDetails = null;

  @action resetStore = () => {
   
  };
  

  @action listUserApi = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_USER;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    this.showLoader = false;
    if (response.data) {
      response.data.userList.map(item => {
        item.label = item.name;
        item.value = item._id;
      })
      this.listUserData = response.data ? response.data.userList: [];
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_USER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.code === 200) {
      return response;
    }
  };

  @action 
  activate = async (data) => {
    const url = URL.ACTIVATE_USER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.code === 200) {
      this.details(data);
      return response;
    }
  };

  @action 
  deActivate = async (data) => {
    const url = URL.DEACTIVATE_USER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.code === 200) {
      this.details(data);
      return response;
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_USER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.userDetails = response.data;
      return response.data;
    }
  };

  @action 
  update = async (data) => {
    const url = URL.UPDATE_USER;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_USER;
    let response = await callRemoteMethod(url, 'DELETE', data, true);
    console.log('response--------- response', response)
    if (response && response.code == 200) {
      this.listUserApi();
    }
  };
}

export default new UserStore();
