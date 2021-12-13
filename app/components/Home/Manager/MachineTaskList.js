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
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { inject, observer } from "mobx-react";
import { SCREENS } from "../../../Utility/Constants";
import { observable } from "mobx";

@inject("LoginStore")
@observer
class MachineTaskList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
      ITEM_DATA: [
        {
          id: 1,
          priority: 1,
          orderNumber: "101",
          customerName: "Stock",
          productName: "Mango",
          size: "12 * 5",
          date: "10-07-2020",
          taskid: "8",
          quantity: "10kg",
          quantityReady: "10kg",
        },
        {
          id: 2,
          priority: 2,
          orderNumber: "102",
          customerName: "Ram",
          productName: "Orange",
          size: "12 * 5",
          date: "05-07-2020",
          taskid: "16",
          quantity: "20kg",
          quantityReady: "10kg",
        },
        {
          id: 3,
          priority: 3,
          orderNumber: "103",
          customerName: "Raghav",
          productName: "Mango",
          size: "12 * 5",
          date: "08-07-2020",
          taskid: "20",
          quantity: "320kg",
          quantityReady: "10kg",
        },
        {
          id: 4,
          priority: 4,
          orderNumber: "104",
          customerName: "Sohan",
          productName: "Orange",
          size: "12 * 5",
          date: "10-07-2020",
          taskid: "12",
          quantity: "30kg",
          quantityReady: "10kg",
        },
        {
          id: 5,
          priority: 5,
          orderNumber: "105",
          customerName: "Rohan",
          productName: "Grapes",
          size: "12*5",
          date: "12-07-2020",
          taskid: "20",
          quantity: "50kg",
          quantityReady: "10kg",
        },
        {
          id: 6,
          priority: 6,
          orderNumber: "106",
          customerName: "stock",
          productName: "Grapes",
          size: "12*5",
          date: "13-07-2020",
          taskid: "10",
          quantity: "40kg",
          quantityReady: "10kg",
        },
        {
          id: 7,
          priority: 7,
          orderNumber: "107",
          customerName: "Verma",
          productName: "Orange",
          size: "12*5",
          date: "10-07-2020",
          taskid: "8",
          quantity: "10kg",
          quantityReady: "10kg",
        },
      ],
    };
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.AddMACHINE);
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
          <Text style={styles.listmachinHeaderText}>{"View Machine"}</Text>
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

  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.cartNameStyle}>{item.orderNumber}</Text>
              <Text style={styles.cartNameStyle1}>{item.customerName}</Text>
            </View>
          </View>
          <View style={styles.dateView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.dateInfo}>
                {"Date: "}
                {item.date}
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
              <Text style={styles.itemNameStyle}>{item.priority}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Task id: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.taskid}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Product: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.productName}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Size: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.size}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Quantity: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.quantity}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>
                {"Quantity Ready: "}
              </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.quantityReady}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  machinelistView = () => {
    return (
      <View style={styles.itemListViewStyle}>
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

  render() {
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
  cartNameStyle1: {
    // marginTop: 7,
    marginLeft: 8,
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
export default MachineTaskList;
