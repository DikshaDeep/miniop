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
import { observable, toJS } from "mobx";

import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";

@inject("LoginStore", "BatchMachineProductStore", "BatchMachineStore")
@observer
class ManagerProductList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    // this.params = this.props.route.params.labelname;
    this.state = {
      ITEM_DATA: [
        {
          id: 1,
          productName: "Orange",
          size: "12*5",
        },
      ],
    };
  }

  async componentDidMount() {
    console.log('params in product list', this.props.route.params)
    this.getList()
  }

  getList = async () => {
    const {BatchMachineProductStore, BatchMachineStore} = this.props;
    if (this.props.route.params.type == "Managerlabellist") {
      const id = this.props.route.params.batchid
      const machineOutputId = this.props.route.params.machineOutputId
      await BatchMachineStore.details({ batch: { _id: id, machineoutput: {_id: machineOutputId} } });
      await BatchMachineProductStore.list({ batch: { _id: id, machineoutput: {_id: machineOutputId} } });
    } 
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.ADDPRODUCT, {
      type: 'ManagerListProduct',
      labelname: this.props.route.params.labelname,
      batchid: this.props.route.params.batchid,
      machineOutputId: this.props.route.params.machineOutputId
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
            style={styles.back1}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.listHeaderText}>{"List Product"}</Text>
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
  onPressProduct = (item, batchid, labelname) => {
    const machineOutputId = this.props.route.params.machineOutputId;
    this.props.navigation.navigate(SCREENS.MANAGERELEMENTSLIST, {
      type: "Managerproductlist",
      batchid: batchid,
      machineOutputId,
      productId: item._id,
      labelname: labelname,
      productname: item.productname,
      size: item.productsize,
    });
  };

  GoToEdit = (item) => {
    const batchid = this.props.route.params.batchid
    const machineOutputId = this.props.route.params.machineOutputId
    this.props.navigation.navigate(SCREENS.ADDPRODUCT, {
      type: "ManagerProductListEdit",
      batchid: batchid,
      machineOutputId: machineOutputId,
      productId: item._id,
      labelname: this.props.route.params.labelname,
      productname: item.productname,
      size: item.productsize,
    });
  };

  deleteOperation = async (item) => {
    const {BatchMachineProductStore} = this.props;
    const id = this.props.route.params.batchid
    const machineOutputId = this.props.route.params.machineOutputId
    await BatchMachineProductStore.delete({
      "batch":
      {
        "_id": id,
        "machineoutput": {
          "_id": machineOutputId
        }
      },
      "productId": item._id
    });
    this.getList();
  };

  renderAllListView = ({ item, index }) => {
    if (this.props.route.params.type == "Managerlabellist") {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            this.onPressProduct(
              item,
              this.props.route.params.batchid,
              this.props.route.params.labelname
            )
          }
        >
          <View style={styles.mainView}>
            <View style={styles.imageView}>
              <View style={styles.textView}>
                <Text style={styles.productName}>{item.productname}</Text>
              </View>
            </View>

            <View style={styles.sizeView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>{item.productsize}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 100,
              }}
              onPress={() => this.GoToEdit(item)}
            >
              <Image
                resizeMode={"contain"}
                style={styles.back}
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
                style={styles.back}
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
            this.onPressProduct(
              item,
              this.props.route.params.batchid,
              this.props.route.params.labelname
            )
          }
        >
          <View style={styles.mainView}>
            <View style={styles.imageView}>
              <View style={styles.textView}>
                <Text style={styles.productName}>{item.productName}</Text>
              </View>
            </View>

            <View style={styles.sizeView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>{item.size}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 100,
              }}
              onPress={() => this.GoToEdit(item.productName, item.size)}
            >
              <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.EDIT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
            >
              <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.DELETE_ICON}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  machinelistView = () => {
    const ITEM_DATA = this.props.route.params.type == "Managerlabellist" ? toJS(this.props.BatchMachineStore.batchOrderDetails)?.machineoutput?.products : this.state.ITEM_DATA;
    return (
      <View style={styles.itemListViewStyle}>
        {/* <View style={{ marginVertical: 12 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }}
          >
            {"List of Products"}
          </Text>
        </View> */}
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.headerNameStyle}>{"Product Name"}</Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.itemNameStyle}>{"Size"}</Text>
          </View>
          <View style={{ flex: 0.1, marginRight: 14 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        <FlatList
          //contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={ITEM_DATA}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => item._id}
        />
      </View>
    );
  };

  render() {
    if (this.props.route.params.type == "Managerlabellist") {
      if (this.props.route.params.batchid) {
        return (
          <SafeAreaView style={styles.container}>
            {this.header()}
            <View style={styles.batchidNameView}>
              <Text style={styles.batchidName}>
                {"Batch ID:   "}
                {this.props.route.params.batchid}
              </Text>
              <Text style={styles.batchidName}>
                {"Label Name:   "}
                {this.props.route.params.labelname}
              </Text>
            </View>
            {toJS(this.props.BatchMachineStore.batchOrderDetails)?.machineoutput.products.length > 0 && this.machinelistView()}
          </SafeAreaView>
        );
      }
      if (!this.props.route.params.batchid) {
        return (
          <SafeAreaView style={styles.container}>
            {this.header()}
            <View style={styles.batchidNameView}>
              <Text style={styles.batchidName}>
                {"Label Name:   "}
                {this.props.route.params.labelname}
              </Text>
            </View>
            {this.machinelistView()}
          </SafeAreaView>
        );
      }
    }

    if (this.props.route.params.type == "ManagerBatchId") {
      return (
        <SafeAreaView style={styles.container}>
          {this.header()}
          <View style={styles.batchidNameView}>
            <Text style={styles.batchidName}>
              {"Batch ID:   "}
              {this.props.route.params.batchid}
            </Text>
          </View>
          <View style={styles.batchidNameView}>
            <Text style={styles.batchidName}>
              {"Label Name:   "}
              {this.props.route.params.labelname}
            </Text>
          </View>
          {this.machinelistView()}
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        {this.machinelistView()}
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
    flex: 0.6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  back1: {
    width: 25,
    height: 15,
  },
  back: {
    width: 30,
    height: 20,
    marginTop: 2,
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
  batchidNameView: {
    marginTop: 20,
    // alignItems: "center",
    // justifyContent: "center",
    marginHorizontal: 30,
  },
  batchidName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
  backView: {
    flex: 0.1,
    paddingVertical: 14,
    paddingLeft: 16,
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
    padding: 10,
  },
  mainView1: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ProductNameStyle: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.black2,
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
  productName: {
    marginTop: 7,
    fontSize: 13,
    color: GlobalStyles.colorCodes.black2,
  },
  imageView: {
    flexDirection: "row",
    flex: 0.4,
    flexWrap: "wrap",
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
  sizeView: {
    flex: 0.6,
    alignItems: "flex-end",
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
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  dateInfo: {
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colorCodes.tealish,
  },
  dateInfo1: {
    fontWeight: "bold",
    marginRight: 6,
    color: GlobalStyles.colorCodes.orange,
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
export default ManagerProductList;
