/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class OrderStore {
  @observable orderList = null;
  @observable showLoader = false;
  @observable orderId ='';
  @observable orderDetail = null;

  
  async setOrderList(data) {
    this.orderList = data.orderList;
  }

  async setOrderDetail(data) {
    this.orderDetail = data;
  }

  @action 
  list = async () => {
    const url = URL.LIST_ALL_ORDER;
    let response = await callRemoteMethod(url, 'POST', '', true);
    if (response && response.data) {
      console.log('response-----', response.data);
      this.setOrderList(response.data);
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_ORDER;
    const apiData = data;
    let response = await callRemoteMethod(url, 'POST', apiData, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      
      this.list();
      return response.data;
    }
  };

  @action 
  details = async (data) => {
    const url = URL.LIST_ONE_ORDER;
    let response = await callRemoteMethod(url, 'POST', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.setOrderDetail(response.data);
    }
  };

  @action 
  update = async (data) => {
    const url = URL.UPDATE_ORDER;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

      // this.orderDetails(response.data);
    }
  };

  @action 
  delete = async (data) => {
    const url = URL.DELETE_ORDER;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {

      // this.orderDetails(response.data);
    }
  };
}

export default new OrderStore();
