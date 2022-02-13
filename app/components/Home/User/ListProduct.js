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
import { observable } from "mobx";
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";

@inject("LoginStore", "ProductStore")
@observer
class ListProduct extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      ITEM_DATA: null,

      loader: false,
    };
  }

  async componentDidMount() {
    this.setState({loader: true})
    await this.getList();
  }

  async getList() {
    await this.props.ProductStore.list()
  }

  deleteOperation = async (item) => {
    console.log('item--', item);
    await this.props.ProductStore.delete({
      "productId": item._id
    });
  };

  onPressGotoManagerAction = () => {
    this.props.navigation.navigate(SCREENS.ADDPRODUCT, {
      type: "ManagerListProduct",
    });
  };
  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.ADDPRODUCT);
  };
  GoToEdit = (item) => {
    this.props.navigation.navigate(SCREENS.ADDPRODUCT, {
      type: "edit",
      id: item._id,
      data: {
        productname: item.name,
        size: item.size,
      },
    });
  };

  header = () => {
    if (this.props.route.params.type === "manager") {
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
            // onPress={() =>
            //   this.onPressGotoEdit(this.props.route.params.productname)
            // }
          >
            <Image
              resizeMode={"contain"}
              style={styles.back}
              source={ImagePath.SEND_ICON}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addbtnView}
            onPress={() => this.onPressGotoManagerAction()}
          >
            <Text style={styles.addText}>{"+"}</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
          // onPress={() =>
          //   this.onPressGotoEdit(this.props.route.params.productname)
          // }
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.SEND_ICON}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          <Text style={styles.addText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  onPressProduct = (item) => {
    this.props.navigation.navigate(SCREENS.LISTELEMENT, {
      type: "Listproduct",
      batchid: this.props.route.params.batchid,
      labelname: this.props.route.params.labelname,
      productname: item.name,
      size: item.size,
    });
  };
  renderAllListView = ({ item, index }) => {
    if (this.props.route.params.type == "Listlabel") {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.onPressProduct(item)}
        >
          <View style={styles.dateViewStyle1}>
            <View style={{flex: 0.4}}>
              <View style={styles.textView}>
                <Text style={styles.productName}>{item.name}</Text>
              </View>
            </View>

            <View style={styles.sizeView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>{item.size}</Text>
              </View>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row'}}>

              <TouchableOpacity
                onPress={() => this.GoToEdit(item)}
                style={{
                  marginLeft: 20,
                }}
              >
                <Image
                  resizeMode={"contain"}
                  style={styles.back}
                  source={ImagePath.EDIT_ICON}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 10,
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
          </View>
        </TouchableOpacity>
      );
    }

    if (this.props.route.params.type == "manager") {
      return (
        <View style={styles.card}>
          <View style={styles.mainView}>
            <View style={{flex: 0.3}}>
              <View style={styles.textView}>
                <Text style={styles.productName}>{item.name}</Text>
              </View>
            </View>

            <View style={styles.sizeView}>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateInfo}>{item.size}</Text>
              </View>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>

            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => this.GoToEdit(item)}
            >
              <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.EDIT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}
            onPress={() => this.deleteOperation(item)}
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
      );
    }
  };

  machinelistView = () => {
    return (
      <View style={styles.itemListViewStyle}>
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.headerNameStyle}>{"Product Name"}</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'center' }}>
            <Text style={styles.itemNameStyle}>{"Size"}</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        {toJS(this.props.ProductStore.productList).length > 0 && <FlatList
          //contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={toJS(this.props.ProductStore.productList)}
          renderItem={this.renderAllListView}
          keyExtractor={(item, index) => item.name + index}
        />}
      </View>
    );
  };

  render() {

    if (this.props.route.params.type === "Listlabel") {
      return (
        <SafeAreaView style={styles.container}>
          {this.header()}
          <View style={styles.batchidNameView}>
            <Text style={styles.batchidName}>
              {"Batch ID:   "}
              {this.props.route.params?.batchid}
            </Text>
            <Text style={styles.batchidName}>
              {"Label Name:   "}
              {this.props.route.params?.labelname?.customername}
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
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  batchidName: {
    fontSize: 25,
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
  productName: {
    fontSize: 13,
    color: GlobalStyles.colorCodes.black2,
  },
  imageView: {
    flex: 0.4,
    flexWrap: "wrap",
  },
  textView: {
  },
  sizeView: {
    flex: 0.3,
    alignItems: "center",
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
export default ListProduct;
