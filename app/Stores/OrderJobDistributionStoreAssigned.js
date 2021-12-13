/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class OrderJobDistributionAssignedStore {
  @observable userToken = '';
  @observable listOrderJobDistributionAssigned = [];
  @observable orderJobDistibutionAssignedDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    this.showLoader = false;
    if (response) {
        this.listOrderJobDistributionAssigned = response.data ? response.data:{};
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.data) {
      this.orderJobDistibutionAssignedDetails = response.data;
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.data) {
      this.orderJobDistibutionAssignedDetails = response.data;
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {

    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_ORDER_JOB_DISTRIBUTION_ASSIGNED;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {

    }
  };
}

export default new OrderJobDistributionAssignedStore();
