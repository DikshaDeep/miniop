import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS, ASYNC_KEYS } from "../Utility/Constants";

import Login from "../components/Login/Login";
import ChangePassword from "../components/Profile/ChangePassword";
import Registration from "../components/Home/Admin/Registration";
import UserHome from "../components/Home/User/UserHome";
// STORE IMPORTED
import LoginStore from "../Stores/LoginStore";

const Stack = createStackNavigator();

const Home = () => {
  LoginStore.setTokenFunction(setToken);
    let getUserToken = LoginStore.userToken;
    let getRole = LoginStore.userRole;
  if(getRole && getRole === 'admin'){
    return <AdminStack />;
  } else if(getRole && getRole === 'manager'){
    return <ManagerStack />;
  }
  else{
    return <UserStack />;
  }
}

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.LOGIN}
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Home'}
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.CHANGEPASSWORD}
        component={ChangePassword}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name={SCREENS.REGISTRATION}
        component={Registration}
      />
      
    </Stack.Navigator>
  );
};

export default LoginStack;

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
