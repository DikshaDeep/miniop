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
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import { observable } from "mobx";

@inject("MachineStore")
@observer
class ListMachine extends Component {
  @observable itemIndex = "";
  @observable countItem = 2;
  constructor(props) {
    super(props);
    this.state = {
      ITEM_DATA: [
        {
          id: 1,
          machineName: "Lathe1",
          userName: "Sonu",
          status: "Active",
        },
        {
          id: 2,
          machineName: "Lathe2",
          userName: "Chotu",
          status: "Active",
        },
        {
          id: 3,
          machineName: "Lathe3",
          userName: "Ramesh",
          status: "Active",
        },
        {
          id: 4,
          machineName: "Lathe4",
          userName: "Suresh",
          status: "Active",
        },
        {
          id: 5,
          machineName: "Driller1",
          userName: "Ravi",
          status: "Active",
        },
        {
          id: 6,
          machineName: "Driller2",
          userName: "Tinku",
          status: "Active",
        },
        {
          id: 7,
          machineName: "Driller3",
          userName: "Rinku",
          status: "Active",
        },
      ],
    };
  }

  async componentDidMount() {
    await this.getList();
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.AddMACHINE, {
      type: "ListMachineAdd",
    });
  };

  EditOperation = (item) => {
    console.log('edit machine---', item);
    this.props.navigation.navigate(SCREENS.AddMACHINE, {
      type: "ListMachineEdit",
      id: item._id,
      data: {
        machinename: item.namae,
        username: item.userId,
      },
    });
  };

  deleteOperation = async (item) => {
    await this.props.MachineStore.delete({
      "machineId": item._id
    });
  };

  getList = async () => {
    await this.props.MachineStore.list()
  }

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
          <Text style={styles.listHeaderText}>{"List Machine"}</Text>
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
  onPressProduct = (item) => {
    this.props.navigation.navigate(SCREENS.MACHINEJOBS, {
      type: "Listmachine",
      data: { machinename: item.machineName, username: item.userName },
    });
  };
  renderAllListView = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.onPressProduct(item)}
      >
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.headerNameStyle1}>{item.name}</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.itemNameStyle1}>{item.userId.substr(item.userId.length - 5)}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle2}>{item.status}</Text>
          </View>
          <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly' }}>

          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => this.EditOperation(item)}
          >
            <Image
              resizeMode={"contain"}
              style={styles.back}
              source={ImagePath.EDIT_ICON}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.deleteOperation(item)}>
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
  };

  machinelistView = () => {
    return (
      <View style={styles.itemListViewStyle}>
        <View style={styles.dateViewStyle1}>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.headerNameStyle}>{"Machine Name"}</Text>
          </View>
          <View style={{ flex: 0.3, marginRight: 5 }}>
            <Text style={styles.itemNameStyle}>{"User Name"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.itemNameStyle}>{"Status"}</Text>
          </View>
          <View style={{ flex: 0.3, marginRight: 7 }}>
            <Text style={styles.itemNameStyle}>{"Action"}</Text>
          </View>
        </View>
        <FlatList
          //contentContainerStyle={styles.listMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={toJS(this.props.MachineStore.machineList)}
          keyExtractor={true}
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
    flex: 0.6,
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
    fontSize: 18,
    color: GlobalStyles.colorCodes.orange,
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
    flex: 0.6,
    flexWrap: "wrap",
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
  sizeView: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  dateViewStyle1: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 4,
  },
  dateInfo: {
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colorCodes.tealish,
  },
  dateInfo1: {
    fontWeight: "bold",
    marginRight: 20,
    color: GlobalStyles.colorCodes.black,
  },
  itemNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  itemNameStyle1: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  itemNameStyle2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colorCodes.tealish,
    backgroundColor: GlobalStyles.colorCodes.greenyBlue12,
  },
  headerNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.black,
  },
  headerNameStyle1: {
    marginHorizontal: 15,
    fontSize: 14,
    color: GlobalStyles.colorCodes.black,
  },
});
export default ListMachine;
