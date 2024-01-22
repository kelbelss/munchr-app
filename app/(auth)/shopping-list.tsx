
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";




const shopping = () => {

    return (

        // <Text>Shopping List</Text>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.outputContainer}>
                    <Text style={styles.buttonText}>
                        Add Items to your Shopping List
                    </Text>
                </View>
            </ScrollView>

        </View>

    );

}

export default shopping


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F6',
    },
    scrollView: {
        flex: 1,
        maxHeight: '90%',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: '#F3F2F0',
        width: '92%',
        height: 'auto',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginVertical: '5%',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
    },

})
