import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { inject, observer } from "mobx-react";
import { observable, toJS } from "mobx";

import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

@inject("ProductStore", "BatchMachineProductBoxStore", "BatchMachineProductStore", "UserStore")
@observer
export default class AddElements extends React.Component {
  constructor(props) {
    super(props);
    // (this.labelname = this.props.navigation.state.params("labelname")),
    //   (this.productname = this.props.navigation.state.params(
    //     "productname"
    //   )),
    this.state = {
      lablearray: [{ lablename: "" }],
      countInput: [{ inputShow: 1 }],
      boxNumberText: "",
      boxWeightText: "",
      allLables: [
        {
          label: "Ram",
          value: "1",
          selected: true,
          disabled: true,
        },
      ],
      allProduct: [
        {
          label: "Mango",
          value: "1",
          selected: true,
          disabled: true,
        },
      ],
    };
  }

  async componentDidMount() {
    const {ProductStore, UserStore, BatchMachineProductStore} = this.props;
    console.log('params-----', this.props.route.params);
    // await ProductStore.list();
    // await UserStore.list({page: 1})
    if (this.props.route.params.type == "ManagerElementsListEdit") {
      const {batchid, machineOutputId, productId} = this.props.route.params;

      const ITEM_DATA = toJS(this.props.BatchMachineProductBoxStore.listBatchMachineProductBox);
      this.setState({
        countInput: [...ITEM_DATA]
      })
      console.log('element ', ITEM_DATA)
    
    } 
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTELEMENT);
  };

  header = () => {
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "ManagerElementsListEdit" ||
        this.props.route.params.type == "UserElementListEdit" ||
        this.props.route.params.type == "ListElementsEdit"
      ) {
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
              {/* style={styles.centerHeaderText} */}
              <Text>{"Edit Elements"}</Text>
            </View>
            <TouchableOpacity
              style={styles.addbtnView}
              // onPress={() => this.onPressGotoManagerList()}
            >
              {/* <Text style={styles.addText}>
              {'List Elements'}
            </Text> */}
              {/* <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.HAMBURGER_LIST}
              /> */}
            </TouchableOpacity>
          </View>
        );
      }
    }
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
          {/* style={styles.centerHeaderText} */}
          <Text>{"Create Elements"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          {/* <Text style={styles.addText}>
              {'List Elements'}
            </Text> */}
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          />
        </TouchableOpacity>
      </View>
    );
  };
  addItems() {
    const { countInput } = this.state;
    let storedata = {
      boxnumber: "Box Number",
      boxweight: "Box Weight",
    };
    if (countInput.length >= 1) {
      countInput.push(storedata);
    }
    this.setState({ countInput });
  }
  removeItems() {
    const { countInput } = this.state;
    let storedata = {
      boxnumber: "Box Number",
      boxweight: "Box Weight",
    };
    if (countInput.length > 1) {
      countInput.pop(storedata);
    }
    this.setState({ countInput });
  }
  renderLableListView = ({ item, index }) => {
    return (
      <View>
        {this.state.countInput.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                marginHorizontal: 20,
              }}
            >
              <View style={styles.labelInputStyle}>
                <TextInput
                  style={styles.inputTextStyle}
                  // value={{}}
                  defaultValue={item.boxnumber.toString()}
                  keyboardType={"numeric"}
                  placeholder={"Box Number"}
                  onChangeText={(text) =>
                    this.onChangeboxNumbername(text, index)
                  }
                />
              </View>
              <View style={styles.labelInputStyle}>
                <TextInput
                  style={styles.inputTextStyle}
                  // value={{}}
                  defaultValue={item.boxweight}
                  // keyboardType={"numeric"}
                  placeholder={"Box Weight"}
                  onChangeText={(text) => this.onChangeWeightname(text, index)}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  onChangeboxNumbername(text, index) {
    const countInput = [...this.state.countInput];
    countInput[index] = {
      ...this.state.countInput[index],
      boxnumber: text,
    };
    this.setState({ countInput });
  }

  onChangeWeightname(text, index) {
    const countInput = [...this.state.countInput];
    countInput[index] = {
      ...this.state.countInput[index],
      boxweight: text,
    };
    this.setState({ countInput });
  }

  onSubmitAction = async () => {
    if (this.props.route.params.type === 'ManagerElementsListEdit') {
      console.log('this.state.countInput', this.state.countInput)
      const {batchid, machineOutputId, productId} = this.props.route.params;
      const res = await this.props.BatchMachineProductBoxStore.updateAll({
        "batch":{
          "_id": batchid,
          "machineoutput": {
              "_id": machineOutputId,
              "products": {
                "_id": productId
            }
          }
        },
        updateBoxes: [
          ...this.state.countInput
        ]
      });
      if (res) {
        this.props.navigation.goBack();
      }
    } else {

      const {batchid, machineOutputId, productId} = this.props.route.params;
      const res = await this.props.BatchMachineProductBoxStore.create({
        "batch":{
          "_id": batchid,
          "machineoutput": {
              "_id": machineOutputId,
              "products": {
                "_id": productId
            }
          }
        },
        boxes: [
          ...this.state.countInput
        ]
      });
      if (res) {
        this.props.navigation.goBack();
      }
    }
    this.props.navigation.navigate(SCREENS.CREATEPRODUCT);
  };
  changeIssue(item) {
    // alert(item.label)
  }

  render() {
    const data = toJS(this.props.ProductStore.productList);
    const productname = this.props.route.params.productname || null;
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "ManagerElementsListEdit" ||
        this.props.route.params.type == "UserElementListEdit" ||
        this.props.route.params.type == "ListElementsEdit"
      ) {
        return (
          <View style={styles.container}>
            {this.header()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

              <Text style={styles.subtitle}>{"Edit Elements"}</Text>
              <View style={styles.selectproductView}>
                <Text style={styles.selectheaderText}>{"Product Name"}</Text>
                <CustomDropdownPicker
                  items={data}
                  placeholder={'Select a product'}
                  // defaultValue={productname}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeIssue(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View>
              <View style={styles.flatlistView}>
                <FlatList
                  data={this.state.lablearray}
                  renderItem={this.renderLableListView}
                  keyExtractor={(item) => item._id}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    style={styles.addViewbtn}
                    onPress={() => this.removeItems()}
                  >
                    <Text style={styles.newText}>{"Remove"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addViewbtn}
                    onPress={() => this.addItems()}
                  >
                    <Text style={styles.newText}>{"+Add"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.submitBtn}>
                <TouchableOpacity
                  onPress={this.onSubmitAction}
                  style={GlobalStyles.defaultBtn}
                >
                  <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
                </TouchableOpacity>
              </View>
              {/* </KeyboardAvoidingView> */}
            </ScrollView>

            {/* {LoginStore.showLoader && <CustomLoader />} */}
          </View>
        );
      }
    }
    return (
      <View style={styles.container}>
        {this.header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

          <Text style={styles.subtitle}>{"Create Elements"}</Text>
          <View style={styles.selectLabelView}>
            <Text style={styles.selectheaderText}>{"Select Label Name"}</Text>
            <CustomDropdownPicker
              items={this.state.allLables}
              defaultNull
              containerStyle={styles.datepickerStyle}
              onChangeItem={(item) => this.changeIssue(item)}
              labelStyle={{
                color: GlobalStyles.colorCodes.black,
              }}
            />
          </View>
          <View style={styles.selectproductView}>
            <Text style={styles.selectheaderText}>{"Select Product Name"}</Text>
            <CustomDropdownPicker
              items={this.state.allProduct}
              defaultNull
              containerStyle={styles.datepickerStyle}
              onChangeItem={(item) => this.changeIssue(item)}
              labelStyle={{
                color: GlobalStyles.colorCodes.black,
              }}
            />
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              data={this.state.lablearray}
              renderItem={this.renderLableListView}
              keyExtractor={(item) => item.id}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={styles.addViewbtn}
                onPress={() => this.removeItems()}
              >
                <Text style={styles.newText}>{"Remove"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addViewbtn}
                onPress={() => this.addItems()}
              >
                <Text style={styles.newText}>{"+Add"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity
              onPress={this.onSubmitAction}
              style={GlobalStyles.defaultBtn}
            >
              <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
            </TouchableOpacity>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>

        {/* {LoginStore.showLoader && <CustomLoader />} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  inputTextStyle: {
    backgroundColor: GlobalStyles.colorCodes.white,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colorCodes.lightGrey,
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
  backView: {
    flex: 0.2,
    height: 44,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
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
  flatlistView: {
    marginTop: 25,
  },
  labelInputStyle: {
    flex: 0.5,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },

  backImg: {
    height: 20,
    width: 15,
  },
  subtitle: {
    marginTop: 40,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: "center",
  },
  submitBtn: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  newText: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.white,
    alignSelf: "center",
  },
  addViewbtn: {
    marginTop: 10,
    marginHorizontal: 40,
    height: 40,
    backgroundColor: GlobalStyles.colorCodes.orange,

    width: "20%",
    alignSelf: "flex-end",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectLabelView: {
    marginTop: 60,
    marginHorizontal: 50,
  },
  selectproductView: {
    marginTop: 20,
    marginHorizontal: 50,
  },
  selectheaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.warmGrey,
  },
  datepickerStyle: {
    height: 50,
    marginTop: 10,
  },
});
