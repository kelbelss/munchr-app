import { Modal, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const filterImage = require('/Users/kellysmulian/GitHub/munchr-app/assets/images/filter.png');

export default function TabOneScreen() {

    // modal
    const [modalVisible, setModalVisible] = useState(false);

    const [showFullRecipe, setShowFullRecipe] = useState(false);
    const [showShoppingList, setShowShoppingList] = useState(false);

    const toggleFullRecipe = () => {
        setShowFullRecipe(!showFullRecipe);
    };

    const toggleShoppingList = () => {
        setShowShoppingList(!showShoppingList);
    };

    const recipe = "Instructions: \n\nPrepare the Marinade:\n\n 1. In a bowl, whisk together olive oil, fresh lemon juice, minced garlic, dried oregano, dried thyme, paprika, salt, and black pepper.\n2. Marinate the Chicken: \n3. Place the chicken breasts in a resealable plastic bag or a shallow dish.\n4. Pour the marinade over the chicken, ensuring that each piece is well-coated.\n5. Seal the bag or cover the dish and refrigerate for at least 30 minutes to marinate. For more flavor, you can marinate it for a few hours or overnight.\n\nPreheat the Grill";

    const shopping = "boneless, skinless chicken breasts \nolive oil \nlemons \ngarlic \ndried oregano \ndried thyme \npaprika \nsalt and black pepper \nparsley or cilantro";


    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollView}>
                <View style={styles.outputContainer}>
                    <Text style={styles.outputHeading}>Grilled Lemon Herb Chicken</Text>
                    <Text style={styles.outputSummary}>This Grilled Lemon Herb Chicken is not only gluten-free but also low in fat high in protein.</Text>

                    <TouchableOpacity style={styles.toggleBlock} onPress={toggleFullRecipe}>
                        <View style={styles.buttonContainer}>
                            <Text style={[styles.buttonText, showFullRecipe ? styles.underline : {}]}>
                                Full Recipe
                            </Text>
                            <AntDesign name={showFullRecipe ? 'up' : 'down'} size={24} color="black" />
                        </View>
                        {showFullRecipe && (
                            <View style={styles.expandedBlock}>
                                <Text style={styles.buttonText}>{recipe}</Text>
                            </View>
                        )}
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.toggleBlock} onPress={toggleShoppingList}>
                        <View style={styles.buttonContainer}>
                            <Text style={[styles.buttonText, showShoppingList ? styles.underline : {}]}>
                                {showShoppingList ? 'Shopping List' : 'Shopping List'}
                            </Text>
                            <AntDesign name={showShoppingList ? 'up' : 'down'} size={24} color="black" />
                        </View>
                        {showShoppingList && (
                            <View style={styles.expandedBlock}>
                                <Text style={styles.buttonText}>{shopping}</Text>
                            </View>
                        )}

                    </TouchableOpacity>


                </View>
            </ScrollView >

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalCenteredView}>

                    <View style={styles.modalView}>

                        <View style={styles.modalHeader}>

                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Feather name="arrow-left" size={28} color="black" />
                            </Pressable>

                            <Text style={styles.modalHeaderText}>Filter Preferences</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#585555',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <ScrollView style={styles.filterContainer}>
                            <View style={styles.diet}>
                                <Text style={styles.modalText}>Dietary Requirements:</Text>
                                <Text style={styles.dietText}>Gluten Free, Vegan</Text>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#585555',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />

                            <View style={styles.vitality}>
                                <Text style={styles.modalText}>Are you a Vitality member?</Text>
                                <Fontisto name="toggle-off" size={30} color="black" />
                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#585555',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />

                        </ScrollView>

                    </View>
                </View>
            </Modal>

            <View style={styles.inputContainer}>
                <Pressable onPress={() => setModalVisible(true)}>
                    {({ pressed }) => (
                        <Image style={{ opacity: pressed ? 0.5 : 1, height: 45, width: 40, marginBottom: 20, marginTop: 10 }} source={filterImage} />
                    )}
                </Pressable>
                <TextInput autoCapitalize="none" placeholder="Ask Munchr" style={styles.userInput} />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F6',
    },
    scrollView: {
        flex: 1,
        maxHeight: '88%',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: '#F3F2F0',
        width: '92%',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginVertical: '5%',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        borderRadius: 6,
        overflow: 'scroll',
    },
    outputHeading: {
        fontSize: 22,
        marginTop: 10,
        fontFamily: 'imprima',
    },
    outputSummary: {
        fontSize: 16,
        marginHorizontal: 18,
        marginVertical: 14,
        textAlign: 'center',
        color: '#585555',
        fontFamily: 'imprima',
    },
    fullRecipeBlock: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E6DBC8",
        padding: 8,
        borderRadius: 4,
        marginBottom: 5,
        marginTop: 10,
        width: '90%',
        flexDirection: "row",
        justifyContent: 'center',
    },
    shoppingListBlock: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E6DBC8",
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
        width: '90%',
        flexDirection: "row",
        justifyContent: 'center',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 20,
        // backgroundColor: '#EDF0F6',
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
        width: 245,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20,

    },
    button: {
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        fontFamily: 'imprima',
        fontSize: 18,
        marginBottom: 20,
        marginTop: 10,
    },
    toggleBlock: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6DBC8',
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
        width: '90%',
    },
    buttonText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        marginRight: 20,
    },
    underline: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        marginRight: 20,
        textDecorationLine: 'underline',
    },
    expandedBlock: {
        backgroundColor: '#F3F2F0',
        padding: 8,
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // backgroundColor: "#363232",
    },
    modalView: {
        width: '92%',
        height: '88%',
        margin: 20,
        backgroundColor: "#F3F2F0",
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
    modalHeader: {
        flexDirection: 'row',
        padding: 25,
    },
    modalHeaderText: {
        color: '#000000',
        fontFamily: 'imprima',
        fontSize: 26,
        marginLeft: 54,
    },
    modalText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 22,
    },
    filterContainer: {
        paddingHorizontal: 25,
    },
    diet: {
        paddingVertical: 25,
    },
    dietText: {
        paddingHorizontal: 15,
        paddingTop: 20,
        fontFamily: 'imprima',
        fontSize: 18,
        color: '#363232',
    },
    vitality: {
        paddingVertical: 25,
        paddingRight: 40,
        flexDirection: 'row',
        justifyContent: "space-between",
    }
});