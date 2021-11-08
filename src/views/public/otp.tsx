import {Button, StyleSheet, Text, View} from 'react-native';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import React, {useCallback, useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScaleFromCenterAndroidSpec} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { loginSuccess } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
  const otpRef = useRef<any>();
  const navigator = useNavigation<any>();
   const dispatch = useDispatch();

  const [code, setCode] = useState('');

  const focusOTP = useCallback(() => {
    otpRef.current.focus();
  }, []);

  const resetOTP = useCallback(() => {
    otpRef.current.reset();
  }, []);

  const handleOtpChange = async (otpCode: string) => {
    otpRef.current = otpCode
    setCode(otpCode);


  };


  const handleLoginWithOtp = async () => {
    const result = await login(otpRef.current);
    await AsyncStorage.setItem('@token', result);
    // dispatch user in redux
    dispatch(loginSuccess({
        email: 'demo@demo.com',
        username: 'demoUser'
    }))
}

const login = async (otp: string) => {
    // async/await call
    // retrieve token
    return new Promise<string>((resolve, reject) => {
        // simulate login on api
        const token = '12345671341234';
        console.log('trying to login ....')
        setTimeout(() => {
            return resolve(token);
        }, 3000);
    });
}

  const submitOtp = () => {
      //verify Otp

      // navigate to Home page
  };

  console.log('this is the code', code);

  
  return (
    <View style={{flex: 1, padding: 10}}>
      <Button title="Reset" onPress={resetOTP} />
      <Button title="Focus" onPress={focusOTP} />
      <OtpInputs
        ref={otpRef}
        autofillFromClipboard
        inputContainerStyles={styles.inputContainer}
        handleChange={code => handleOtpChange(code)}
        numberOfInputs={6}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginWithOtp}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'red',
    marginVertical: 100,
  },

  loginButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: 'blue',
  },
  loginText: {
    color: '#fff',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
