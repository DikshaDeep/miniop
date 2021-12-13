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
class AddProductSize extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      removeAll: false,
      ITEM_DATA: [
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Orange",
          size: "12*5",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Mango",
          size: "12*7",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Pear",
          size: "10*2",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Apple",
          size: "12*8",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Pinapple",
          size: "12*5",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Guava",
          size: "8*4",
        },
        {
          logoImg: ImagePath.APP_LOGO,
          productName: "Tomato",
          size: "7*5",
        },
      ],
    };
  }

  // onPressGotoAction = () => {
  //   this.props.navigation.navigate(SCREENS.CREATEBATCHID);
  // };

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
          <Text style={styles.centerHeaderText}>{"List Product Size"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          // onPress={() => this.onPressGotoAction()}
        >
          <Text style={styles.addText}>{""}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <View style={styles.textView}>
              <Text style={styles.productName}>{item.productName}</Text>
            </View>
          </View>

          <View style={styles.sizeView}>
            <View style={styles.dateViewStyle}>
              <Text style={styles.dateInfo}>{"Size : " + item.size}</Text>
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
    padding: 10,
  },
  productName: {
    marginTop: 7,
    fontSize: 13,
    color: GlobalStyles.colorCodes.black2,
  },
  imageView: {
    flexDirection: "row",
    flex: 0.6,
    flexWrap: "wrap",
  },
  image: {
    height: 94,
    width: 72,
    borderRadius: 5,
  },
  sizeView: {
    flex: 0.4,
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
export default AddProductSize;
