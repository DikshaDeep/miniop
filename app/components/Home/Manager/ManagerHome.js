import React from "react";
import { Button, View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "../../../Utility/GlobalStyles";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";
import {removeAsync} from '../../../Utility/AsyncStorageUtil';

export default class ManagerHome extends React.Component {
  constructor(props) {
    super(props);
  }

  showListOfOrder = () => {
    this.props.navigation.navigate(SCREENS.LISTORDER);
  };
  showTaskList = () => {
    this.props.navigation.navigate(SCREENS.TASKLIST);
  };
  showListMachine = () => {
    this.props.navigation.navigate(SCREENS.LISTMACHINE);
  };
  showListProduct = () => {
    this.props.navigation.navigate(SCREENS.LISTPRODUCT, { type: "manager" });
  };
  showListBatchid = () => {
    this.props.navigation.navigate(SCREENS.MANAGERBATCHIDLIST, {
      type: "manager",
    });
  };
  showManagerLabelList = () => {
    this.props.navigation.navigate(SCREENS.MANAGERLABELLIST,{type:"ManageLabels"});
  };

  logout = async () => {
    await removeAsync("@userToken");
    this.props.navigation.navigate(SCREENS.LOGIN);
  }

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <TouchableOpacity
          style={styles.backView}
          // onPress={() => this.logout()}
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.listHeaderText}>{"Home"}</Text>
        </View>

        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.logout()}
        >
         <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.LOG_OUT}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    
    return (
      <View>
        {this.header()}
        <TouchableOpacity
          onPress={() => this.showListMachine()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
                alignSelf: 'stretch',
                textAlign: 'center'
              }}
            >
              Manage Machine{'   '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.showListProduct()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              Manage Products{'   '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.showListBatchid()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              View Batches{'  '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.showManagerLabelList()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              Manage Labels{'  '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.showListOfOrder()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              Order List{'  '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.showTaskList()}
          style={{
            alignItems: "flex-start",
            margin: 20,
          }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              Task List
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userButtonViewStyle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.blue,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  back: {
    width: 25,
    height: 15,
  },
  listHeaderText: {
    marginLeft: 20,
    fontSize: 16,
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
    zIndex: 1000,
  },
  headerTextView: {
    flex: 0.6,
  },
  addbtnView: {
    flex: 0.3,
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingRight: 16,
  },
});
