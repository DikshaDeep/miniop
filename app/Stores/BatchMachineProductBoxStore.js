/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {ASYNC_KEYS} from '../Utility/Constants';
import {setAsync} from '../Utility/AsyncStorageUtil';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class BatchMachineProductBoxStore {
  @observable userToken = '';
  @observable listBatchMachineProductBox = [];
  @observable batchOrderProductBoxDetails = null;

  @action resetStore = () => {
 
  };
  

  @action list = async (data) => {
    this.showLoader = true;
    let url = URL.LIST_ALL_BATCH_MACHINE_PRODUCT_BOX;
    const apidata = {};
    let response = await callRemoteMethod(url, 'POST', data, apidata);
    this.showLoader = false;
    if (response) {
        this.listBatchMachineProductBox = response.data ? response.data.result[0].machineoutput.products.boxes : [];
      return this.listBatchMachineProductBox;
      }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.data) {
      this.batchOrderProductBoxDetails = response.data.result[0];
      return response.data.result[0];
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.data) {
      this.batchOrderProductBoxDetails = response.data;
      this.list({
        "batch": {
          "_id": data.batch._id,
          "orderdata": {
             "_id": data.batch.machineoutput._id,
             "products": {
              "_id": data.batch.machineoutput.products._id
            }
          }
        }
      });
      return response.data;
    }
  };


  @action 
  update = async (data) => {
    const url = URL.UPDATE_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {
      this.list({
        "batch": {
          "_id": data.batch._id,
          "machineoutput": {
             "_id": data.batch.machineoutput._id,
             "products": {
              "_id": data.batch.machineoutput.products._id
            }
          }
        }
      });
    }
  };

  @action 
  updateAll = async (data) => {
    const url = URL.UPDATE_ALL_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {

    }
  };

  @action 
  shiftProduct = async (data) => {
    const url = URL.SHIFT_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {

    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_BATCH_MACHINE_PRODUCT_BOX;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {
      this.list({
        "batch": {
          "_id": data.batch._id,
          "machineoutput": {
             "_id": data.batch.machineoutput._id,
             "products": {
              "_id": data.batch.machineoutput.products._id
            }
          }
        }
      });
    }
  };
}

export default new BatchMachineProductBoxStore();
