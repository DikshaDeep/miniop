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
import moment from 'moment';
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import { observable } from "mobx";

@inject("LoginStore", "OrderJobStore")
@observer
class TaskList extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
      ITEM_DATA: [
        {
          id: 1,
          priority: "1",
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
          priority: "2",
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
          priority: "3",
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
          priority: "4",
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
          priority: "5",
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
          priority: "6",
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
          priority: "7",
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

  async componentDidMount() {
    const {OrderJobStore, navigation} = this.props;
    if (this.props.route.params?.orderId) {
      const id = this.props.route.params?.orderId;
      await OrderJobStore.list({"order":{
        "_id": id
      }});
    }
  }

  onPressGotoAction = (item) => {
    this.props.navigation.navigate(SCREENS.JOBVIEW, {
      "orderId": this.props.route.params?.orderId,
      "jobId": item._id
    });
  };

  onPressAddTask = () => {
    this.props.navigation.navigate(SCREENS.CREATEORDERJOB, {
      "orderId": this.props.route.params?.orderId,
    });
  };

  GoToEdit = (item, priority) => {
    this.props.navigation.navigate(SCREENS.UPDATEPRIORITYQUANTITY, {
      type: "TaskList",
      data: {
        ...item,
        priority: priority,
        quantityReady: item.qty,
        id: item._id,
        orderId: this.props.route.params?.orderId
      },
    });
  };

  deleteOperation = async (item) => {
    await this.props.OrderJobStore.delete({
      "order":{
        "_id": this.props.route.params?.orderId
      },
      "jobId": item._id
      });
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
            style={styles.back1}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.listmachinHeaderText}>{"Task List"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressAddTask()}
        >
          <Text style={styles.addText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderAllListView = ({ item, index }) => {
    const listOrderJob = toJS(this.props.OrderJobStore.listOrderJob) || [];
    const customerName = listOrderJob[0].customername;
    const priority = listOrderJob[0].priority;
    const orderNumber = listOrderJob[0].orderno;
    const date = listOrderJob[0].date;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.onPressGotoAction(item)}
      >
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.cartNameStyle}>{orderNumber}</Text>
              <Text style={styles.cartNameStyle1}>{customerName}</Text>
            </View>
          </View>
          <View style={styles.dateView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.dateInfo}>
                {"Date: "}
                {moment(date).format('YYYY-MM-DD')}
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
              <Text style={styles.itemNameStyle}>{priority}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Task id: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item._id.substr(item._id.length - 5)}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Product: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.product}</Text>
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
              <Text style={styles.itemNameStyle}>{item.qty}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerNameStyle}>{"Quantity Ready: "}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.itemNameStyle}>{item.quantityReady}</Text>
            </View>
          </View>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.9 }}>
              <Text style={styles.headerNameStyle}>{"Action: "}</Text>
            </View>
            <View style={{ flex: 0.2}}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{ flex: 0.5 }}
                  onPress={() =>
                    this.GoToEdit(item, priority)
                  }
                >
                  <Image
                    resizeMode={"contain"}
                    style={styles.back}
                    source={ImagePath.EDIT_ICON}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5 }}
                  onPress={() =>
                    this.deleteOperation(item)
                  }
                >
                  <Image
                    resizeMode={"contain"}
                    style={styles.back}
                    source={ImagePath.DELETE_ICON}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  machinelistView = () => {
    const listOrderJob = toJS(this.props.OrderJobStore.listOrderJob) || [];
    return (
      <View style={styles.itemListViewStyle}>
        {listOrderJob.length > 0 && <FlatList
          contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={listOrderJob[0].jobs}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => item._id + index}
        />}
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
    width: 30,
    height: 20,
  },
  back1: {
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
    // alignItems: "flex-end",
    paddingVertical: 10,
    paddingRight: 16,
  },
  addText: {
    marginRight: 30,
    fontWeight: "bold",
    fontSize: 20,
    color: GlobalStyles.colorCodes.black,
  },
});
export default TaskList;
