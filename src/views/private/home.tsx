import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';

const Home = ({route}: any) => {
  const navigator = useNavigation();

//   const handleGoBack=()=>{
//       navigator.goBack();
//   }

  return (
    <View style={styles.homePageContainer}>
         {/* <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
             
          <Text style={styles.backText}>back</Text>
        </TouchableOpacity> */}
      <Text style={styles.homePageLabel}>Home page</Text>
     
        <TouchableOpacity style={styles.logoutBtn} onPress={()=>{}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homePageContainer: {
    paddingVertical: 70,
  },
  homePageLabel: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#d32f2f',
  },

  logoutText: {
    color: '#fff',
    marginVertical: 10,
    alignSelf: 'center',
  },
  backBtn: {
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#d32f2f',
  },
  backText: {
    color: '#fff',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
