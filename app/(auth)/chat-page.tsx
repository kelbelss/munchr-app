import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

// const onInput (() => {
//     input: value={input}
// })

const filterImage = require('/Users/kellysmulian/GitHub/munchr-app/assets/images/filter.png');

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Pressable>
                    {({ pressed }) => (
                        <Image style={{ opacity: pressed ? 0.5 : 1, height: 45, width: 40 }} source={filterImage} />
                    )}
                </Pressable>
                <TextInput autoCapitalize="none" placeholder="Ask Munchr" style={styles.userInput} />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F6',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    userInput: {
        // height: 50,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 12,
        color: "#363232",
        backgroundColor: "#F3F2F0",
        fontFamily: 'imprima',
        fontSize: 18,
        marginHorizontal: 5,
        width: 265,
        marginLeft: 10,

    },
    button: {
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        // height: 50,
        fontFamily: 'imprima',
        fontSize: 18,
    },

    // separator: {
    //     marginVertical: 30,
    //     height: 1,
    //     width: "80%",
    // },
});