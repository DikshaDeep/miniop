/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class MachineStore {
  @observable machineList = [];
  @observable showLoader = false;
  @observable productId ='';
  @observable machineDetail = null;

  
  async setMachineList(data) {
    data.machineList.map(item => {item.label = item.name;
      item.value = item._id});
    this.machineList = data.machineList;
  }

  async setDetail(data) {
    this.machineDetail = data;
  }

  @action 
  list = async () => {
    const url = URL.GET_ALL_MACHINE;
    let response = await callRemoteMethod(url, 'GET', '', true);
    if (response && response.data) {
      this.setMachineList(response.data);
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_MACHINE;
    const apiData = data;
    let response = await callRemoteMethod(url, 'POST', apiData, true);
    
    if (response && response.data) {
      
      this.list();
    }
  };

  @action 
  details = async (data) => {
    const url = URL.FIND_ONE_MACHINE;
    let response = await callRemoteMethod(url, 'POST', data, true);
    if (response && response.data) {
      response.data.machine.label = response.data.machine.name;
      response.data.machine.value = response.data.machine._id;
      this.setDetail(response.data.machine);
    }
  };

  @action 
  update = async (data) => {
    const url = URL.UPDATE_MACHINE;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    if (response && response.data) {
      this.list();
      // this.productDetails(response.data);
    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_MACHINE;
    let response = await callRemoteMethod(url, 'DELETE', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list()
      // this.productDetails(response.data);
    }
  };
}

export default new MachineStore();
