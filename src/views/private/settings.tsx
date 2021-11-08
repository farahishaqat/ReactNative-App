import {StyleSheet, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IptvReducerState } from '../../redux/store';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { loginSuccess } from '../../redux/reducers/userReducer';

const Settings = () => {

    const user = useSelector((state:IptvReducerState) => state.userReducer.user)
    const dispatch = useDispatch();

    const logout=()=>{
        
        //dispatch(logoutSuccess(null))
    }
    
  return (
    <View style={styles.userSection}>
      <View>Avatar</View>
      <View>
        <Text>user Email</Text>
      </View>

      <TouchableOpacity onPress={logout}><Text>logout</Text></TouchableOpacity>
    </View>
  );
};


const styles=StyleSheet.create({
    userSection:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})
export default Settings;
