import React from "react";
import {
  FlatList,
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx'

import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";
import ImagePath from "../../../Utility/ImagePath";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import moment from "moment";

@inject("MachineStore", "BatchStore", "UserStore", "MachineStore")
@observer
export default class AddBatchId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineName: "",
      day: "",
      date: "",
      allBatch: [
        {
          label: "Day",
          value: "D",
          selected: true,
          disabled: false,
        },
        { label: "Night", value: "N" },
      ],
      allMachine: [],
      selectedMachine: null,
      selectedUser: null
    };
    // this.params = this.props.navigation.getParam('lablelist');
  }

  async componentDidMount() {
    await this.props.MachineStore.list();
    if (this.props.route.params?.type == "ManagerBatchidListEdit") {
      const id = this.props.route.params.id;
      await this.props.BatchStore.details({batchId: id});
    } else if (this.props.route.params?.type === "ListBatchidEdit") {
      const id = this.props.route.params.data.id;
      await this.props.BatchStore.details({batchId: id});
      await this.props.MachineStore.details({machineId: this.props.route.params.data.machineName})
      this.setState({date: this.props.route.params.data.date})
    }
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTBATCHID);
  };
  onPressGotoManager = () => {
    this.props.navigation.navigate(SCREENS.MANAGERBATCHIDLIST);
  };

  header = () => {
    if (this.props.route.params) {
      if (
        this.props.route.params?.type == "ManagerBatchidListEdit" ||
        this.props.route.params?.type == "ListBatchidEdit"
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
              <Text style={styles.centerHeaderText}>{"Edit Batch ID"}</Text>
            </View>
            <TouchableOpacity
              style={styles.addbtnView}
              onPress={() => this.onPressGotoManager()}
            >
              {/* <Text style={styles.addText}>
              {'List Batch ID'}
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
          <Text style={styles.centerHeaderText}>{"Create Batch ID"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          {/* <Text style={styles.addText}>
              {'List Batch ID'}
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
  // setModalVisible = (visible) => {
  //   this.setState({ modalVisible: visible });
  // };
  renderLableListInModelAlert = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.openButton,
          backgroundColor: GlobalStyles.colorCodes.orange,
        }}
        onPress={() => {
          return (
            // this.setModalVisible(false),
            this.setState({
              batchid: item.batchid,
            })
          );
        }}
      >
        <Text style={styles.textStyle}>{item.batchid}</Text>
      </TouchableOpacity>
    );
  };

  onCreateAction = async () => {

    let data = {
      machineId: this.state.selectedMachine ? this.state.selectedMachine._id : toJS(this.props.BatchStore.batchDetails.machineId),
      shift: this.state.day ? this.state.day : 'D',
      date: this.state.date && this.state.date,
      userId: '',
      machineoutput: []
    };
    let response;
    if (this.props.route.params && this.props.route.params?.type == "ManagerBatchidListEdit") {
      const details = toJS(this.props.BatchStore.batchDetails);
      delete details['__v'];
      delete details['createdAt'];
      data = {
        ...details,
        userId: this.state.selectedUser ? this.state.selectedUser._id : toJS(this.props.BatchStore.batchDetails.userId),
        shift: this.state.day ? this.state.day : toJS(this.props.BatchStore.batchDetails.shift),
        machineId: this.state.selectedMachine ? this.state.selectedMachine._id : toJS(this.props.BatchStore.batchDetails.machineId),
        date: this.state.date || moment(toJS(this.props.BatchStore.batchDetails.date)).format('YYYY-MM-DD')
      }
      response = await this.props.BatchStore.update({batch: data});
      this.props.navigation.navigate(SCREENS.MANAGERLABELLIST, {selectedData: response, type: 'ManagerBatchId', batchid: response._id})
    } else if (this.props.route.params && this.props.route.params?.type == "ListBatchidEdit") {
      const details = toJS(this.props.BatchStore.batchDetails);
      delete details['__v'];
      delete details['createdAt'];
      data = {
        ...details,
        userId: this.state.selectedUser ? this.state.selectedUser._id : toJS(this.props.BatchStore.batchDetails.userId),
        shift: this.state.day ? this.state.day : toJS(this.props.BatchStore.batchDetails.shift),
        machineId: this.state.selectedMachine ? this.state.selectedMachine._id : toJS(this.props.BatchStore.batchDetails.machineId),
        date: this.state.date || moment(toJS(this.props.BatchStore.batchDetails.date)).format('YYYY-MM-DD')
      }
      response = await this.props.BatchStore.update({batch: data});
      this.onPressGotoAction()
    } else {

      response = await this.props.BatchStore.create({...data});
      if (this.props.route.params && this.props.route.params?.type == "ManagerBatchidListAdd") {
        this.props.navigation.navigate(SCREENS.MANAGERLABELLIST, {selectedData: data, type: 'ManagerBatchId', batchid: response._id})
      } else {
        this.onPressGotoAction()
      }
    }
  };


  changeMachine(item) {
    this.setState({selectedMachine: item});
  }
  changeDay(item) {
    this.setState({day: item.value});
  }

  render() {
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "ManagerBatchidListEdit" ||
        this.props.route.params.type == "ListBatchidEdit"
      ) {
        
        const defaultMachine = toJS(this.props.BatchStore.batchDetails) && toJS(this.props.BatchStore.batchDetails.machineId) || toJS(this.props.MachineStore?.machineDetail?.machine);
        const defaultShift = toJS(this.props.BatchStore.batchDetails) && toJS(this.props.BatchStore.batchDetails.shift) || null;
        const defaultDate = toJS(this.props.BatchStore.batchDetails) && moment(toJS(this.props.BatchStore.batchDetails.date)).format('YYYY-MM-DD') || '';
        return (
          <View style={styles.container}>
            {this.header()}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.subtitle}>{"Edit Batch ID"}</Text>
              <CustomDropdownPicker
                items={toJS(this.props.MachineStore.machineList).length > 0 ? toJS(this.props.MachineStore.machineList) : []}
                defaultValue={defaultMachine}
                placeholder={'Select a machine'}
                containerStyle={styles.selectshiftStyle}
                onChangeItem={(item) => this.changeMachine(item)}
                labelStyle={{
                  color: GlobalStyles.colorCodes.black,
                }}
              />
              {/* <View style={styles.selectissueView}>
                <Text style={styles.selectheaderText}>{"Select User"}</Text>
                <CustomDropdownPicker
                  items={toJS(this.props.UserStore.listUserData) || []}
                  defaultValue={toJS(this.props.BatchStore.batchDetails.userId) || null}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeUser(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View> */}
              <View style={styles.datepickerStyle}>
                <DatePicker
                  style={{
                    width: "90%",
                    color: "red",
                  }}
                  defaultValue
                  date={this.state.date || defaultDate}
                  mode="date"
                  placeholder="Select date"
                  minDate="10-07-2020"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />
              </View>

              <CustomDropdownPicker
                items={this.state.allBatch}
                defaultValue={defaultShift}
                containerStyle={styles.selectshiftStyle}
                onChangeItem={(item) => this.changeDay(item)}
                labelStyle={{
                  color: GlobalStyles.colorCodes.black,
                }}
              />
              <View style={styles.submitBtn}>
                <TouchableOpacity
                  onPress={() => this.onCreateAction()}
                  style={GlobalStyles.defaultBtn}
                >
                  <Text style={GlobalStyles.buttonTitle}>{"Save"}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            {/* {LoginStore.showLoader && <CustomLoader />} */}
          </View>
        );
      }
    }
    return (
      <View style={styles.container}>
        {this.header()}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.subtitle}>{"Create Batch ID"}</Text>
          <CustomDropdownPicker
            placeholder={'Select a machine'}
            items={toJS(this.props.MachineStore.machineList) || this.state.allMachine}
            defaultNull
            containerStyle={styles.selectshiftStyle}
            onChangeItem={(item) => this.changeMachine(item)}
            labelStyle={{
              color: GlobalStyles.colorCodes.black,
            }}
          />
          
          <View style={styles.datepickerStyle}>
            {/* border Radius is not working */}
            <DatePicker
              style={{
                width: "82.5%",
                color: "red",
              }}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              minDate="10-07-2020"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                console.log('date', date)
                this.setState({ date: date });
              }}
            />
          </View>

          <CustomDropdownPicker
            items={this.state.allBatch}
            defaultNull
            containerStyle={styles.selectshiftStyle}
            onChangeItem={(item) => this.changeDay(item)}
            labelStyle={{
              color: GlobalStyles.colorCodes.black,
            }}
          />
          <View style={styles.submitBtn}>
            <TouchableOpacity
              onPress={() => this.onCreateAction()}
              style={GlobalStyles.defaultBtn}
            >
              <Text style={GlobalStyles.buttonTitle}>{"Create"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  mainView: {
    flexDirection: "row",
    flex: 1,
    marginTop: 10,
    justifyContent: "space-around",
  },
  textbox: {
    backgroundColor: GlobalStyles.colorCodes.white,
    height: 50,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colorCodes.darkLightGrey,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // flex:1,
    margin: 20,
    backgroundColor: GlobalStyles.colorCodes.white,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,

    //alignItems: 'center',
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: GlobalStyles.colorCodes.orange,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  textStyle: {
    color: GlobalStyles.colorCodes.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modelheaderText: {
    padding: 10,
    fontSize: 18,
    color: GlobalStyles.colorCodes.black,
    alignSelf: "center",
  },
  subtitle: {
    marginTop: 40,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: "center",
  },
  datepickerStyle: {
    marginTop: 20,
    marginHorizontal: 85,
    marginRight: 30,
  },
  selectshiftStyle: {
    height: 50,
    marginTop: 20,
    marginLeft: 87,
    marginRight: 78,
  },
  batchInputStyle: {
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    marginLeft: 87,
    marginRight: 78,
  },
  submitBtn: {
    marginTop: 53,
    justifyContent: "center",
    alignItems: "center",
  },
  backImg: {
    height: 20,
    width: 15,
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
