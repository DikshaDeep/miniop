import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import ImagePath from "../../../../Utility/ImagePath";
import GlobalStyles from "../../../../Utility/GlobalStyles";
import { inject, observer } from "mobx-react";
import { SCREENS } from "../../../../Utility/Constants";
import { observable } from "mobx";

@inject("LoginStore")
@observer
class UserLabelList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      ITEM_DATA: [
        {
          id: 1,
          labelName: "stock",
          orderid: 102,
        },
        {
          id: 2,
          labelName: "material",
          orderid: 102,
        },
        {
          id: 3,
          labelName: "gods",
          orderid: 102,
        },
      ],
    };
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.ADDLABEL);
  };

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.centerHeaderText}>{"List Label"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          // onPress={() => this.onPressGotoAction()}
        >
          {/* <Text style={styles.addText}>{"+"}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };
  onPressLabel = (labelName) => {
    this.props.navigation.navigate(SCREENS.USERPRODUCTLIST, {
      type: "Listproduct",
      labelname: labelName,
    });
  };

  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.onPressLabel(item.labelName)}
      >
        <View style={styles.mainView}>
          <View style={{ flex: 0.6 }}>
            <Text style={styles.labelNameStyle}>{item.labelName}</Text>
          </View>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.labelNameStyle1}>{item.orderid}</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: 50, marginTop: 2 }}>
            <Image
              resizeMode={"contain"}
              style={styles.back1}
              source={ImagePath.EDIT_ICON}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20, marginTop: 2 }}>
            <Image
              resizeMode={"contain"}
              style={styles.back1}
              source={ImagePath.DELETE_ICON}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  machinelistView = () => {
    return (
      <View style={styles.itemListViewStyle}>
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.4, marginLeft: 5 }}>
            <Text style={styles.headerNameStyle}>{"Customer Name"}</Text>
          </View>
          <View style={{ flex: 0.4, marginLeft: 5 }}>
            <Text style={styles.headerNameStyle}>{"Order ID"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={this.state.ITEM_DATA}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
    );
  };

  onServerCall = () => {};
  render() {
    if (this.props.route.params) {
      if (this.props.route.params.type == "BatchId") {
        return (
          <SafeAreaView style={styles.container}>
            {this.header()}
            <View style={styles.batchidNameView}>
              <Text style={styles.batchidName}>
                {"Batch ID:   "}
                {this.props.route.params.batchid}
              </Text>
            </View>
            {this.machinelistView()}

            {/* <TouchableOpacity
              onPress={() => this.onServerCall()}
              style={{ margin: 30 }}
            >
              <View style={styles.userButtonViewStyle}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: GlobalStyles.colorCodes.white,
                  }}
                >
                  Save To Server
                </Text>
              </View>
            </TouchableOpacity> */}
          </SafeAreaView>
        );
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        <View style={styles.batchidNameView}>
          <Text style={styles.batchidName}>
            {"Batch ID:   "}
            {"SDFSDF342242"}
          </Text>
        </View>
        {this.machinelistView()}

        <TouchableOpacity
          onPress={() => this.onServerCall()}
          style={{ margin: 30 }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              Save To Server
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.lightClearBlue,
  },
  itemListViewStyle: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 5,
  },
  emptyView: {
    width: 58,
  },
  headerTextView: {
    flex: 0.5,
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
  back1: {
    width: 30,
    height: 20,
  },
  listHeaderText: {
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
  addbtnView: {
    flex: 0.3,
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingRight: 16,
  },
  addText: {
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: GlobalStyles.colorCodes.orange,
  },
  centerHeaderText: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.charcoalGrey,
  },
  batchidNameView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  batchidName: {
    fontWeight: "bold",
    fontSize: 22,
    color: GlobalStyles.colorCodes.black2,
  },
  backView: {
    flex: 0.2,
    height: 44,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
    marginVertical: 5,
    borderRadius: 5,
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  labelNameStyle: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.black2,
  },
  labelNameStyle1: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.tealish,
  },
  userButtonViewStyle: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.blue,
  },
  dateViewStyle1: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  itemNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  headerNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
});
export default UserLabelList;
