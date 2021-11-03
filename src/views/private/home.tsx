import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Home = () => {
    const navigator= useNavigation();
    
    return (
        <Text>Home page</Text>
    );
}

export default Home;