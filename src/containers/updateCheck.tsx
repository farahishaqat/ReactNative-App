import React, { useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native'
import Avatar from './avatar';

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#101010'
    }
})

const WhoAmI = ({ currentUser }: any) => {

    useEffect(() => {
        // hit api
        // check if the user updated the application
    }, []);

    return (
        <View style={styles.card}>
            <Avatar currentUser={currentUser} />
            <Text style={{ color: '#fff' }}>Name: {currentUser.name}</Text>
            <Text style={{ color: '#fff' }}>Email: {currentUser.email}</Text>
            {/* <NumberOfPostsAndLike currentUser={currentUser}/> */}
        </View>
    )
}

export default WhoAmI
