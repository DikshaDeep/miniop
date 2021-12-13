/**
 * Constants
 * @author Raman Kant
 * @flow
 */

import ENV from "./Environment";
export const SCREENS = {
  REGISTRATION: "Registration",
  USERUPDATE: "UserUpdate",

  LOGIN: "Login",
  CHANGEPASSWORD: "ChangePassword",

  JOBVIEW: "JobView",
  CREATEMACHINEQTY: "CreateMachineQty",
  UPDATEPRIORITYQUANTITY:"UpdatePriorityQuantity",
  CREATEORDERJOB:"CreateOrderJob",
  USERQUANTITY: "UserQuantity",
  CREATEORDER: "CreateOrder",
  MANAGERCREATEPRODUCT: "ManagerCreateProduct",
  AddMACHINE: "AddMachine",
  MANAGERHOME: "ManagerHome",
  LISTMACHINE: "ListMachine",
  MANAGERPRODUCTLIST: "ManagerProductList",
  MANAGERELEMENTSLIST: "ManagerElementsList",
  LISTUSER: "ListUser",
  MACHINEJOBS: "MachineJobs",
  MACHINETASKLIST: "MachineTaskList",
  MANAGERLABELLIST: "ManagerLabelList",
  HOMEBUTTONS: "HomeButtons",

  TASKLIST: "TaskList",

  USERHOME: "UserHome",
  USERBUTTONS: "UserButtons",
  ADDBATCHID: "AddBatchId",
  ADDLABEL: "AddLabel",
  ADDPRODUCT: "AddProduct",
  ADDELEMENTS: "AddElements",
  USERLABELLIST: "UserLabelList",
  USERPRODUCTLIST: "UserProductList",
  USERELEMENTSLIST: "UserElementsList",
  MANAGERBATCHIDLIST: "ManagerBatchidList",
  LISTBATCHID: "ListBatchid",
  LISTLABEL: "ListLabel",
  LISTPRODUCT: "ListProduct",
  LISTELEMENT: "ListElement",
  LISTSUMMARY: "ListSummary",
  LISTORDER: "ListOrder",

  SPLASH: "Splash",
}

export const KEYS = {
  GOOGLE_MAPS: "",
}

export const ASYNC_KEYS = {
  ACCESS_TOKEN: "@userToken",
  LAUNCHED: '@launched',
  GUEST_USER_FIRSTNAME: '@guestUserFirstname',
  GUEST_USER_LASTNAME: '@guestUserLastname',
  USER_DETAILS: '@userDetails',
  USER_ROLE: '@userRole',
}

export const URL = {
  LOGIN_API: `${ENV.API_HOST}api/auth/login`,

  LIST_USER: `${ENV.API_HOST}api/protected/user/list/user/`,
  LIST_ONE_USER: `${ENV.API_HOST}api/protected/user/details`,
  ACTIVATE_USER: `${ENV.API_HOST}api/protected/user/activate`,
  DEACTIVATE_USER: `${ENV.API_HOST}api/protected/user/deactivate`,
  CREATE_USER: `${ENV.API_HOST}api/protected/user/usersignup`,
  UPDATE_USER: `${ENV.API_HOST}api/protected/user/updateuser`,
  DELETE_USER: `${ENV.API_HOST}api/protected/user/delete`,

  LIST_ALL_MANAGER: `${ENV.API_HOST}api/protected/user/list/manager`,
  CREATE_MANAGER: `${ENV.API_HOST}api/protected/user/managersignup`,
  UPDATE_MANAGER: `${ENV.API_HOST}api/protected/user/updatemanager`,

  LIST_ALL_ORDER: `${ENV.API_HOST}api/protected/order/getAll`,
  LIST_ONE_ORDER: `${ENV.API_HOST}api/protected/order/getOne`,
  CREATE_ORDER: `${ENV.API_HOST}api/protected/order/create`,
  UPDATE_ORDER: `${ENV.API_HOST}api/protected/order/update`,
  DELETE_ORDER: `${ENV.API_HOST}api/protected/order/delete`,

  LIST_ALL_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/getAll`,
  LIST_ONE_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/getOne`,
  CREATE_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/insert`,
  UPDATE_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/updateOne`,
  UPDATE_ALL_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/updateAll`,
  DELETE_ORDER_JOB: `${ENV.API_HOST}api/protected/orderjob/deleteOne`,

  LIST_ALL_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/getAll`,
  LIST_ONE_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/getOne`,
  CREATE_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/insert`,
  UPDATE_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/updateOne`,
  UPDATE_ALL_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/updateAll`,
  DELETE_ORDER_JOB_DISTRIBUTION: `${ENV.API_HOST}api/protected/orderjobdistribution/deleteOne`,
  
  LIST_ALL_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}api/protected/orderjobdistributionassigned/getAll`,
  LIST_ONE_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}aapi/protected/orderjobdistributionassigned/getOne`,
  CREATE_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}api/protected/orderjobdistributionassigned/insert`,
  UPDATE_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}api/protected/orderjobdistributionassigned/updateOne`,
  UPDATE_ALL_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}api/protected/orderjobdistributionassigned/updateAll`,
  DELETE_ORDER_JOB_DISTRIBUTION_ASSIGNED: `${ENV.API_HOST}api/protected/orderjobdistributionassigned/deleteOne`,

  CREATE_PRODUCT: `${ENV.API_HOST}api/protected/product`,
  FIND_ONE_PRODUCT: `${ENV.API_HOST}api/protected/product/getOne`,
  GET_ALL_PRODUCT: `${ENV.API_HOST}api/protected/product/getAll`,
  UPDATE_PRODUCT: `${ENV.API_HOST}api/protected/product`,
  DELETE_PRODUCT: `${ENV.API_HOST}api/protected/product`,

  LIST_ALL_BATCH: `${ENV.API_HOST}api/protected/batch/getAll`,
  LIST_ONE_BATCH: `${ENV.API_HOST}api/protected/batch/getOne`,
  LIST_BATCH_BY_SHIFT_AND_DAY: `${ENV.API_HOST}api/protected/batch/getByShiftAndDate`,
  LIST_BATCH_BY_ORDER: `${ENV.API_HOST}api/protected/batch/listByOrderNumber`,
  CREATE_BATCH: `${ENV.API_HOST}api/protected/batch/create`,
  UPDATE_BATCH: `${ENV.API_HOST}api/protected/batch/update`,
  DELETE_BATCH: `${ENV.API_HOST}api/protected/batch/delete`,

  LIST_ALL_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/getAll`,
  LIST_ONE_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/getOne`,
  CREATE_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/insert`,
  UPDATE_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/updateOne`,
  UPDATE_ALL_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/updateAll`,
  DELETE_BATCH_MACHINE: `${ENV.API_HOST}api/protected/batchmachine/deleteOne`,

  LIST_ALL_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/getAll`,
  LIST_ONE_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/getOne`,
  CREATE_BATCH_MACHINE_PRODUCT:`${ENV.API_HOST}api/protected/batchmachineproduct/insert`,
  UPDATE_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/updateOne`,
  UPDATE_ALL_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/updateAll`,
  SHIFT_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/shiftproduct`,
  DELETE_BATCH_MACHINE_PRODUCT: `${ENV.API_HOST}api/protected/batchmachineproduct/deleteOne`,

  LIST_ALL_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/getAll`,
  LIST_ONE_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/getOne`,
  CREATE_BATCH_MACHINE_PRODUCT_BOX:`${ENV.API_HOST}api/protected/batchmachineproductbox/insert`,
  UPDATE_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/updateOne`,
  UPDATE_ALL_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/updateAll`,
  SHIFT_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/shiftBox`,
  DELETE_BATCH_MACHINE_PRODUCT_BOX: `${ENV.API_HOST}api/protected/batchmachineproductbox/deleteOne`,

  CREATE_MACHINE: `${ENV.API_HOST}api/protected/machine`,
  FIND_ONE_MACHINE: `${ENV.API_HOST}api/protected/machine/getOne`,
  GET_ALL_MACHINE: `${ENV.API_HOST}api/protected/machine/getAll`,
  UPDATE_MACHINE: `${ENV.API_HOST}api/protected/machine`,
  DELETE_MACHINE: `${ENV.API_HOST}api/protected/machine`,
}

export const Regex = {
  name: /^[\p{Arabic}a-zA-Z ]+\h?[\p{Arabic}a-zA-Z ]*$/,
  otp: /^\d{6}$/,
  lowercase: /[a-z]+/g,
  uppercase: /[A-Z]+/g,
  digits: /[\d]+/g,
  special: /[!@#$%^&*_]+/g,
  reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  number: /^[0-9]+$/,
  charnumber: /^[a-zA-Z0-9]+$/,
  countryCode: 91,
}

// export = {
//   URL,
//   Regex,
//   ASYNC_KEYS,
//   SCREENS
// };
