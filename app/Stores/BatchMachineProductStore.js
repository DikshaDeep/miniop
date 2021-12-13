/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class BatchMachineProductStore {
  @observable userToken = '';
  @observable listBatchMachineProduct = [];
  @observable batchOrderProductDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_BATCH_MACHINE_PRODUCT;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    console.log('response--------- response', response.data)
    this.showLoader = false;
    if (response) {
        this.listBatchMachineProduct = response.data ? response.data.result : [];
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'POST', data, true);
   
    if (response && response.data) {
      this.batchOrderProductDetails = response.data.result[0];
      return response.data.result[0];
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.batchOrderProductDetails = response.data;
      this.list({ batch: { _id: data.batch._id, machineoutput: {_id: data.batch.machineoutput._id} } })
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list({ batch: { _id: data.batch._id, machineoutput: {_id: data.batch.machineoutput._id} } });
      return response.data;
    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  shiftProduct = async (data) => {
    const url = URL.SHIFT_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_BATCH_MACHINE_PRODUCT;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list({ batch: { _id: data.batch._id, machineoutput: {_id: data.batch.machineoutput._id} } });
      return response.data;
    }
  };
}

export default new BatchMachineProductStore();
