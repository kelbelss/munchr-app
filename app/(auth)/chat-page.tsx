import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState, useRef } from "react";
import ModalComponent from '../../components/modal';
import { useShoppingList } from "./shoppingListContext";
import { supabase } from '/Users/kellysmulian/GitHub/munchr-app/config/supabase';
import { Animated, Easing } from 'react-native';

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

    const { setShoppingList } = useShoppingList();

    const [loading, setLoading] = useState(false);
    const cancelToken = useRef(false);

    const handleRecipeRequest = async () => {
        setLoading(true);
        cancelToken.current = false;
        try {
            const { data, error } = await supabase.functions.invoke("recipe-request", {
                body: { meal },
            });

            if (cancelToken.current) {
                return;
            }

            setMeal("");


            if (data && data.recipe) {
                setRecipeTitle(data.recipe.title);
                setRecipeDescription(data.recipe.description);
                setRecipeIngredients(data.recipe.ingredients);
                setRecipeInstructions(data.recipe.instructions);
                setResponseReceived(true);
            }
            console.log(data);
            console.log(error);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    // Stop Generating Button
    const cancelRequest = () => {
        cancelToken.current = true;
        setMeal("");
        setRecipeTitle("");
        setRecipeDescription("");
        setRecipeIngredients([]);
        setRecipeInstructions([]);
        setResponseReceived(false);
        setLoading(false);
    };


    const [responseReceived, setResponseReceived] = useState(false);
    const [meal, setMeal] = useState("");
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);

    const space = "\n\n"

    // Loading Screen Animation
    const tilt = useState(new Animated.Value(0))[0];

    const tiltAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(tilt, {
                    toValue: 3,
                    duration: 3000,
                    easing: Easing.ease,
                    useNativeDriver: true
                }),
                Animated.timing(tilt, {
                    toValue: -3,
                    duration: 3000,
                    easing: Easing.ease,
                    useNativeDriver: true
                }),
                Animated.timing(tilt, {
                    toValue: 3,
                    duration: 3000,
                    easing: Easing.ease,
                    useNativeDriver: true
                }),
                Animated.timing(tilt, {
                    toValue: -3,
                    duration: 3000,
                    easing: Easing.ease,
                    useNativeDriver: true
                }),
            ]),
        ).start();
    };

    useEffect(() => {
        tiltAnimation();
    }, []);


    return (
        <View style={styles.container}>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Animated.Image
                        source={require('/Users/kellysmulian/GitHub/munchr-app/assets/images/icon.png')}
                        style={[
                            styles.logo,
                            {
                                transform: [
                                    {
                                        rotateZ: tilt.interpolate({
                                            inputRange: [-1, 1],
                                            outputRange: ['-8deg', '8deg'],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                    <Text style={styles.textLoading}>
                        He's cooking!
                    </Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={cancelRequest}>
                        <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18, textDecorationLine: 'underline' }}>Stop generating...</Text>
                    </TouchableOpacity>
                </View>
            ) : (

                <ScrollView style={styles.scrollView}>
                    {responseReceived ? (
                        <View style={styles.outputContainer}>
                            <Text style={styles.outputHeading}>{recipeTitle}</Text>
                            <Text style={styles.outputSummary}>{recipeDescription}</Text>

                            <TouchableOpacity style={styles.toggleBlock} onPress={toggleFullRecipe}>
                                <View style={styles.buttonContainer}>
                                    <Text style={[styles.buttonText, showFullRecipe ? styles.underline : {}]}>
                                        Full Recipe
                                    </Text>
                                    <AntDesign name={showFullRecipe ? 'up' : 'down'} size={24} color="black" />
                                </View>
                                {showFullRecipe && (
                                    <View style={styles.expandedBlock}>
                                        <Text style={styles.buttonTextRec}>Ingredients: {space}
                                            {recipeIngredients.map((ingredient, index) => (
                                                <Text key={index}>{ingredient}{"\n"}</Text>
                                            ))}
                                            {"\n"}Instructions: {space}
                                            {recipeInstructions.map((instruction, index) => (
                                                <Text key={index}>{index + 1}. {instruction}{space}</Text>
                                            ))}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.toggleBlock} onPress={toggleShoppingList}>
                                <View style={styles.buttonContainer}>
                                    <Text style={[styles.buttonText, showShoppingList ? styles.underline : {}]}>
                                        Shopping List
                                    </Text>
                                    <AntDesign name={showShoppingList ? 'up' : 'down'} size={24} color="black" />
                                </View>
                                {showShoppingList && (
                                    <View style={styles.expandedBlock}>
                                        {recipeIngredients.map((ingredient, index) => (
                                            <View key={index} style={styles.itemContainer}>
                                                <Text style={styles.shoppingListText}>{ingredient}</Text>
                                                <AntDesign
                                                    name='plus'
                                                    size={22}
                                                    color="black"
                                                    onPress={() => setShoppingList(prevList => [...prevList, ingredient])}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                )}

                            </TouchableOpacity>


                        </View>

                    ) : null}
                </ScrollView >
            )}

            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <View style={styles.inputContainer}>
                <Pressable onPress={() => setModalVisible(true)}>
                    {({ pressed }) => (
                        <Image style={{ opacity: pressed ? 0.5 : 1, height: 40, width: 45, marginTop: 32 }} source={filterImage} />
                    )}
                </Pressable>
                <TextInput autoCapitalize="none" placeholder="Ask Munchr" style={styles.userInput} value={meal} onChangeText={setMeal} />
                <TouchableOpacity style={styles.button}

                    onPress={handleRecipeRequest}
                    disabled={loading}
                >
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
        maxHeight: '90%',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: '#F3F2F0',
        width: '96%',
        alignItems: 'center',
        marginHorizontal: '2%',
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
    outputHeading: {
        fontSize: 22,
        marginTop: 10,
        fontFamily: 'imprima',
        textAlign: 'center',
    },
    outputSummary: {
        fontSize: 16,
        marginHorizontal: 18,
        marginVertical: 14,
        textAlign: 'center',
        color: '#585555',
        fontFamily: 'imprima',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        height: '14%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInput: {
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 12,
        color: "#363232",
        backgroundColor: "#F3F2F0",
        fontFamily: 'imprima',
        fontSize: 18,
        marginHorizontal: 5,
        width: '60%',
        marginLeft: 10,
        marginTop: 32,
    },
    button: {
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        fontFamily: 'imprima',
        fontSize: 18,
        marginTop: 32,
    },
    toggleBlock: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6DBC8',
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
        width: '94%',
    },
    buttonText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        marginRight: 20,
    },
    buttonTextRec: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        marginRight: 20,
        textAlign: "justify",
        lineHeight: 25,
    },
    shoppingListText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        marginRight: "1%",
        width: '85%',
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
        padding: 6,
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        marginRight: '-4%',
    },
    itemContainer: {
        backgroundColor: '#F3F2F0',
        padding: 8,
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 140,
        height: 140,
        marginBottom: 30,
        marginTop: '-60%',
    },
    loadingContainer: {
        padding: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    textLoading: {
        fontSize: 30,
        fontFamily: 'imprima',
        color: '#363232',
    },
    cancelButton: {
        marginTop: '20%',
    },
});