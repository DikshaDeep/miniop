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
import ImagePath from "../../Utility/ImagePath";
import GlobalStyles from "../../Utility/GlobalStyles";
import { inject, observer } from "mobx-react";
import { SCREENS } from "../../Utility/Constants";
import Dash from "react-native-dash";
import { observable } from "mobx";

@inject("LoginStore")
@observer
class ListSummary extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
      ITEM_DATA: [
        {
          pid: "1",
          labelName: "Ram",
          date: "13-07-2020",
          data: [
            {
              id: "1",
              product: "orange",
              size: "12*5",
              qty: "100",
              wt: "1000",
            },
            {
              id: "2",
              product: "apple",
              size: "12*7",
              qty: "84",
              wt: "900",
            },
          ],
        },
        {
          pid: "2",
          labelName: "Raghavendra",
          date: "14-07-2020",
          data: [
            {
              id: "8",
              product: "apple",
              size: "12*5",
              qty: "400",
              wt: "5000",
            },
            {
              id: "11",
              product: "banana",
              size: "12*5",
              qty: "300",
              wt: "2000",
            },
            {
              id: "1",
              product: "orange",
              size: "12*5",
              qty: "800",
              wt: "10000",
            },
            {
              id: "13",
              product: "mango",
              size: "12*5",
              qty: "200",
              wt: "1500",
            },
          ],
        },
      ],
    };
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
          <Text style={styles.listmachinHeaderText}>{"List Summary"}</Text>
        </View>
        <TouchableOpacity style={styles.addbtnView} />
      </View>
    );
  };

  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.cartNameStyle}>{item.labelName}</Text>
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
        <View style={{ marginHorizontal: 30 }}>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.headerNameStyle}>{"Product"}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.itemNameStyle}>{"Size"}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.itemNameStyle}>{"Qty"}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.itemNameStyle}>{"Wt"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemView}>{this.productlistView(item.data)}</View>

        <Dash
          dashGap={6}
          dashLength={8}
          dashThickness={1}
          dashColor={GlobalStyles.colorCodes.lightGrey}
          //style={styles.dashmargin}
        />
        <View style={{ marginHorizontal: 30 }}>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.3 }} />
            <View style={{ flex: 0.2 }}>
              <Text
                style={[
                  styles.totalNameStyle,
                  { color: GlobalStyles.colorCodes.tealish },
                ]}
              >
                {"Total"}
              </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text
                style={[
                  styles.totalNameStyle,
                  { color: GlobalStyles.colorCodes.tealish },
                ]}
              >
                {"184"}
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={[
                  styles.totalNameStyle,
                  { color: GlobalStyles.colorCodes.tealish },
                ]}
              >
                {"1900"}
              </Text>
            </View>
          </View>
        </View>
        <Dash
          dashGap={6}
          dashLength={8}
          dashThickness={1}
          dashColor={GlobalStyles.colorCodes.lightGrey}
          style={{ marginBottom: 5 }}
        />
      </TouchableOpacity>
    );
  };

  renderDataAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <View style={styles.itemView}>
          <View style={styles.itemrowView}>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.headerNameStyle}>{item.product}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.itemNameStyle}>{item.size}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.itemNameStyle}>{item.qty}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.itemNameStyle}>{item.wt}</Text>
            </View>
          </View>

          {this.productlistView(item.data)}
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
          keyExtractor={(item, index) => item.labelName + index}
        />
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
          data={item}
          renderItem={this.renderDataAllListView}
          keyExtractor={(item, index) => item.product + index}
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
    marginHorizontal: 5,
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
  headerNameStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
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
    alignSelf: "flex-end",
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
    fontSize: 14,
    color: GlobalStyles.colorCodes.orange,
  },
});
export default ListSummary;
