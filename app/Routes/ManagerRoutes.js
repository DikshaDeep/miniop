import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS, ASYNC_KEYS } from "../Utility/Constants";

import ChangePassword from "../components/Profile/ChangePassword";
import AddElements from "../components/Home/User/AddElements";
import CreateOrder from "../components/Home/Manager/CreateOrder";
import AddMachine from "../components/Home/Manager/AddMachine";
import ListBatchid from "../components/Home/User/ListBatchid";
import ListLabel from "../components/Home/User/ListLabel";
import ListProduct from "../components/Home/User/ListProduct";
import ListElement from "../components/Home/User/ListElement";
import ListOrder from "../components/Home/Manager/ListOrder";
import Registration from "../components/Home/Admin/Registration";
import MachineTaskList from "../components/Home/Manager/MachineTaskList";
import ManagerCreateProduct from "../components/Home/Manager/CreateProduct";
import JobView from "../components/Home/Manager/JobView";
import UserQuantity from "../components/Home/Manager/UserQuantity";
import CreateMachineQty from "../components/Home/Manager/CreateMachineQty";
import ManagerHome from "../components/Home/Manager/ManagerHome";
import UserLabelList from "../components/Home/User/UserLabelList";
import ListMachine from "./../components/Home/Manager/ListMachine";
import ManagerBatchidList from "../components/Home/Manager/ManagerBatchIdList";
import UserProductList from "./../components/Home/User/UserProductList";
import UserElementsList from "./../components/Home/User/UserElementList";
import MachineJobs from "./../components/Home/Manager/MachineJobs";
import TaskList from "./../components/Home/Manager/TaskList";
import UserButtons from "../components/Home/Manager/BatchListAndProductListButtons";
import ManagerLabelList from "./../components/Home/Manager/ManagerLabelList";
import HomeButtons from "./../components/Home/Manager/HomeButtons";
import ListUser from "./../components/Home/Admin/ListUser";
import UserUpdate from "./../components/Home/Admin/UserUpdate";
import ManagerProductList from "./../components/Home/Manager/ManagerProductList";
import ManagerElementsList from "./../components/Home/Manager/ManagerElementsList";
import UpdatePriorityQuantity from "./../components/Home/Manager/UpdatePriorityQuantity";
import CreateOrderJob from "./../components/Home/Manager/CreateOrderJob";

const Stack = createStackNavigator();

const ManagerStack = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERHOME}
        component={ManagerHome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.HOMEBUTTONS}
        component={HomeButtons}
        />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTMACHINE}
        component={ListMachine}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTELEMENT}
        component={ListElement}
        />
        <Stack.Screen
           options={{ headerShown: false }}
           name={SCREENS.LISTUSER}
           component={ListUser}
         />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERELEMENTSLIST}
        component={ManagerElementsList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.UPDATEPRIORITYQUANTITY}
        component={UpdatePriorityQuantity}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CREATEORDERJOB}
        component={CreateOrderJob}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MACHINEJOBS}
        component={MachineJobs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERPRODUCTLIST}
        component={ManagerProductList}
      />
     
     <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CHANGEPASSWORD}
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERBUTTONS}
        component={UserButtons}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.ADDELEMENTS}
        component={AddElements}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTORDER}
        component={ListOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.TASKLIST}
        component={TaskList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MACHINETASKLIST}
        component={MachineTaskList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTPRODUCT}
        component={ListProduct}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTBATCHID}
        component={ListBatchid}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTLABEL}
        component={ListLabel}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CREATEMACHINEQTY}
        component={CreateMachineQty}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERQUANTITY}
        component={UserQuantity}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.AddMACHINE}
        component={AddMachine}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERCREATEPRODUCT}
        component={ManagerCreateProduct}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.JOBVIEW}
        component={JobView}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CREATEORDER}
        component={CreateOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERLABELLIST}
        component={ManagerLabelList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.MANAGERBATCHIDLIST}
        component={ManagerBatchidList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERPRODUCTLIST}
        component={UserProductList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERELEMENTSLIST}
        component={UserElementsList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERLABELLIST}
        component={UserLabelList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.REGISTRATION}
        component={Registration}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERUPDATE}
        component={UserUpdate}
      />
    </Stack.Navigator>
  );
};

export default ManagerStack;

const styles = StyleSheet.create({
  tabBarImg: {
    width: 20,
    height: 20,
  },
  routeName: {
    fontSize: 12,
    marginTop: 5,
  },
  imageBack: {
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieImg: {
    height: 65,
    width: 65,
  },
  tabBarStyle: {
    alignItems: "center",
  },
  tabBarFocused: {
    backgroundColor: "#fdf3f3",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
