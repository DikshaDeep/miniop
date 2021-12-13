/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class OrderJobDistributionStore {
  @observable userToken = '';
  @observable listOrderJobDistribution = [];
  @observable orderJobDistibutionDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_ORDER_JOB_DISTRIBUTION;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    console.log(response);
    this.showLoader = false;
    if (response && response.data) {
        this.listOrderJobDistribution = response.data ? response.data.result : [];
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_ORDER_JOB_DISTRIBUTION;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.orderJobDistibutionDetails = response.data.orderList;
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_ORDER_JOB_DISTRIBUTION;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.orderJobDistibutionDetails = response.data;
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_ORDER_JOB_DISTRIBUTION;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_ORDER_JOB_DISTRIBUTION;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_ORDER_JOB_DISTRIBUTION;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };
}

export default new OrderJobDistributionStore();
