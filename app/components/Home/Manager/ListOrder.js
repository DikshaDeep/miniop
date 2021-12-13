import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
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
import { timeFormat } from "../../../Utility/CommonFunctions";
import { TextInput } from "react-native-gesture-handler";

@inject("OrderStore")
@observer
class ListOrder extends Component {
  // @observable itemIndex = "";
  // @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
      ITEM_DATA: [],
    };
  }

  async componentDidMount() {
    const {OrderStore} = this.props;
    await OrderStore.list();
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.CREATEORDER);
  };

  header = () => {    
    const { removeAll } = this.state;
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
          <Text style={styles.listmachinHeaderText}>{"List Order"}</Text>
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

  showTaskList = (id) => {
    this.props.navigation.navigate(SCREENS.TASKLIST, {orderId: id});
  }

  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => this.showTaskList(item._id)}>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.cartNameStyle}>{item.customername}</Text>
              <Text style={styles.cartNameStyle}>{item.orderno}</Text>
            </View>
          </View>
          <View style={styles.dateView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.dateInfo}>
                {"Date: "}
                {timeFormat(item.date)}
                {"   "} 
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Priority: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text
                //values entered will be numeric
                style={styles.itemNameStyle}
              >
                {item.priority}
              </Text>
            </View>
          </View>
          {/* <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Product Name: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.productName}</Text>
            </View>
          </View> */}
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Job Count: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.jobs.length}</Text>
            </View>
          </View>
          {/* <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Size: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.size}</Text>
            </View>
          </View> */}
          {/* <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>
                {"Total Quantity: "}
              </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.totalQuantity}</Text>
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  updatePriority = () => {
    // update orders priority on save button....
  };

  machinelistView = (ITEM_DATA) => {
    return (
      <View style={styles.itemListViewStyle}>
        <FlatList
          contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={ITEM_DATA}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => item._id}
        />
        <View>
          <Button title="Save" onPress={this.updatePriority} />
        </View>
      </View>
    );
  };

  render() {
   const {OrderStore} = this.props;
    const orderList = toJS(OrderStore.orderList);
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        {this.machinelistView(orderList)}
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
  itemView: {
    marginHorizontal: 15,
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
  listmachinHeaderText: {
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
    padding: 10,
  },
  cartNameStyle: {
    // marginTop: 7,
    fontSize: 13,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.tealish,
  },
  headerNameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
  itemrowView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  itemNameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    alignSelf: "flex-end",
  },
  imageView: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  image: {
    height: 94,
    width: 72,
    borderRadius: 5,
  },
  dateView: {
    flex: 0.5,
    alignItems: "flex-end",
  },
  textView: {
    flex: 0.5,
    alignItems: "flex-start",
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
    alignSelf: 'stretch'
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
});
export default ListOrder;
