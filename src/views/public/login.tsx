import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../containers/customTextInput';
import { loginSuccess } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a191f',
        paddingTop: 50,
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 100
    },
    formWrapper: {
        marginVertical: 30,
        paddingHorizontal: 20
    },
    textInput: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    forgetPassword: {
        color: '#fff',
        marginVertical: 10,
        alignItems: 'flex-end'
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
        alignSelf: 'center'
    }
});

const CustomBorderedBox = ({ children }: any) => {
    return (
        <View style={{ padding: 20, borderWidth: 1, borderColor: '#ccc' }}>
            {children}
        </View>
    )
}

const Login = () => {
    const [email, setEmail] = useState<{ value: string, valid: boolean }>();
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigator = useNavigation<any>();

    const emailRef = useRef({ value: '', valid: false });
    const passwordRef = useRef({ value: '', valid: false });
    const fullName = useRef('');
    console.log('[App]: Rerender');

    // Basic useEffect: invoke on load, update state
    // useEffect(() => {
    //   console.log('[Use Effect] Start');
    //   console.log('first name: ', firstName)
    // })

    // on load
    useEffect(() => {
        console.log('[Use Effect] Start');
        console.log('first name: ', firstName);

        return () => {
            // cleanup
            fullName.current = '';
            // listeners
        }
    }, [])

    // async/await api call
    useEffect(() => {
        // self invoke function
        (async () => {
            const token = await AsyncStorage.getItem('@token');
            console.log('User already logged in ? ', token);
            // setIsLoggedIn(!!token);
            /**
             * 
             *    true / false
             *    => null , undefined, '123', '', "", 4
             *    null == false
             *    step#1 => !null = true => !true => false 
             *    step#2 => !'123' = false => !false => true
             */
        })()

        return () => {
            // cleanup
            fullName.current = '';
            // listeners
        }
    }, [])

    // use effect invoked on update for firstName state (single effect)
    // useEffect(() => {
    //   fullName.current = `${firstName} ${lastName}`;
    //   console.log('Update length: ', fullName.current);
    // }, [firstName])

    // use effect invoked on update for firstName, lastName state (multiple effect)
    useEffect(() => {
        fullName.current = `${firstName} ${lastName}`;
        console.log('Update length: ', fullName.current);
        return () => {
            // cleanup method.
        }
    }, [firstName, lastName])

    const handleLogin = async () => {
        setLoading(true);
        const result = await login(emailRef.current.value, passwordRef.current.value);
        await AsyncStorage.setItem('@token', result);
        // setIsLoggedIn(true);
        // dispatch user in redux
        dispatch(loginSuccess({
            email:'demo@demo.com',
            username:'demouser'}))
        
        setLoading(false);
    }

    const login = async (email: string, password: string) => {
        // async/await call
        // retrieve token
        return new Promise<string>((resolve, reject) => {
            // simulate login on api
            const token = '1234567';
            console.log('trying to login ....')
            setTimeout(() => {
                console.log(`${email}, logged in ...`);
                return resolve(token);
            }, 3000);
        });
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('@token');
        //setIsLoggedIn(false);
    }

    const handleInputChange = (inputType: string, inputValue: string) => {
        if (inputType == 'email') {
            console.log('[before update]', emailRef.current);
            emailRef.current.value = inputValue;
            console.log('[after update]', emailRef.current)
            let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            emailRef.current.valid = regx.test(emailRef.current.value)
            // setEmail({
            //   value: inputValue,
            //   valid: regx.test(inputValue)
            // })
            console.log(email);
        } else if (inputType == 'password') {
            console.log('[Updating password value]', inputValue);
            passwordRef.current.value = inputValue;
            // setPassword(inputValue);
        } else if (inputType == 'firstName') {
            setFirstName(inputValue);
        }
        else if (inputType == 'lastName') {
            setLastName(inputValue);
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../../../assets/images/ngIcon.png')} />
                    </View>
               
                     {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                        <Text style={styles.loginText}>
                            {loading ?
                                <ActivityIndicator color={'#fff'} size={'small'} />
                                : 'Logout'}
                        </Text>
                    </TouchableOpacity> */}
                    
                     <View style={styles.formWrapper}>
                        <CustomTextInput
                            placeholder={'Email..'}
                            onchange={(text: string) => handleInputChange('email', text)} />
                        <CustomTextInput
                            placeholder={'Password..'}
                            onchange={(text: string) => handleInputChange('password', text)}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={() => {
                            console.log('Pressed on forgot password..')
                            // navigate to forget password page....
                            navigator.navigate('ForgetPassword');
                        }}>
                            <Text
                                style={styles.forgetPassword}
                            >Forgot your password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginText}>
                                {loading ?
                                    <ActivityIndicator color={'#fff'} size={'small'} />
                                    : 'Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
