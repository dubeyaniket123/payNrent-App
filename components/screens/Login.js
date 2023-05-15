import React, {useState, useEffect, isValidElement} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {postData} from '../../services/FetchNodeServices';
import Input from '../uicomponent/Input';
import AppButton from '../uicomponent/appButton';
import { storeData } from '../storage/AsyncStorage';
const {width, height} = Dimensions.get('window');

function Login({navigation, props}) {
  const [inputs, setInputs] = useState({mobileEmail: '', password: ''});
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.mobileEmail) {
      {
        handleError('pls input email/mobile..', 'mobileEmail');
      }
      isValid = false;
    }

    if (!inputs.password) {
      {
        handleError('pls input password', 'password');
      }
      isValid = false;
    }
    return isValid;
  };

  const handleClick = async () => {
    if (validate()) {
      var result = await postData('user/check_user_mobileno', {
        mobileno: inputs.mobileEmail,
      });
      if (result.status) {
        storeData("USER",result.data)
        navigation.navigate('Home1');
      } else {
        alert('invalid mobile/email/password');
      }
    }
  };
  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };
  const handleError = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.25,
      }}>
      <Input
        error={error.mobileEmail}
       
        onFocus={() => handleError(null, 'mobileEmail')}
        onChangeText={txt => handleValues(txt, 'mobileEmail')}
        iconName="email"
        placeholder="Email Address/Mobile Number"
      />
      <Input
        error={error.password}
        labelTxt="Password"
        onFocus={() => handleError(null, 'password')}
        onChangeText={txt => handleValues(txt, 'password')}
        iconName="lock"
        placeholder="Password"
      />
      <View style={{marginRight:28,marginTop:10}}>
      <AppButton
        onPress={handleClick}
        btnWidth={0.8}
        buttonText={'sign in'}
        bgColor="#27ae60"
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
    padding: 10,
    marginTop: 10,
  },
});

export default Login;
