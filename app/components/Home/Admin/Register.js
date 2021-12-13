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
} from "react-native";
import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import ImagePath from "../../../Utility/ImagePath";
import { observer, inject } from "mobx-react";
import { Regex, SCREENS } from "../../../Utility/Constants";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import { TextField } from "react-native-material-textfield";
import { observable } from "mobx";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";
let { width } = Dimensions.get("window");
const TOP_IMAGE_WIDTH = width * 0.2;

const customFieldViaEmail = [
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
  },
  {
    name: "Email",
    secureTextEntry: false,
    keyboardType: "email-address",
    clearTextOnFocus: false,
    returnKeyType: "next",
    label: "Email Id",
    renderRightAccessory: "",
    error: "Email",
    maxLength: 100,
    onChangeText: "handleEmailChange",
    autoFocus: false,
  },
  {
    name: "Password",
    secureTextEntry: true,
    clearTextOnFocus: true,
    keyboardType: "ascii-capable",
    returnKeyType: "done",
    label: "Password",
    renderRightAccessory: "renderPasswordAccessory",
    error: "Password",
    maxLength: 100,
    onChangeText: "handlePasswordChange",
    autoFocus: false,
  },
];
@inject("LoginStore", "GlobalStore")
@observer
class Register extends Component {
  @observable Email = "";
  @observable Password = "";
  @observable FullName = "";
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      setUserRole:'User',
      setGender:'male',
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
      allGender: [
        {
          label: "Male",
          value: "male",
          selected: true,
          disabled: false,
        },
        { label: "Female", value: "female" },
      ],
      status: [
        {
          label: "Active",
          value: "1",
          selected: true,
          disabled: false,
        },
        { label: "Deactive", value: "2" },
      ],
    };
  }

  //handle email text input change
  handleEmailChange = (email) => {
    this.Email = email;
  };
  //handle password text input change
  handlePasswordChange = (password) => {
    this.Password = password;
  };

    //handle Full Name text input change
    handleFullNameChange = (fullname) => {
      this.FullName = fullname;
    };

  onSubmitLogin = () => {
    const { LoginStore } = this.props;
    let errors = {};
    customFieldViaEmail.map((item) => {
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
      this.registerApi();
    }

    this.setState({ errors });
  };

  async registerApi() {
    const { LoginStore } = this.props;
    const{setUserRole,setGender} = this.state;
    const apiData = {
      email: this.Email.trim(),
      password: this.Password.trim(),
      role: setUserRole,
      name:this.FullName.trim(),
      gender:setGender,
    };
    console.log('---befor register api----');
    console.log(JSON.stringify(apiData));
    // let response = await LoginStore.register(apiData);
    // console.log('---after register api----');
    // console.log(JSON.stringify(response));
    // if (response) {
    //   this.props.navigation.navigate(SCREENS.HOME);
    // }
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
    const { LoginStore } = this.props;
    let { errors = {}, secureTextEntry } = this.state;
    return customFieldViaEmail.map((item, index) => {
      return (
        <TextField
          key={index}
          secureTextEntry={item.secureTextEntry ? secureTextEntry : false}
          keyboardType={item.keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={item.clearTextOnFocus}
          autoFocus={item.autoFocus}
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
        />
      );
    });
  }

  changeRole = (item) => {
    console.log("Selected value of dropdown is ", item);
    this.setState({setUserRole: item.value})
  };
  changeGender = (item) => {
    console.log("Selected value of dropdown is gender ", item);
    this.setState({setGender: item.value})
  };
  

  render() {
    // console.log("params ", JSON.stringify(this.props.route.params.type));
    const { LoginStore } = this.props;
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
            <Text style={styles.subtitle}>{"Register"}</Text>
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
             <View style={styles.customdPiker}>
                <CustomDropdownPicker
                  items={this.state.allGender}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeGender(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.orange,
                  }}
                />
              </View>
           
              <View style={styles.customdPiker}>
                <CustomDropdownPicker
                  items={this.state.allRoles}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeRole(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.orange,
                  }}
                />
              </View>
           

            <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={this.onSubmitLogin}
                style={GlobalStyles.defaultBtn}
              >
                <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
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
    paddingTop: initialWindowSafeAreaInsets.top,
  },
  title: {
    marginTop: 24,
    fontSize: 34,
    color: GlobalStyles.colorCodes.black,
    textAlign: "center",
  },
  customdPiker:
  {
    marginTop: 20,
    marginHorizontal:32,
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
    marginHorizontal:32,
    marginTop: Platform.select({ ios: 6, android: 32 }),
    flex: 1,
  },
  scroll: {
    backgroundColor: "transparent",
  },
  loginBtn: {
    marginTop: 83,
    marginHorizontal:48,
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

export default Register;
