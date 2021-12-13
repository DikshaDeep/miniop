/**
 * @author Raman Kant
 */

import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  Image,
  Button,
  Alert
} from "react-native";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import ImagePath from "../../../Utility/ImagePath";
import { Regex, SCREENS } from "../../../Utility/Constants";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import { TextField } from "react-native-material-textfield";
import ManagerStore from "../../../Stores/ManagerStore";
let { width } = Dimensions.get("window");
const TOP_IMAGE_WIDTH = width * 0.3;

@inject("LoginStore", "GlobalStore", "UserStore", "ManagerStore")
@observer
class UserUpdate extends Component {
  @observable Email = "";
  @observable FullName = "";
  @observable Phone = "";
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.phoneRef = React.createRef();
    this.params = this.props.route.params.userid;
    this.customFieldViaEmail = [
      {
        name: 'FullName',
        secureTextEntry: false,
        keyboardType: 'ascii-capable',
        clearTextOnFocus: false,
        returnKeyType: 'next',
        label: 'Full Name',
        labelErrorMsg: 'Full Name',
        error: 'FirstName',
        renderRightAccessory: '',
        maxLength: 100,
        onChangeText: 'handleFullNameChange',
        autoFocus: true,
        inputRef: this.nameRef
      },
      {
        name: "Phone",
        secureTextEntry: false,
        keyboardType: "number",
        clearTextOnFocus: false,
        returnKeyType: "next",
        label: "Phone",
        renderRightAccessory: "",
        error: "phone",
        maxLength: 100,
        onChangeText: "handlePhoneChange",
        autoFocus: true,
        inputRef: this.phoneRef
      },
      // {
      //   name: "Email",
      //   secureTextEntry: false,
      //   keyboardType: "email-address",
      //   clearTextOnFocus: false,
      //   returnKeyType: "next",
      //   defaultValue: this.Email,
      //   label: 'Email Id',
      //   renderRightAccessory: "",
      //   error: "Email",
      //   maxLength: 100,
      //   onChangeText: "handleEmailChange",
      //   autoFocus: true,
      //   inputRef: this.emailRef
      // },
      // {
      //   name: "Password",
      //   secureTextEntry: true,
      //   clearTextOnFocus: true,
      //   keyboardType: "ascii-capable",
      //   returnKeyType: "done",
      //   defaultValue: this.Password,
      //   label: "Password",
      //   renderRightAccessory: "renderPasswordAccessory",
      //   error: "Password",
      //   maxLength: 100,
      //   onChangeText: "handlePasswordChange",
      //   autoFocus: false,
      //   inputRef: this.passRef
      // },
    ];
    this.state = {
      secureTextEntry: true,
      selectedStatus: 'ACTIVE',
      selectedRole: 'user',
      selectedGender: 'm',
      allRoles: [
        {
          label: "Admin",
          value: "admin",
          selected: true,
          disabled: false,
        },
        { label: "User", value: "user" },
        { label: "Manager", value: "manager" },
      ],
      status: [
        {
          label: "Active",
          value: "ACTIVE",
          selected: true,
          disabled: false,
        },
        { label: "Deactive", value: "DEACTIVATED" },
      ],
      gender: [
        {
          label: "Male",
          value: "male",
          selected: true,
          disabled: false,
        },
        { label: "Female", value: "female" },
      ],
    };
  }

  async componentDidMount() {
    const data = {
      userId: this.params
    }
    const res = await this.props.UserStore.details(data);
    const userData = toJS(res.user);
    this.Email = userData.email;
    this.nameRef.current.setValue(userData.email);
    this.phoneRef.current.setValue(userData.phone);

    this.setState({ selectedRole: userData.role, selectedGender: userData.gender, selectedStatus: userData.status });
  }

  handleFullNameChange = (fullname) => {
    this.FullName = fullname;
  };
  //handle email text input change
  handleEmailChange = (email) => {
    this.Email = email;
  };
  //handle password text input change
  handlePasswordChange = (password) => {
    this.Password = password;
  };

  //handle phone text input change
  handlePhoneChange = (phone) => {
    this.Phone = phone;
  };

  onSubmitLogin = () => {
    const { LoginStore } = this.props;
    let errors = {};
    this.customFieldViaEmail.map((item) => {
      let value = this[item.name];
      let reg = Regex.reg;
      if (!value) {
        errors[item.name] = "All fields are mandatory";
      } else {
        if (item.name === "Email" && reg.test(value) === false) {
          errors[item.name] = "encorrect email";
        }
      }
    });
    let count_error = Object.keys(errors).length;
    if (count_error === 0) {
      this.loginApi();
    }

    this.setState({ errors });
  };

  async loginApi() {
    const { UserStore, ManagerStore } = this.props;
    const data = {
      name: this.FullName,
      phone: this.Phone,
      gender: this.state.selectedGender,
      userId: this.params
    }
    let response;
    if (this.state.selectedRole == 'user') {
      response = await UserStore.update(data);
    } else if (this.state.selectedRole == 'manager') {
      response = await ManagerStore.update(data);
    }
    if (response) {
      this.props.navigation.navigate(SCREENS.HOME);
    }
  }

  onAccessoryPress = () => {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry,
    }));
  };

  gotoSignUpScreen = () => {
    this.props.navigation.navigate(SCREENS.SIGNUP);
  };

  renderPasswordAccessory = () => {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ? ImagePath.EYE_CLOSE : ImagePath.EYE_OPEN;
    return (
      <TouchableOpacity
        onPress={() => {
          this.onAccessoryPress();
        }}
      >
        <Image resizeMode={"contain"} style={styles.eyeIcon} source={name} />
      </TouchableOpacity>
    );
  };

  renderInputFieldList() {
    let { errors = {}, secureTextEntry } = this.state;
    return this.customFieldViaEmail.map((item, index) => {
      return (
        <TextField
          key={index}
          secureTextEntry={item.secureTextEntry ? secureTextEntry : false}
          keyboardType={item.keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={item.clearTextOnFocus}
          // autoFocus={item.autoFocus}
          defaultValue={item.defaultValue}
          onChangeText={(text) => {
            this[item.onChangeText](text);
          }}
          returnKeyType="next"
          label={item.label}
          renderRightAccessory={this[item.renderRightAccessory]}
          error={errors[item.error]}
          maxLength={item.maxLength}
          labelFontSize={14}
          fontSize={18}
          textColor={"#ff9900"}
          baseColor={"#ff9900"}
          tintColor={"#ff9900"}
          ref={item.inputRef} 
        />
      );
    });
  }

  changeIssue = async (item, type) => {
    const {UserStore, route} = this.props;
    if (type === 'status') {
      if (item.value === 'ACTIVE') {
        const res = await UserStore.activate({userId: this.params});
        if (res) {
          Alert.alert('', 'User is activated successfully');
        }
      } else {
        const res = await UserStore.deActivate({userId: this.params});
        if (res) {
          Alert.alert('', 'User is deactivated successfully');
        }
      }
    } else {
      this.setState({ selectedRole: item.value });
    }
  };

  render() {
    const { LoginStore, UserStore } = this.props;
    const userData = toJS(UserStore.userDetails);
    console.log('email', userData);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={styles.backView}
        >
          <Image
            resizeMode={"contain"}
            style={styles.backImg}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              resizeMode={"contain"}
              style={styles.bgImage}
              source={ImagePath.APP_LOGO}
            />
            <Text style={styles.subtitle}>{"User Update"}</Text>
            <View style={styles.containerInputField}>
              {this.renderInputFieldList()}
            </View>

            {/* <View style={styles.selectissueView}>
              <TouchableOpacity style={{ marginLeft: 435 }}>
                <Text
                  style={{
                    color: GlobalStyles.colorCodes.clearBlue,
                  }}
                >
                  Reset password
                </Text>
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              {/* <View style={{ flex: 0.4 }}>
                <CustomDropdownPicker
                  items={this.state.allRoles}
                  // value={this.state.selectedRole}
                  defaultValue={this.state.selectedRole || null}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeIssue(item, 'role')}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.orange,
                  }}
                />
              </View> */}
              <View style={{ flex: 0.4 }}>
                <CustomDropdownPicker
                  items={this.state.status}
                  // value={this.state.selectedStatus}
                  defaultValue={this.state.selectedStatus || null}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeIssue(item, 'status')}
                  labelStyle={{ color: GlobalStyles.colorCodes.orange }}
                />
              </View>
              <View style={{ flex: 0.4 }}>
                <CustomDropdownPicker
                  items={this.state.gender}
                  // value={this.state.selectedStatus}
                  // defaultValue={this.state.selectedGender || null}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeIssue(item, 'gender')}
                  labelStyle={{ color: GlobalStyles.colorCodes.orange }}
                />
              </View>
            </View>

            <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={this.onSubmitLogin}
                style={GlobalStyles.defaultBtn}
              >
                <Text style={GlobalStyles.buttonTitle}>{"Update"}</Text>
              </TouchableOpacity>
            </View>
            <View style={GlobalStyles.listFooter} />
          </ScrollView>
        </KeyboardAvoidingView>
        {LoginStore.showLoader && <CustomLoader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
    // paddingTop: initialWindowSafeAreaInsets.top,
  },
  title: {
    marginTop: 24,
    fontSize: 34,
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: "center",
  },
  forgotTitle: {
    marginTop: 4,
    fontSize: 14,
    color: GlobalStyles.colorCodes.clearBlue,
    textAlign: "right",
    marginRight: 27,
  },
  buttonTitle: {
    fontSize: 15,
    color: "#fff",
    marginLeft: 10,
  },
  bgImage: {
    alignSelf: "center",
    height: TOP_IMAGE_WIDTH,
    width: TOP_IMAGE_WIDTH,
  },
  containerInputField: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: Platform.select({ ios: 6, android: 32 }),
    flex: 1,
  },
  scroll: {
    backgroundColor: "transparent",
  },
  loginBtn: {
    marginTop: 83,
    marginLeft: 48,
    marginRight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBar: {
    marginVertical: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notyetmemberTitle: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.blueGrey,
  },
  signupTitle: {
    marginLeft: 5,
    fontSize: 14,
    color: GlobalStyles.colorCodes.clearBlue,
  },
  eyeIcon: {
    height: 25,
    width: 25,
  },
  backView: {
    height: 44,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    height: 20,
    width: 15,
  },
  flag: {
    fontSize: 28,
    textAlign: "right",
  },
  datepickerStyle: {
    height: 50,
    marginTop: 10,
  },
  selectissueView: {
    marginTop: 10,
    marginHorizontal: 30,
  },
});

export default UserUpdate;
