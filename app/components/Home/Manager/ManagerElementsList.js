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

@inject("LoginStore", "BatchMachineProductBoxStore", "BatchMachineProductStore")
@observer
class ManagerElementsList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      ITEM_DATA: [
        {
          id: 1,
          boxNumber: 1,
          boxWeight: 200,
        },
      ],
    };
  }

  async componentDidMount() {
    this.getList();
  }

  getList = async() => {
    const {BatchMachineProductBoxStore, BatchMachineProductStore} = this.props;
    if (this.props.route.params.type == "Managerproductlist") {
      const id = this.props.route.params.batchid;
      const machineOutputId = this.props.route.params.machineOutputId;
      const productId = this.props.route.params.productId;
      await BatchMachineProductStore.list({ batch: { _id: id, machineoutput: {_id: machineOutputId, products: {_id: productId}} } });
      await BatchMachineProductBoxStore.list({ batch: { _id: id, machineoutput: {_id: machineOutputId, products: {_id: productId}} } });
    } 
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.ADDELEMENTS, {
      type: "ManagerElementsListAdd",
      productname: this.props.route.params.productname,
      batchid: this.props.route.params.batchid,
      machineOutputId: this.props.route.params.machineOutputId,
      productId: this.props.route.params.productId
    });
  };

  GoToEdit = () => {
    this.props.navigation.navigate(SCREENS.ADDELEMENTS, {
      type: "ManagerElementsListEdit",
      productname: this.props.route.params.productname,
      batchid: this.props.route.params.batchid,
      machineOutputId: this.props.route.params.machineOutputId,
      productId: this.props.route.params.productId
    });
  };

  deleteOperation = async (item) => {
    const {BatchMachineProductBoxStore} = this.props;
    const id = this.props.route.params.batchid
    const machineOutputId = this.props.route.params.machineOutputId
    const productId = this.props.route.params.productId
    await BatchMachineProductBoxStore.delete({
      "batch":
      {
        "_id": id,
        "machineoutput": {
          "_id": machineOutputId,
          products: {
            _id: productId
          }
        }
      },
      "boxId": item._id
    });
    this.getList();
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
          <Text style={styles.listHeaderText}>{"List Elements"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() =>
            this.onPressGotoAction()
          }
        >
          {/* <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.SEND_ICON}
          /> */}
          <Text style={styles.addText}>{"+"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.GoToEdit()}
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.EDIT_ICON}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderAllListView = ({ item, index }) => {
    console.log('item', item)
    if (this.props.route.params) {
      if (this.props.route.params.type == "Managerproductlist") {
        if (this.props.route.params.batchid) {
          return (
            <View style={styles.card}>
              <View style={styles.mainView}>
                <View style={{ flex: 0.2 }}>
                  <Text style={styles.elementNameStyle}>{item.boxnumber}</Text>
                </View>
                <View style={{ flex: 0.7, alignItems: "flex-end" }}>
                  <Text style={styles.elementNameStyle1}>{item.boxweight}</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this.deleteOperation(item)}>
                  <Image
                    resizeMode={"contain"}
                    style={styles.back}
                    source={ImagePath.DELETE_ICON}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      }
    }

    return (
      <View style={styles.card}>
        <View style={styles.mainView}>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.elementNameStyle}>{item.boxNumber}</Text>
          </View>
          <View style={{ flex: 0.25, alignItems: "flex-end" }}>
            <Text style={styles.elementNameStyle1}>{item.boxWeight}</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 25 }}>
            <Image
              resizeMode={"contain"}
              style={styles.back}
              source={ImagePath.DELETE_ICON}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  machinelistView = () => {
    const ITEM_DATA = toJS(this.props.BatchMachineProductBoxStore.listBatchMachineProductBox);
    return (
      <View style={styles.itemListViewStyle}>
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.headerNameStyle}>{"Box Number"}</Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.itemNameStyle}>{"Box Weight"}</Text>
          </View>
          <View style={{ flex: 0.2, marginRight: 18 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        <FlatList
          // contentContainerStyle={styles.listMain}
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
    console.log('inside manager element params', this.props.route.params)
    const data = toJS(this.props.BatchMachineProductBoxStore.listBatchMachineProductBox);
    if (!this.props.route.params.batchid) {
      return (
        <SafeAreaView style={styles.container}>
          {this.header()}
          <View style={styles.batchidNameView}>
            <Text style={styles.batchidName}>
              {"Label Name:   "}
              {this.props.route.params.labelname}
            </Text>
            <Text style={styles.batchidName}>
              {"Product:   "}
              {this.props.route.params.productname}
              {this.props.route.params.size}
            </Text>
          </View>
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
          <Text style={styles.batchidName}>
            {"Label Name:   "}
            {this.props.route.params.labelname}
          </Text>
          <Text style={styles.batchidName}>
            {"Product:   "}
            {this.props.route.params.productname}
            {this.props.route.params.size}
          </Text>
        </View>
        {data.length > 0 && this.machinelistView()}
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
    marginBottom: 20,
    // flexDirection: "row",
    // alignItems: "flex-start",
    // justifyContent: "center",
    marginHorizontal: 20,
  },
  batchidName: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
  mainView1: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageView: {
    flexDirection: "row",
    flex: 0.6,
    flexWrap: "wrap",
  },
  textView: {
    flex: 1,
    marginLeft: 2,
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
    justifyContent: "space-between",
    padding: 10,
  },
  elementNameStyle: {
    marginLeft: 30,
    fontSize: 16,
    color: GlobalStyles.colorCodes.black2,
  },
  elementNameStyle1: {
    marginRight: 25,
    fontSize: 16,
    color: GlobalStyles.colorCodes.black2,
  },
  addbtnView: {
    flex: 0.2,
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
  sizeView: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  dateViewStyle1: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  dateInfo1: {
    fontSize: 16,
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
export default ManagerElementsList;
