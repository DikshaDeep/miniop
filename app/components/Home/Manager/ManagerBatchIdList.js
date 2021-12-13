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
import { toJS } from 'mobx'
import { inject, observer } from "mobx-react";
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import { observable } from "mobx";
import moment from "moment";

@inject("LoginStore", "BatchStore")
@observer
class ManagerBatchidList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
    };
  }

  async componentDidMount() {
    this.setState({loader: true})
    await this.getList();
  }

  async getList() {
    await this.props.BatchStore.list()
  }

  deleteOperation = async (item) => {
    await this.props.BatchStore.delete({
      "batchId": item._id
    });
  };

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.ADDBATCHID, {type: 'ManagerBatchidListAdd'});
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
          <Text style={styles.centerHeaderText}>{"List Batch ID"}</Text>
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

  onPressBatch = (item) => {
    this.props.navigation.navigate(SCREENS.MANAGERLABELLIST, {
      type: "ManagerBatchId",
      batchid: item._id,
    });
  };

  GoToProductList = (machinename, labelname) => {
    this.props.navigation.navigate(SCREENS.MANAGERPRODUCTLIST, {
      type: "ManagerBatchId",
      batchid: machinename,
      labelname: labelname,
    });
  };

  EditOperation = (item) => {
    this.props.navigation.navigate(SCREENS.ADDBATCHID, {
      type: "ManagerBatchidListEdit",
      id: item._id,
      data: {
        machinename: item.machineId,
        date: item.date,
        shift: item.shift,
      },
    });
  };

  renderAllListView = ({ item, index }) => {
    let bkcolor =
      item.shift === "D"
        ? GlobalStyles.colorCodes.orange
        : GlobalStyles.colorCodes.black;
    if (this.props.route.params?.type == "Managerlabellist") {
      return (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            this.GoToProductList(
              item.machineName,
              this.props.route.params.labelname
            )
          }
        >
          <View style={styles.mainView}>
            <View style={styles.imageView}>
              <View style={styles.textView}>
                <Text style={styles.machineName}>{item.machineId}</Text>
              </View>
            </View>
            <View style={styles.dateView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>
                  {/* {"Date: "} */}
                  {moment(item.date).format('MM-DD-YYYY')}
                </Text>
              </View>
            </View>
            <View style={styles.shiftView}>
              {/* 0.2 */}
              <View
                style={[styles.dateViewStyle, { backgroundColor: bkcolor }]}
              >
                <Text
                  style={[
                    styles.shiftInfo,
                    { color: GlobalStyles.colorCodes.white },
                  ]}
                >
                  {item.shift}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ marginLeft: 45 }}
              onPress={() =>
                this.EditOperation(item)
              }
            >
              <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.EDIT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12, marginRight: 8 }} 
            onPress={() =>
              this.deleteOperation(item)
            }>
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
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => this.onPressBatch(item)}
      >
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <View style={styles.textView}>
              <Text style={styles.machineName}>{item._id.substr(item._id.length - 5)}</Text>
            </View>
          </View>
          <View style={styles.dateView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.dateInfo}>
                {/* {"Date: "} */}
                {moment(item.date).format('MM-DD-YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.shiftView}>
            {/* 0.2 */}
            <View style={[styles.dateViewStyle, { backgroundColor: bkcolor }]}>
              <Text
                style={[
                  styles.shiftInfo,
                  { color: GlobalStyles.colorCodes.white },
                ]}
              >
                {item.shift}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() =>
              this.EditOperation(item)
            }
          >
            <Image
              resizeMode={"contain"}
              style={styles.back}
              source={ImagePath.EDIT_ICON}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 12, marginRight: 8 }}
          onPress={() =>
            this.deleteOperation(item)
          }>
            <Image
              resizeMode={"contain"}
              style={styles.back}
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
          <View style={{ flex: 0.3 }}>
            <Text style={styles.headerNameStyle}>{"Batch Id"}</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.itemNameStyle}>{"Date"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"Shift"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={toJS(this.props.BatchStore.listBatch) || []}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  render() {
    if (this.props.route.params.type == "Managerlabellist") {
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
    flex: 0.4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  back: {
    width: 30,
    height: 20,
    marginTop: 2,
  },
  back1: {
    width: 25,
    height: 15,
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
    marginVertical: 5,
    borderRadius: 5,
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
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
    flex: 0.3,
    alignItems: "flex-end",
  },
  shiftView: {
    flex: 0.3,
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
  dateViewStyle1: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 18,
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
export default ManagerBatchidList;
