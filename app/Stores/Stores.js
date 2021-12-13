/**
 * Raman Kant
 */

import GlobalStore from './GlobalStore';
import LoginStore from './LoginStore';
import UserStore from './UserStore';
import OrderStore from './OrderStore';
import ProductStore from './ProductStore';
import MachineStore from './MachineStore';
import ManagerStore from './ManagerStore';
import OrderJobStore from './OrderJobStore';
import OrderJobDistributionStore from './OrderJobDistributionStore';
import OrderJobDistributionAssignedStore from './OrderJobDistributionStoreAssigned';
import BatchStore from './BatchStore';
import BatchMachineStore from './BatchMachineStore';
import BatchMachineProductStore from './BatchMachineProductStore';
import BatchMachineProductBoxStore from './BatchMachineProductBoxStore';

const stores = {
  GlobalStore,
  LoginStore,
  UserStore,
  OrderStore,
  OrderJobStore,
  OrderJobDistributionStore,
  OrderJobDistributionAssignedStore,
  ProductStore,
  MachineStore,
  ManagerStore,
  BatchStore,
  BatchMachineStore,
  BatchMachineProductStore,
  BatchMachineProductBoxStore
};

export default stores;
