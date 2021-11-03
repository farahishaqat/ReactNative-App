import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CustomTextInput from '../../containers/customTextInput';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

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

const ForgetPassword = () => {
  const navigator = useNavigation();

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
          <CustomTextInput placeholder={'Email ...'} onchange={() => {}} />
          <TouchableOpacity
            onPress={() => {
              // navigate to Otp
            }}>
            <Text style={styles.resetBtn}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ForgetPassword;
