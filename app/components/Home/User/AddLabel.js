import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx'

import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

@inject("MachineStore", "BatchStore", "UserStore", "BatchMachineStore")
@observer
export default class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchid: "",
      labelname: "",
      labelarray: [{ labelname: "" }],
      allBatch: [
        {
          label: "SDFSDF342242",
          value: "1",
          selected: true,
          disabled: false,
        },
        { label: "WEREWRSDF324324", value: "2" },
        { label: "3242DSFFSDF", value: "3" },
        { label: "SDF32423", value: "4" },
      ],
      allcustomer: [
        {
          label: "Choose Label",
          value: "1",
          selected: true,
          disabled: false,
        },
        { label: "WEREWRSDF324324", value: "2" },
        { label: "3242DSFFSDF", value: "3" },
        { label: "SDF32423", value: "4" },
      ],
    };
  }

  async componentDidMount() {
    console.log('this.props.route.params in user add label', this.props.route.params)
    await this.props.UserStore.listUserApi({});
    if (this.props.route.params.batchid) {
      const batchid = this.props.route.params?.batchid;
      await this.props.BatchStore.details({batchId: batchid});
    }
    if (this.props.route.params.type === "ManagerLabelListEdit") {
      const batchid = this.props.route.params.data.batchid;
      const id = this.props.route.params.data.id;
      await this.props.BatchStore.details({batchId: batchid});
      await this.props.BatchMachineStore.details({
        "batch":{
          "_id": batchid,
          "machineoutput": {
            "_id": id
          }
        }
      })
    }
  }
  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTLABEL);
  };
  // onPressGotoUserLabelList = () => {
  //   this.props.navigation.navigate(SCREENS.USERLABELLIST);
  // };
  // onPressGotoManagerLabelList = () => {
  //   this.props.navigation.navigate(SCREENS.MANAGERLABELLIST);
  // };

  header = () => {
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "ManagerLabelListEdit" ||
        this.props.route.params.type == "ListLabelEdit"
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
              <Text style={styles.centerHeaderText}>
                {"Edit Label Name"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addbtnView}
              // onPress={() => this.onPressGotoManagerLabelList()}
            >
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
    if (this.props.route.params) {
      if (this.props.route.params.type == "UserLabelListEditWithoutBatchid") {
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
              <Text style={styles.centerHeaderText}>{"Edit Label Name"}</Text>
            </View>
            <View
              style={styles.addbtnView}
              // onPress={() => this.onPressGotoUserLabelList()}
            >
              {/* <Image
                resizeMode={"contain"}
                style={styles.back}
                source={ImagePath.HAMBURGER_LIST}
              /> */}
            </View>
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
          <Text style={styles.centerHeaderText}>{"Create Label Name"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onSubmitAction = async () => {
    let response;
    if (this.props.route.params.type === "ManagerLabelListAdd") {
      const orderno = this.props.route.params.orderno;
      const item = this.state.labelname;
      const data = {
        "batch":{
          "_id": this.state.batchid
        },
        "machine": {
          "customername": item.name,
          orderno: orderno,
          status: 'Dispatched'
        }                        
      };
      response = await this.props.BatchMachineStore.create(data);
    }
    if (this.props.route.params.type === "ManagerLabelListEdit") {
      const details = toJS(this.props.BatchMachineStore.batchOrderDetails);
      const batchid = this.props.route.params.data.batchid;
      const id = details?.machineoutput._id;
      const orderno = details.machineoutput?.orderno || 0;
      const status = details.machineoutput.status;
      const item = this.state.labelname;
      const data = {
        "batch":{
          "_id": batchid
        },
        "updateBoxes": {
          "_id": id,
          "customername": item.name,
          orderno: orderno ? orderno : 1,
          status: status
        }                        
      }
      response = await this.props.BatchMachineStore.update(data);
    }
    if (response) {
      this.props.navigation.navigate(SCREENS.LISTPRODUCT, {
        labelname: this.state.labelname,
        batchid: this.state.batchid,
      });
    } else {
      Alert.alert('Error', 'Something went wrong! Please try again later');
    }
  };

  changeBatchId = (item) => {
    this.setState({ batchid: item._id });
  };
  changeLabelName = (item) => {
    this.setState({ labelname: item });
  };

  render() {
    console.log('params in add label', this.props.route.params)
    const selectedCustomer = toJS(this.props.BatchMachineStore.batchOrderDetails)?.orderdata && toJS(this.props.BatchMachineStore.batchOrderDetails)?.orderdata.customername || null;
    const allcustomer = toJS(this.props.UserStore.listUserData) || [];
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "ManagerLabelListEdit" ||
        this.props.route.params.type == "ListLabelEdit"
      ) {
        // {this.props.route.params.data.customername}
        // {this.props.route.params.data.orderid}
        return (
          <View style={styles.container}>
            {this.header()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.subtitle}>{"Edit Label Name"}</Text>
              <View style={styles.selectbatchView}>
                <Text style={styles.selectheaderText}>
                  {"Select Label Name"}
                </Text>
                {allcustomer.length > 0 && <CustomDropdownPicker
                  items={allcustomer}
                  defaultValue={selectedCustomer}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeLabelName(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />}
              </View>
              <View style={styles.submitBtn}>
                <TouchableOpacity
                  onPress={this.onSubmitAction}
                  style={GlobalStyles.defaultBtn}
                >
                  <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* {LoginStore.showLoader && <CustomLoader />} */}
          </View>
        );
      }
    }
    if (this.props.route.params) {
      if (this.props.route.params.type == "UserLabelListEditWithoutBatchid") {
        return (
          <View style={styles.container}>
            {this.header()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.subtitle}>{"Edit Label Name"}</Text>
              <View style={styles.selectbatchView}>
                <Text style={styles.selectheaderText}>
                  {"Select Label Name"}
                </Text>
                {allcustomer.length > 0 && <CustomDropdownPicker
                  items={allcustomer}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeLabelName(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />}
              </View>
              <View style={styles.submitBtn}>
                <TouchableOpacity
                  onPress={this.onSubmitAction}
                  style={GlobalStyles.defaultBtn}
                >
                  <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* {LoginStore.showLoader && <CustomLoader />} */}
          </View>
        );
      }
    }
    const batchList = toJS(this.props.BatchStore.listBatch);
    return (
      <View style={styles.container}>
        {this.header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.subtitle}>{"Create Label Name"}</Text>
          <View style={styles.selectbatchView}>
            <Text style={styles.selectheaderText}>{"Select Batch Id"}</Text>
            {batchList.length > 0 && <CustomDropdownPicker
              items={toJS(this.props.BatchStore.listBatch)}
              placeholder={"Select batch id"}
              // defaultValue={toJS(this.props.BatchStore.batchDetails._id)}
              containerStyle={styles.datepickerStyle}
              onChangeItem={(item) => this.changeBatchId(item)}
              labelStyle={{
                color: GlobalStyles.colorCodes.black,
              }}
            />}
          </View>
          <View style={styles.selectbatchView}>
            <Text style={styles.selectheaderText}>{"Select Label Name"}</Text>
            {allcustomer.length > 0 && <CustomDropdownPicker
                  items={allcustomer}
                  placeholder={"Select user name"}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeLabelName(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />}
          </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity
              onPress={this.onSubmitAction}
              style={GlobalStyles.defaultBtn}
            >
              <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
            </TouchableOpacity>
          </View>
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
  centerHeaderText: {
    fontSize: 16,
    color: GlobalStyles.colorCodes.charcoalGrey,
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
    //  flex:1,
    marginTop: 10,
  },
  labelInputStyle: {
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: 50,
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
  datepickerStyle: {
    height: 50,
    marginTop: 10,
  },
  selectbatchView: {
    marginTop: 60,
    marginHorizontal: 50,
  },
  selectheaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.warmGrey,
  },
});
