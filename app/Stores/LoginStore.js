/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class LoginStore {
  @observable userToken = '';
  @observable userDetails = null;
  @observable showLoader = false;
  @observable userRole ='';
  @observable name = 'NAME';

  @action resetStore = () => {
    this.userToken = '';
    this.userRole = '';
  };
  

  tokenFunction = null;
  roleFunction = null;
  @action setUserToken(token) {
    this.userToken = token;
  }

  @action setUserRole(role) {
    this.userRole = role;
  }

  setTokenFunction(tokenFunction) {
    this.tokenFunction = tokenFunction;
  }
  setRoleFunction(roleFunction) {
    this.roleFunction = roleFunction;
  }
  async authFunction(usertoken) {
    await setAsync(ASYNC_KEYS.ACCESS_TOKEN, usertoken);
    //await this.getUserDetails();
    this.tokenFunction(true);
    this.userToken = usertoken;
  }
  async updateUserData(data) {
    this.userDetails = data;
    this.userRole = data.role;
    this.Name = data.name;
    await setAsync(ASYNC_KEYS.USER_ROLE, data.role);
    await setAsync(ASYNC_KEYS.USER_DETAILS, data);
  }
  @action getUserDetails = async () => {
    const url = URL.USER_DETAILS;
    let response = await callRemoteMethod(url, 'GET', '', false);
    if (response && response.data) {
      this.updateUserData(response.data);
    }
  };
  /**
   * @author Raman Kant
   * @description login user
   */
  @action login = async (email, password) => {
    this.showLoader = true;
    let url = URL.LOGIN_API;
    const apiData = {
      email: email.trim(),
      password: password.trim(),
      role:'user',
    };
    console.log('----before login api-----');
    console.log('url '+ url);
    console.log(apiData);
    let response = await callRemoteMethod(url, 'POST', apiData);
    console.log('----after login api-----');
    console.log(response);
    this.showLoader = false;
    if (response) {
      this.authFunction(response.token);
      this.updateUserData(response.userData);
      return response;
    }
  };
}

export default new LoginStore();
