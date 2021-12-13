/**
 * @author Raman Kant
 */

import React, {Component} from 'react';
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
} from 'react-native';
import GlobalStyles from '../../Utility/GlobalStyles';
import CustomLoader from '../../ReusableComponents/CustomLoader';
import ImagePath from '../../Utility/ImagePath';
import {observer, inject} from 'mobx-react';
import {Regex, SCREENS} from '../../Utility/Constants';
import {TextField} from 'react-native-material-textfield';
import {observable} from 'mobx';
import {initialWindowSafeAreaInsets} from 'react-native-safe-area-context';
let {width} = Dimensions.get('window');
const TOP_IMAGE_WIDTH = width * 0.3;

const customFieldViaEmail = [
    {
        name: 'CurrentPassword',
        secureTextEntry: true,
        clearTextOnFocus: true,
        keyboardType: 'ascii-capable',
        returnKeyType: 'done',
        label: 'CurrentPassword',
        renderRightAccessory: '',
        error: 'CurrentPassword',
        maxLength: 100,
        onChangeText: 'handleCurrentPasswordChange',
        autoFocus: false,
      },
  {
    name: 'NewPassword',
    secureTextEntry: true,
    clearTextOnFocus: true,
    keyboardType: 'ascii-capable',
    returnKeyType: 'done',
    label: 'NewPassword',
    renderRightAccessory: 'renderNewPasswordAccessory',
    error: 'NewPassword',
    maxLength: 100,
    onChangeText: 'handleNewPasswordChange',
    autoFocus: false,
  },
  {
    name: 'ConfimPassword',
    secureTextEntry: true,
    clearTextOnFocus: true,
    keyboardType: 'ascii-capable',
    returnKeyType: 'done',
    label: 'ConfimPassword',
    renderRightAccessory: 'renderConfirmPasswordAccessory',
    error: 'ConfimPassword',
    maxLength: 100,
    onChangeText: 'handleConfirmPasswordChange',
    autoFocus: false,
  },
];
@inject('LoginStore', 'GlobalStore')
@observer
class ChangePassword extends Component {
  @observable CurrentPassword = '';
  @observable NewPassword = '';
  @observable ConfirmPassword = '';
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      secureTextEntryConfirm: true,
      secureTextEntryCurrent: true,
    };
  }

  //handle email text input change
  handleCurrentPasswordChange = currentpassword => {
    this.CurrentPassword = currentpassword;
  };
  //handle password text input change
  handleNewPasswordChange = newpassword => {
    this.newpassword = newpassword;
  };

  //handle password text input change
  handleConfirmPasswordChange = confirmpassword => {
    this.confirmpassword = confirmpassword;
  };


  onSubmitLogin = () => {
    const {LoginStore} = this.props;
    let errors = {};
    customFieldViaEmail.map(item => {
      let value = this[item.name];
      let reg = Regex.reg;
      if (!value) {
        errors[item.name] = 'All fields are mandatory';
      } else {
        if (item.name === 'Email' && reg.test(value) === false) {
          errors[item.name] = 'encorrect email'
        }
      }
    });
    let count_error = Object.keys(errors).length;
    if (count_error === 0) {
      this.loginApi();
    }

    this.setState({errors});
  };

  async loginApi() {
    const {LoginStore} = this.props;
    let response = await LoginStore.login(this.Email, this.Password);
    if (response) {
      this.props.navigation.navigate(SCREENS.HOME);
    }
  }

  onAccessoryPress = () => {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  };
  onAccessoryPressc = () => {
    this.setState(({secureTextEntryConfirm}) => ({
      secureTextEntryConfirm: !secureTextEntryConfirm,
    }));
  };


  gotoSignUpScreen = () => {
    this.props.navigation.navigate(SCREENS.SIGNUP);
  };




  renderNewPasswordAccessory = () => {
    let {secureTextEntry} = this.state;

    let name = secureTextEntry ? ImagePath.EYE_CLOSE : ImagePath.EYE_OPEN;
    return (
      <TouchableOpacity
        onPress={() => {
          this.onAccessoryPress();
        }}>
        <Image
          resizeMode={'contain'}
          style={styles.eyeIcon}
          source={name}
        />
      </TouchableOpacity>
    );
  };

  renderConfirmPasswordAccessory = () => {
    let {secureTextEntryConfirm} = this.state;

    let name = secureTextEntryConfirm ? ImagePath.EYE_CLOSE : ImagePath.EYE_OPEN;
    return (
      <TouchableOpacity
        onPress={() => {
          this.onAccessoryPressc();
        }}>
        <Image
          resizeMode={'contain'}
          style={styles.eyeIcon}
          source={name}
        />
      </TouchableOpacity>
    );
  };


  renderInputFieldList() {
    const {LoginStore} = this.props;
    let {errors = {}, secureTextEntry,secureTextEntryConfirm} = this.state;
    return customFieldViaEmail.map((item, index) => {
        let actionSecureText =
        item.name === 'NewPassword' ? secureTextEntry : secureTextEntryConfirm;
      return (
        <TextField
          key={index}
          secureTextEntry={item.secureTextEntry ? actionSecureText : true}
          keyboardType={item.keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={item.clearTextOnFocus}
          autoFocus={item.autoFocus}
          onChangeText={text => {
            this[item.onChangeText](text);
          }}
          returnKeyType={item.returnKeyType}
          label={item.label}
          renderRightAccessory={this[item.renderRightAccessory]}
          error={errors[item.error]}
          maxLength={item.maxLength}
          labelFontSize={14}
          fontSize={18}
          textColor={'#ff9900'}
          baseColor={'#ff9900'}
          tintColor={'#ff9900'}
        />
      );
    });
  }

  render() {
    const {LoginStore} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={styles.backView}>
          <Image
            resizeMode={'contain'}
            style={styles.backImg}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.subtitle}>
              {'Change Password'}
            </Text>
            <View style={styles.containerInputField}>
              {this.renderInputFieldList()}
            </View>
            <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={this.onSubmitLogin}
                style={GlobalStyles.defaultBtn}>
                <Text style={GlobalStyles.buttonTitle}>
                  {'Submit'}
                </Text>
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
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: 'center',
  },
  forgotTitle: {
    marginTop: 4,
    fontSize: 14,
    color: GlobalStyles.colorCodes.clearBlue,
    textAlign: 'right',
    marginRight: 27,
  },
  buttonTitle: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  bgImage: {
    alignSelf: 'center',
    height: TOP_IMAGE_WIDTH,
    width: TOP_IMAGE_WIDTH,
  },
  containerInputField: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
    flex: 1,
  },
  scroll: {
    backgroundColor: 'transparent',
  },
  loginBtn: {
    marginTop: 83,
    marginLeft: 48,
    marginRight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBar: {
    marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    height: 20,
    width: 15,
  },
  flag: {
    fontSize: 28,
    textAlign: 'right',
  },
});

export default ChangePassword;
