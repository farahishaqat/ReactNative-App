import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../containers/customTextInput';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState<{value: string; valid: boolean}>();
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigation<any>();
  const emailRef = useRef({value: '', valid: false});
  const passwordRef = useRef({value: '', valid: false});
  console.log('[App]: Rerender');

  // async/await api call
  useEffect(() => {
    // self invoke function
    (async () => {
      const token = await AsyncStorage.getItem('@token');
      console.log('User already logged in ? ', token);
      setIsLoggedIn(!!token);
      /**
       *
       *    true / false
       *    => null , undefined, '123', '', "", 4
       *    null == false
       *    step#1 => !null = true => !true => false
       *    step#2 => !'123' = false => !false => true
       */
    })();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(
      emailRef.current.value,
      passwordRef.current.value,
    );
    await AsyncStorage.setItem('@token', result);
    setIsLoggedIn(true);
    setLoading(false);

    navigator.navigate('Home', {
      email: emailRef.current.value,
    });
  };

  const login = async (email: string, password: string) => {
    // async/await call
    // retrieve token
    return new Promise<string>((resolve, reject) => {
      // simulate login on api
      const token = '1234567';
      console.log('trying to login ....');
      setTimeout(() => {
        console.log(`${email}, logged in ...`);
        return resolve(token);
      }, 3000);

      navigator.navigate('Home', {
        email: emailRef.current.value,
      });
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@token');
    setIsLoggedIn(false);
  };

  const handleInputChange = (inputType: string, inputValue: string) => {
    if (inputType == 'email') {
      console.log('[before update]', emailRef.current);
      emailRef.current.value = inputValue;
      console.log('[after update]', emailRef.current);
      let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      emailRef.current.valid = regx.test(emailRef.current.value);
      setEmail({
        value: inputValue,
        valid: regx.test(inputValue),
      });
      console.log(email);
    } else if (inputType == 'password') {
      console.log('[Updating password value]', inputValue);
      passwordRef.current.value = inputValue;
      setPassword(inputValue);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/ngIcon.png')}
            />
          </View>
          <Text
            style={{
              color: '#fff',
              marginTop: 30,
              alignSelf: 'center',
              fontSize: 30,
            }}>
            {isLoggedIn ? 'Welcome to IPTV' : 'Login'}
          </Text>
          {isLoggedIn && (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
              <Text style={styles.loginText}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} size={'small'} />
                ) : (
                  'Logout'
                )}
              </Text>
            </TouchableOpacity>
          )}
          {!isLoggedIn && (
            <View style={styles.formWrapper}>
              <CustomTextInput
                placeholder={'Email..'}
                onchange={(text: string) => handleInputChange('email', text)}
              />
              <CustomTextInput
                placeholder={'Password..'}
                onchange={(text: string) => handleInputChange('password', text)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log('Pressed on forgot password..');
                  // navigate to forget password page....
                  navigator.navigate('ForgetPassword');
                }}>
                <Text style={styles.forgetPassword}>Forgot your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginText}>
                  {loading ? (
                    <ActivityIndicator color={'#fff'} size={'small'} />
                  ) : (
                    'Login'
                  )}
                </Text>
              </TouchableOpacity>

              {/* REGISTERRR */}
              <View style={{paddingVertical: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate('Register', {
                      email: emailRef.current.value,
                    });
                  }}>
                  <Text style={{color: 'white'}}>
                    {' '}
                    Not a member? Register Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a191f',
    paddingTop: 50,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  formWrapper: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  forgetPassword: {
    color: '#fff',
    marginVertical: 10,
    alignItems: 'flex-end',
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
