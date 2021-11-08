import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CustomTextInput from '../../containers/customTextInput';
import {useNavigation} from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState<{value: string; valid: boolean}>();
  const emailRef = useRef({ value: '', valid: false });
  console.log('emailREEEFF:', emailRef);
  const navigator = useNavigation<any>();

  const handleInputChange = (inputValue: string) => {
   
      //console.log('[before update]', email.current);
      emailRef.current.value = inputValue;
      //console.log('[after update]', email.current);
      let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      emailRef.current.valid = regx.test(emailRef.current.value);
      setEmail({
        value: inputValue,
        valid: regx.test(inputValue)
      })
      console.log(email);
    
  };

  const handleResetEmail = () => {

    //navigate to OTP
    navigator.navigate('Otp')

  };

  console.log('Email state', email);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <TouchableOpacity
            onPress={() => {
              // navigate to login page
              navigator.goBack();
            }}>
            <Text style={styles.backBtn}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Forgot password ?</Text>
          <CustomTextInput placeholder={'Email ...'} onchange={handleInputChange} />
          <TouchableOpacity onPress={handleResetEmail}>
            <Text style={styles.resetBtn}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  header: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 30,
  },
  backBtn: {
    color: 'black',
  },

  formWrapper: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#d32f2f',
    padding: 10,
    paddingHorizontal: 20,
    color: 'white',
  },
});
