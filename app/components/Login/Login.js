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
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

import GlobalStyles from "../../Utility/GlobalStyles";
import CustomLoader from "../../ReusableComponents/CustomLoader";
import ImagePath from "../../Utility/ImagePath";
import { Regex, SCREENS } from "../../Utility/Constants";
import { TextField } from "react-native-material-textfield";
import MainNavigator from '../../Routes/AdminRoutes'
// import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";
let { width } = Dimensions.get("window");
const TOP_IMAGE_WIDTH = width * 0.3;

const customFieldViaEmail = [
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
    autoFocus: true,
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
class Login extends Component {
  @observable Email = "";
  @observable Password = "";
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
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
      this.loginApi();
    }

    this.setState({ errors });
  };

  async loginApi() {
    const { LoginStore } = this.props;
    let response = await LoginStore.login(this.Email, this.Password);
    if (response) {
      // if (response.userData.role === 'admin')
      //   this.props.navigation.navigate(SCREENS.HOMEBUTTONS)
      // if (response.userData.role === 'admin')
        this.props.navigation.navigate('Home')
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

  render() {
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
            <Text style={styles.subtitle}>{"Sign In"}</Text>
            <View style={styles.containerInputField}>
              {this.renderInputFieldList()}
            </View>
            <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={this.onSubmitLogin}
                style={GlobalStyles.defaultBtn}
              >
                <Text style={GlobalStyles.buttonTitle}>{"Log in"}</Text>
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
});

export default Login;
