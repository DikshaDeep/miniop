/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class ManagerStore {
  @observable userToken = '';
  @observable listManagers = [];
  @observable managerDetails = null;

  @action resetStore = () => {
   
  };
  

  @action listUserApi = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_MANAGER;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    this.showLoader = false;
    if (response) {
        this.listManagers = response.data ? response.data.userList:{};
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_MANAGER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.code === 200) {
      // this.managerDetails = response.data;
      return response;
    }
  };

  @action 
  update = async (data) => {
    const url = URL.UPDATE_USER;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.code == 200) {
      this.listUserApi()
      return response;
    }
  };

}

export default new ManagerStore();
