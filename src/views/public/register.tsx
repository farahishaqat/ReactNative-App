import 'react-native-gesture-handler';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CustomTextInput from '../../containers/customTextInput';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Register = ({route}: any) => {
  console.log(route);
  const navigator = useNavigation<any>();
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
   
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/ngIcon.png')}
            />
          </View>
     
        <View style={styles.formWrapper}>
          <Text style={styles.registerText}>Register</Text>
          <CustomTextInput
            placeholder={"Email.."}
            onchange={() => {}}
          />
          <CustomTextInput placeholder={'First Name ..'} onchange={() => {}} />
          <CustomTextInput placeholder={'Last Name ..'} onchange={() => {}} />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigator.navigate('Login');
            }}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a191f',
    paddingTop: 80,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
  logo: {
    width: 150,
    height: 100,
  },
  formWrapper: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  registerText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },

  loginButton: {
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#d32f2f',
  },
  loginText: {
    color: '#fff',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default Register;
