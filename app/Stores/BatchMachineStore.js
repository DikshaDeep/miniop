/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class BatchMachineStore {
  @observable userToken = '';
  @observable listBatchMachine = [];
  @observable batchOrderDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_BATCH_MACHINE;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    console.log('response of batch machine get all', response.data)
    this.showLoader = false;
    if (response) {
        this.listBatchMachine = response.data ? response.data.orderList : [];
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_BATCH_MACHINE;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.batchOrderDetails = response.data.result[0];
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_BATCH_MACHINE;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('create--------- response', response)
    if (response && response.data) {
      this.list({ batch: { _id: data.batch._id } });
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_BATCH_MACHINE;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

      this.list({ batch: { _id: data.batch._id } });
      return response.data;
    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_BATCH_MACHINE;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list({ batch: { _id: response.data._id } });
    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_BATCH_MACHINE;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('delete--------- response', response)
    if (response && response.data) {
      this.list({ batch: { _id: data.batch._id } });
    }
  };
}

export default new BatchMachineStore();
