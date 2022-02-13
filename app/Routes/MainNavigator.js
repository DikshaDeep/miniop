import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

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

const MainNavigator = (props) => {
  const [token, setToken,setRole] = useState();
   setAsyncToken(setToken);
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

export default MainNavigator;
