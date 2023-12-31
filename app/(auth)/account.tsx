import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';


const list = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        // TODO stuff when valid user is logged in
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You are currently signed in!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#EDF0F6',
    },
    text: {
        color: '#585555',
    },
});

export default list;