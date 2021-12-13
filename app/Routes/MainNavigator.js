import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS, ASYNC_KEYS } from "../Utility/Constants";

// ASYNC UTIL
import { getAsync } from "../Utility/AsyncStorageUtil";
// STORE IMPORTED
import LoginStore from "../Stores/LoginStore";
// COMPONENTS IMPORTED
import LoginStack from "./AuthRoutes";
import UserStack from "./UserRoutes";
import ManagerStack from "./ManagerRoutes";
import AdminStack from "./AdminRoutes";

const Stack = createStackNavigator();

const setAsyncToken = async setToken => {
  let TOKEN = await getAsync('@userToken');
  TOKEN && setToken(TOKEN);
};

// const setAsyncRole = async setRole => {
//   let ROLE = await  getAsync(ASYNC_KEYS.USER_ROLE);
//   ROLE && setRole(ROLE);
// };

const MainNavigator = (props) => {
  const [token, setToken,setRole] = useState();
   setAsyncToken(setToken);
  // setAsyncRole(setRole);
    LoginStore.setTokenFunction(setToken);
    let getUserToken = LoginStore.userToken;
    let getRole = LoginStore.userRole;
  if (props.launched && getUserToken !=='') {
    if(getRole && getRole === 'admin'){
      return <AdminStack />;
    } else if(getRole && getRole === 'manager'){
      return <ManagerStack />;
    }
    else{
      return <UserStack />;
    }
  } else {
    return <LoginStack />;
  }
};

const RootRoutes = () => {
    return (
        <Stack.Screen 
            options={{ headerShown: false }}
            name={'MainNavigator'}
            component={MainNavigator}
        />
    )
}

export default MainNavigator;

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
