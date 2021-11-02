import 'react-native-gesture-handler';

import { Text, TouchableOpacity } from "react-native"

import CustomTextInput from '../../containers/customTextInput';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Register = ({ route }: any) => {
    console.log(route)
    const navigator = useNavigation<any>();
    return (
        <>r
            <Text>Register page</Text>

            <CustomTextInput
                placeholder={route.params.email}
                onchange={() => { }}
            />
            <CustomTextInput
                placeholder={'First Name ..'}
                onchange={() => { }}
            />
            <CustomTextInput
                placeholder={'Last Name ..'}
                onchange={() => { }}
            />

            <TouchableOpacity onPress={() => {
                navigator.navigate('Login')
            }}>
                <Text>Login</Text>
            </TouchableOpacity>
        </>
    )
}

export default Register
