import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS, ASYNC_KEYS } from "../Utility/Constants";

// ASYNC UTIL
import { getAsync } from "../Utility/AsyncStorageUtil";
// STORE IMPORTED
import AddBatchId from "../components/Home/User/AddBatchId";
import AddLabel from "../components/Home/User/AddLabel";
import AddProduct from "../components/Home/User/AddProduct";
import AddElements from "../components/Home/User/AddElements";
import CreateOrder from "../components/Home/Manager/CreateOrder";
import ListBatchid from "../components/Home/User/ListBatchid";
import ListLabel from "../components/Home/User/ListLabel";
import ListProduct from "../components/Home/User/ListProduct";
import ListElement from "../components/Home/User/ListElement";
import ListSummary from "../components/Product/ListSummary";
import UserHome from "../components/Home/User/UserHome";
import UserLabelList from "../components/Home/User/UserLabelList";
import UserProductList from "./../components/Home/User/UserProductList";
import UserElementsList from "./../components/Home/User/UserElementList";
import UserButtons from "../components/Home/Manager/BatchListAndProductListButtons";

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERHOME}
        component={UserHome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERBUTTONS}
        component={UserButtons}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERBATCHIDLIST}
        component={UserBatchidList}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CREATEORDER}
        component={CreateOrder}
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
        name={SCREENS.LISTELEMENT}
        component={ListElement}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.ADDELEMENTS}
        component={AddElements}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.USERLABELLIST}
        component={UserLabelList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LISTLABEL}
        component={ListLabel}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.ADDBATCHID}
        component={AddBatchId}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.ADDLABEL}
        component={AddLabel}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.ADDPRODUCT}
        component={AddProduct}
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
        name={SCREENS.LISTSUMMARY}
        component={ListSummary}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

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
