import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import { observable } from "mobx";
import UserStore from "../../../Stores/UserStore";

@inject("LoginStore", "OrderStore", "BatchStore", "BatchMachineStore", "UserStore")
@observer
class ManagerLabelList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
     ITEM_DATA: []
    };
  }

  async componentDidMount() {
    const {OrderStore, BatchMachineStore, BatchStore} = this.props;
    if (this.props.route.params.type == "ManagerBatchId") {
      const id = this.props.route.params.batchid
      await BatchStore.details({ batchId: id });
      // await BatchMachineStore.list({ batch: { _id: id } });
    } else {
      await OrderStore.list();
    }
  }

  onPressGotoAction = () => {
    const orderdata = toJS(this.props.BatchStore.batchDetails)?.machineoutput;
    const lastOrderNo = orderdata && orderdata[orderdata?.length - 1]?.orderno;
    const id = this.props.route.params?.batchid
    this.props.navigation.navigate(SCREENS.ADDLABEL, {
      type: "ManagerLabelListAdd",
      batchid: id,
      orderno: (lastOrderNo ? lastOrderNo : 0) + 1
    });
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
          <Text style={styles.centerHeaderText}>{"List Label ID"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          <Text style={styles.addText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressLabel = (item, batchid) => {
    this.props.navigation.navigate(SCREENS.USERBUTTONS, {
      type: "Managerlabellist",
      batchid: batchid,
      labelname: item.customerName + item.orderid,
    });
  };

  GoToProductList = (item, batchid) => {
    const userId = toJS(this.props.BatchStore.batchDetails).userId;
    this.props.navigation.navigate(SCREENS.MANAGERPRODUCTLIST, {
      type: "Managerlabellist",
      batchid: batchid,
      machineOutputId: item._id,
      labelname: userId + item._id, // username and order no is not in the list
    });
  };

  GoToEdit = (item) => {
    const batchid = this.props.route.params.batchid
    this.props.navigation.navigate(SCREENS.ADDLABEL, {
      type: "ManagerLabelListEdit",
      data: {
        batchid: batchid,
        id: item._id,
      },
    });
  };

  deleteOperation = async (item) => {
    const {BatchMachineStore, BatchStore} = this.props;
    const id = this.props.route.params.batchid
    const res = await BatchMachineStore.delete({
      "batch":
      {
        "_id": id
      },
      "machineId": item._id 
    });
    await BatchStore.details({ batchId: id });
  };

  renderAllListView = ({ item, index }) => {
    console.log('item', item)
    if (this.props.route.params.type == "ManageLabels") {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.onPressLabel(item)}
        >
          <View style={styles.dateViewStyle1}>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.headerNameStyle1}>{item.customername}</Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <Text style={styles.itemNameStyle1}>{item.orderno}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.GoToEdit(item)
              }
            >
              <Image
                resizeMode={"contain"}
                style={styles.back1}
                source={ImagePath.EDIT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Image
                resizeMode={"contain"}
                style={styles.back1}
                source={ImagePath.DELETE_ICON}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.props.route.params.type == "ManagerBatchId") {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            this.GoToProductList(item, this.props.route.params.batchid)
          }
        >
          <View style={styles.dateViewStyle1}>
            <View
              style={{
                flex: 0.6,
              }}
            >
              <Text style={styles.headerNameStyle1}>{item.customername}</Text>
            </View>
            <View
              style={{
                flex: 0.4,
              }}
            >
              <Text style={styles.itemNameStyle1}>{item?._id}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.GoToEdit(item)
              }
            >
              <Image
                resizeMode={"contain"}
                style={styles.back1}
                source={ImagePath.EDIT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
              onPress={() => this.deleteOperation(item)}
            >
              <Image
                resizeMode={"contain"}
                style={styles.back1}
                source={ImagePath.DELETE_ICON}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  machinelistView = () => {
    const ITEM_DATA = this.props.route.params?.type == "ManagerBatchId" ? toJS(this.props.BatchStore.batchDetails)?.machineoutput : toJS(this.props.OrderStore.orderList) ? toJS(this.props.OrderStore.orderList) : [];
    return (
      <View style={styles.itemListViewStyle}>
        <View style={styles.dateViewStyle}>
          <View style={{ flex: 0.25 }}>
            <Text style={styles.headerNameStyle2}>{"Customer Name"}</Text>
          </View>
          <View style={{ flex: 0.6 }}>
            <Text style={styles.itemNameStyle}>{"Order ID"}</Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        {ITEM_DATA.length > 0 && 
          <FlatList
            contentContainerStyle={styles.listMain}
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={ITEM_DATA}
            renderItem={this.renderAllListView}
            keyExtractor={(item, index) => item._id}
          />}
      </View>
    );
  };
  render() {
    console.log('inside render of Manager Label ist', this.props.route.params)
    if (this.props.route.params.type == "ManageLabels") {
      return (
        <SafeAreaView style={styles.container}>
          {this.header()}
          {this.machinelistView()}
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        <View style={styles.batchidNameView}>
          <Text style={styles.batchidName}>
            {"Batch ID:   "}
            {this.props.route.params.batchid}
          </Text>
        </View>
        {toJS(this.props.BatchStore?.batchDetails)?.machineoutput.length > 0 && this.machinelistView()}
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
    flex: 0.4,
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
    marginTop: 2,
  },
  centerHeaderText: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.charcoalGrey,
  },
  remove: {
    fontSize: 12,
    color: GlobalStyles.colorCodes.pink,
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
  backView: {
    flex: 0.2,
    height: 44,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  removeView: {
    flex: 0.2,
    alignItems: "flex-end",
    paddingVertical: 14,
    paddingRight: 16,
  },
  headerView: {
    flex: 0.1,
  },
  card: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
    marginVertical: 10,
    borderRadius: 5,
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  machineName: {
    marginTop: 7,
    fontSize: 13,
    color: GlobalStyles.colorCodes.black2,
  },
  imageView: {
    flexDirection: "row",
    flex: 0.4,
    flexWrap: "wrap",
  },
  image: {
    height: 94,
    width: 72,
    borderRadius: 5,
  },
  dateView: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  shiftView: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
  logoImg: {
    height: 15,
    width: 23,
    marginRight: 6,
  },
  dateViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.greenyBlue12,
  },

  dateViewStyle1: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  dateInfo: {
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colorCodes.tealish,
  },
  shiftInfo: {
    fontWeight: "bold",
    fontSize: 12,
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
  userButtonViewStyle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.blue,
  },
  itemNameStyle1: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.tealish,
    // backgroundColor: GlobalStyles.colorCodes.greenyBlue12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  headerNameStyle1: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.black,
  },
  headerNameStyle2: {
    fontWeight: "bold",
    fontSize: 18,
    color: GlobalStyles.colorCodes.black,
  },
  itemNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },

  headerNameStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
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
});
export default ManagerLabelList;
