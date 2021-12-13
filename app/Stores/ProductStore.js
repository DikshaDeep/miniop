/**
 * Login Mobx Store Component
 *  Raman Kant
*/

import {observable, action} from 'mobx';
import {URL} from '../Utility/Constants';
import {callRemoteMethod} from '../Utility/WebserviceHandler';

class ProductStore {
  @observable productList = [];
  @observable showLoader = false;
  @observable productId ='';
  @observable productDetail = null;

  
  async setProductList(data) {
    data.productList.map(item => {
      item.label = item.name;
      item.value = item.name;
    });
    this.productList = data.productList;
  }

  async setProductDetail(data) {
    this.productDetail = data;
  }

  @action 
  list = async () => {
    const url = URL.GET_ALL_PRODUCT;
    let response = await callRemoteMethod(url, 'GET', '', true);
    console.log('response--------- response', response)

    if (response && response.data) {
      this.setProductList(response.data);
      return response.data;
    }
  };

  @action 
  create = async (data) => {
    const url = URL.CREATE_PRODUCT;
    const apiData = data;
    let response = await callRemoteMethod(url, 'POST', apiData, true);
    if (response && response.data) {
      
      this.list();
      return response.data
    }
  };

  @action 
  details = async (data) => {
    const url = URL.FIND_ONE_PRODUCT;
    let response = await callRemoteMethod(url, 'POST', data, true);
    // console.log('response--------- response', response)
    if (response && response.data) {
      this.setProductDetail(response.data.product);
    }
  };

  @action 
  update = async (data) => {
    const url = URL.UPDATE_PRODUCT;
    let response = await callRemoteMethod(url, 'PUT', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list();
      // this.productDetails(response.data);
    }
  };

  @action 
  delete = async (data) => {
    console.log('data', data);
    const url = URL.DELETE_PRODUCT;
    let response = await callRemoteMethod(url, 'DELETE', data, true);
    console.log('response--------- response', response)
    if (response && response.data) {
      this.list();
      // this.productDetails(response.data);
    }
  };
}

export default new ProductStore();
