/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class OrderJobStore {
  @observable userToken = '';
  @observable listOrderJob = [];
  @observable orderJobDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_ORDER_JOB;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    this.showLoader = false;
    if (response) {
      this.listOrderJob = response.data ? response.data.orderList :{};
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_ORDER_JOB;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.orderJobDetails = response.data;
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_ORDER_JOB;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.orderJobDetails = response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_ORDER_JOB;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list(data);
      return response.data;
    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_ORDER_JOB;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_ORDER_JOB;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list(data);
    }
  };
}

export default new OrderJobStore();
