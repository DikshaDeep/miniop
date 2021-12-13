/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class BatchStore {
  @observable userToken = '';
  @observable listBatch = [];
  @observable batchDetails = null;

  @action resetStore = () => {
   
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_BATCH;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);

    this.showLoader = false;
    if (response) {
      response.data.batchList.map(item => 
        {
          item.label = item._id;
          item.value = item._id
        });
        this.listBatch = response.data ? response.data.batchList : [];
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_BATCH;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- details', response)
    if (response && response.data) {
      this.batchDetails = response.data.batch;
    }
  };
  
  @action 
  listByShiftAndDay = async (data) => {
    const url = URL.LIST_BATCH_BY_SHIFT_AND_DAY;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- listByShiftAndDay', response)
    if (response && response.data) {
      this.listBatch = response.data;
    }
  };

  @action 
  listByOrder = async (data) => {
    const url = URL.LIST_BATCH_BY_ORDER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- listByOrder', response)
    if (response && response.data) {
      this.listBatch = response.data;
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_BATCH;
    console.log('data..', data)
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- create', response)
    if (response && response.data) {
      this.list();
      this.batchDetails = response.data;
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_BATCH;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- update', response)
    if (response && response.data) {
      await this.list();
      return response.data.batch;
    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_BATCH;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- delete', response)
    if (response && response.data) {
      this.list();
    }
  };
}

export default new BatchStore();
