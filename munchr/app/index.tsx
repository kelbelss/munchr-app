import { Alert, Image, View, Button, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../config/supabase';
import * as Font from 'expo-font';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load custom font asynchronously
        async function loadCustomFont() {
            await Font.loadAsync({
                'IrishGrover-Regular': require('../assets/fonts/irishgrover.ttf'),
            });
        }

        loadCustomFont();
    }, []);


    // sign in with email and password
    const onSignInPress = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    };

    // Create a new user
    const onSignUpPress = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    };


    return (
        <View style={styles.container}>
            <Spinner visible={loading} />

            <Text style={styles.header}>MUNCHR</Text>

            <Image style={styles.logo} source={require('../assets/images/icon.png')} />

            <TextInput autoCapitalize="none" placeholder="john@doe.com" value={email} onChangeText={setEmail} style={styles.inputField} />
            <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

            <TouchableOpacity onPress={onSignInPress} style={styles.button}>
                <Text style={{ color: '#363232' }}>Sign in</Text>
            </TouchableOpacity>
            <Button onPress={onSignUpPress} title="Create Account" color={'#363232'}></Button>
        </View >
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#EDF0F6",
    },
    header: {
        fontSize: 70,
        textAlign: "center",
        fontFamily: "irishgrover",
        marginTop: 60,
        marginBottom: 20,
        color: "#E6DBC8",
    },
    logo: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },

    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 10,
        color: "#363232",
        backgroundColor: "#F3F2F0",
    },
    button: {
        marginVertical: 15,
        alignItems: "center",
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
    },
});

export default Login;
