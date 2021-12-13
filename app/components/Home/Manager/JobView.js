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
import Dash from "react-native-dash";
import { observable } from "mobx";

@inject("LoginStore", "OrderJobDistributionStore", "OrderJobDistributionAssignedStore")
@observer
class JobView extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
    };
  }

  async componentDidMount() {
    const {OrderJobDistributionStore, navigation} = this.props;
    
    if (this.props.route.params?.orderId) {
      const id = this.props.route.params.orderId;
      const jobId = this.props.route.params.jobId;
      await OrderJobDistributionStore.list({"order":{
        "_id": id,
        "jobs": {
          "_id": jobId
      }
      }});
    }
  }

  onPressAddMachine = (item) => {
    const orderId = this.props.route.params.orderId;
    const jobId = this.props.route.params.jobId;
    this.props.navigation.navigate(SCREENS.CREATEMACHINEQTY, {
      orderId,
      jobId,
      distribution: item,
    });
  };

  onPressAddUser = () => {
    const orderId = this.props.route.params.orderId;
    const jobId = this.props.route.params.jobId;
    this.props.navigation.navigate(SCREENS.USERQUANTITY, {
      orderId,
      jobId,
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
            style={styles.back}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.listmachinHeaderText}>{"Jobs"}</Text>
        </View>
        <TouchableOpacity style={styles.addbtnView} />
      </View>
    );
  };

  renderAllListView = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.card}>
          <View style={styles.mainView}>
            <View style={styles.textView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.cartNameStyle}>{item.userId.substr(item.userId.length - 4)}</Text>
              </View>
            </View>
            <View style={styles.dateView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>
                  {"User Quantity: "}
                  {item.target_qty}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={styles.itemrowView}>
              <View>
                <Text style={styles.headerNameStyle}>{"Machine"}</Text>
              </View>
              <View>
                <Text style={styles.itemNameStyle2}>{"Qty"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.itemView}>{this.productlistView(item)}</View>
        </TouchableOpacity>
      </View>
    );
  };

  fixheader = (data) => {
    const customername = data[0].customername;
    const orderno = data[0].orderno;
    const date = data[0].date;
    const product = data[0].jobs.product;
    const size = data[0].jobs.size;
    return (
      <View style={styles.dateViewStyle1}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.cartNameStyle1}>{orderno}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.cartNameStyle1}>{customername}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.cartNameStyle1}>{`${product} ${size}`}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.cartNameStyle1}>Date: {moment(date).format('YYYY-MM-DD')}</Text>
        </View>
      </View>
    );
  };

  subheader = (data) => {
    return (
      <View>
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.headerNameStyle}>{"Qty"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"User Qty"}</Text>
          </View>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.itemNameStyle}>{"Machine Total Qty"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"Ready Qty"}</Text>
          </View>
        </View>
        {this.qtyList(data)}
      </View>
    );
  };
  qtyList = (data) => {
    const qty = data[0].jobs.qty || 0;
    const userQty = data[0].jobs.userQty || 0;
    const machineTotalQty = data[0].jobs.machineTotalQty || 0;
    const readyQty = data[0].jobs.readyQty || 0;

    return (
      <View style={styles.dateViewStyle1}>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.headerNameStyle1}>{qty}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.itemNameStyle1}>{userQty}</Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text style={styles.itemNameStyle1}>{machineTotalQty}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.itemNameStyle1}>{readyQty}</Text>
        </View>
      </View>
    );
  };
  renderDataAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <View style={styles.itemView}>
          <View style={styles.itemrowView}>
            <View>
              <Text>{item.machineId.substr(item.machineId.length - 4)}</Text>
            </View>
            <View>
              <Text>{item.assigned_qty}</Text>
            </View>
          </View>
          {/* {this.productlistView(item.data)} */}
        </View>
      </TouchableOpacity>
    );
  };

  machinelistView = () => {
    const data = toJS(this.props.OrderJobDistributionStore.listOrderJobDistribution);
    const ITEM_DATA = data[0].jobs.distribution;
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
        <TouchableOpacity
          onPress={() => this.onPressAddUser()}
          style={{ alignItems: "flex-end", margin: 10 }}
        >
          <View style={styles.userButtonViewStyle}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: GlobalStyles.colorCodes.white,
              }}
            >
              +Add User
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  productlistView = (item) => {
    return (
      <View style={styles.itemListViewStyle}>
        <FlatList
          contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={item.assigned}
          renderItem={this.renderDataAllListView}
          keyExtractor={(item, index) => item._id}
        />
        <TouchableOpacity
          onPress={() => this.onPressAddMachine(item)}
          style={{
            marginBottom: 10,
          }}
        >
          <View style={styles.textView}>
            <View style={styles.machineButtonViewStyle}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: GlobalStyles.colorCodes.white,
                }}
              >
                +Add Machine
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const data = toJS(this.props.OrderJobDistributionStore.listOrderJobDistribution);
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        <View
          style={{
            marginHorizontal: 15,
          }}
        >
          {data.length > 0 && this.fixheader(data)}
          {data.length > 0 && this.subheader(data)}
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
    flex: 0.5,
  },
  itemView: {
    marginHorizontal: 2,
  },
  dashmargin: {
    marginTop: 15,
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
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.tealish,
    backgroundColor: GlobalStyles.colorCodes.greenyBlue12,
    padding: 5,
  },
  headerNameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
  headerNameStyle1: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.tealish,
  },
  itemrowView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemNameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  itemNameStyle2: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    alignSelf: "flex-end",
  },
  itemNameStyle1: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.tealish,
    textAlign: "center",
  },
  totalNameStyle: {
    fontSize: 16,
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
  machineButtonViewStyle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.blue,
  },
  userButtonViewStyle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.blue,
  },
  dateViewStyle1: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  dateInfo: {
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colorCodes.tealish,
  },
  dateInfo1: {
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
    fontSize: 14,
    color: GlobalStyles.colorCodes.orange,
  },
});
export default JobView;
