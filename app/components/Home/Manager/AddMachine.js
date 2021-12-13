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
import { toJS } from "mobx";

import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

@inject("MachineStore", "UserStore")
@observer
export default class AddMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineName: "",
      lablearray: [{ lablename: "" }],
      allStatus: [
        {
          label: "Active",
          value: "Active",
          selected: true,
          disabled: false,
        },
        { label: "InActive", value: "InActive" },
      ],
      selectedStatus: null,
      selectedUser: null
    };
  }

  async componentDidMount() {
    await this.props.UserStore.listUserApi()
    if (this.props.route.params.type == "ListMachineEdit") {
      const id = this.props.route.params.id
      await this.props.MachineStore.details({machineId: id});
    }
  }

  onSubmitAction = async () => {
    // console.log('state', this.state.selectedUser)
    // console.log('selectedStatus', this.state.selectedStatus)
    const data = {
      "status" : this.state.selectedStatus && this.state.selectedStatus?.label || 'Active',
      "name" : this.state.machineName || toJS(this.props.MachineStore.machineDetail.name),
      "userId" : this.state.selectedUser && this.state.selectedUser?._id
    }
    if (this.props.route.params.type == "ListMachineEdit") {
      data.status = this.state.selectedStatus && this.state.selectedStatus.label || toJS(this.props.MachineStore.machineDetail.status)
      data.userId = this.state.selectedUser && this.state.selectedUser._id || toJS(this.props.MachineStore.machineDetail.userId)
      data.machineId = this.props.route.params.id;
      await this.props.MachineStore.update(data)
      this.props.navigation.goBack();
    } else {
      await this.props.MachineStore.create(data)
      this.props.navigation.goBack();
    }
    // this.props.navigation.navigate('CreateProduct', {
    //     lablearray: this.state.lablearray,
    //   });
  };

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
          <Text style={styles.centerHeaderText}>{"Add Machine"}</Text>
        </View>
        <View style={styles.addbtnView}>
          {/* <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          /> */}
        </View>
      </View>
    );
  };
  onChangeMachinename(text) {
    this.setState({ machineName: text });
  }

  changeUser(item) {
    this.setState({selectedUser: item});
  }

  changeStatus = (item) => {
    this.setState({selectedStatus: item})
  };

  render() {
    if (this.props.route.params) {
      if (this.props.route.params.type == "ListMachineEdit") {
        const defaultUserId = toJS(this.props.MachineStore.machineDetail) && toJS(this.props.MachineStore.machineDetail.userId) || '';
        const defaultMachineName = toJS(this.props.MachineStore.machineDetail) && toJS(this.props.MachineStore.machineDetail.name);
        const defaultStatus = toJS(this.props.MachineStore.machineDetail) && toJS(this.props.MachineStore.machineDetail.status);
        console.log('')
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

              <Text style={styles.subtitle}>{"Edit Machine"}</Text>
              <View style={styles.selectissueView}>
                <Text style={styles.selectheaderText}>{"Select User"}</Text>
                {toJS(this.props.UserStore.listUserData) && toJS(this.props.UserStore.listUserData).length > 0 && 
                <CustomDropdownPicker
                  items={toJS(this.props.UserStore.listUserData).length > 0 ? toJS(this.props.UserStore.listUserData) : []}
                  defaultValue={defaultUserId || null}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeUser(item)}
                  labelStyle={{ color: GlobalStyles.colorCodes.black }}
                />}
              </View>
              <View style={styles.selectissueView1}>
                <Text style={styles.selectheaderText}>{"Select Status"}</Text>
                <CustomDropdownPicker
                  items={this.state.allStatus}
                  defaultValue={defaultStatus || ''}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeStatus(item)}
                  labelStyle={{ color: GlobalStyles.colorCodes.black }}
                />
              </View>
              <View style={styles.labelInputStyle}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={defaultMachineName}
                  // value={this.props.route.params.data.machinename}
                  placeholder={"Enter Machine Name"}
                  onChangeText={(text) => this.onChangeMachinename(text)}
                />
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

      if (this.props.route.params.type == "ListMachineAdd") {
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

              <Text style={styles.subtitle}>{"Add Machine"}</Text>
              <View style={styles.selectissueView}>
                <Text style={styles.selectheaderText}>{"Select User"}</Text>
                <CustomDropdownPicker
                  items={toJS(this.props.UserStore.listUserData)}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeUser(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View>
              <View style={styles.selectissueView1}>
                <Text style={styles.selectheaderText}>{"Select Status"}</Text>
                <CustomDropdownPicker
                  items={this.state.allStatus}
                  defaultValue={'Active'}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeStatus(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View>

              <View style={styles.labelInputStyle}>
                <TextInput
                  style={styles.inputTextStyle}
                  value={this.state.machineName}
                  placeholder={"Enter Machine Name"}
                  onChangeText={(text) => this.onChangeMachinename(text)}
                />
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
  selectissueView: {
    marginTop: 60,
    marginHorizontal: 50,
  },
  selectissueView1: {
    marginTop: 20,
    marginBottom: 8,
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
