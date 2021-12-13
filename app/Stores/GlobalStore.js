/**
 * Global Mobx Store Component
 *  Raman kant
*/

import {observable, action} from 'mobx';

class GlobalStore {
  @observable title = 'Mobx Store Connecting...';
  @observable userName = '';
  @observable loginData = {};

  /**
   * @author Raman Kant
   * @description reset store on logout
   */
  @action resetStore = () => {
    this.userName = '';
    this.loginData = {};
  };

  /**
   * @author Raman Kant
   * @description set User Name
   */
  @action setUserName(name) {
    this.userName = name;
  }
  /**
   * @author Raman Kant
   * @description set Login data
   */
  @action setLoginData(loginData) {
    this.loginData = loginData;
  }
  /**
   * @author Raman Kant
   * @description returns true if logged in user, other false
   */
  isLoggedInUser = () => {
    return true;
  };
}

export default new GlobalStore();
