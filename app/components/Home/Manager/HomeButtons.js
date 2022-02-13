import React from "react";
import {View,FlatList, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import { observer, inject } from "mobx-react";
import CustomTabItem from "../../../ReusableComponents/CustomTabItem";
import ImagePath from '../../../Utility/ImagePath';
import { observable } from "mobx";
const data_item =[
  {
    id: "1",
    name: "Admin",
    image: ImagePath.ADMIN_BK,
    activity: "ListUser",
    location: "ListUser"
  },
  {
    id: "2",
    name: "Manager",
    image: ImagePath.MANAGER_BK,
    activity: "ManagerHome",
    location: "ManagerHome"
  },
  {
    id: "3",
    name: "User",
    image: ImagePath.USER_BK,
    activity: "UserHome",
    location: "UserHome"
  }
  
  
 
];
@inject("LoginStore", "GlobalStore")
@observer
export default class HomeButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  handleNaviagation = (activity) => {
     
    this.props.navigation.navigate(activity);
  };

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.listHeaderText}>{"Home"}</Text>  
      </View>
    );
  };

  render() {
    const {LoginStore} = this.props;
    //alert(JSON.stringify(LoginStore.userDetails))
    return (
      <View style={styles.container}>
        {this.header()}
        <FlatList
       data={data_item}
       keyExtractor={item => item.id}
       renderItem={({ item }) => (
         <CustomTabItem
           name={item.name}
           image={item.image}
           handleNaviagation={() => this.handleNaviagation(item.activity)}
         />
       )}
     />
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:GlobalStyles.colorCodes.white,
  },
  header: {
    height:44,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight:'bold',
    color: GlobalStyles.colorCodes.charcoalGrey,
  },
  shadow: {
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 50,
  },
});
