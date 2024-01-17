import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Diet() {
    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isVegan, setVegan] = useState(false);
    const [isEggFree, setEggFree] = useState(false);
    const [isHalaal, setHalaal] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isGlutenFree}
                    onValueChange={setGlutenFree}
                    color={isGlutenFree ? '#77dd77' : undefined}
                />
                <Text style={styles.paragraph}>Gluten free</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isVegan}
                    onValueChange={setVegan}
                    color={isVegan ? '#77dd77' : undefined}
                />
                <Text style={styles.paragraph}>Vegan</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isEggFree}
                    onValueChange={setEggFree}
                    color={isEggFree ? '#77dd77' : undefined}
                />
                <Text style={styles.paragraph}>Egg free</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isHalaal}
                    onValueChange={setHalaal}
                    color={isHalaal ? '#77dd77' : undefined}
                />
                <Text style={styles.paragraph}>Halaal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        color: '#363232',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 18,
        fontFamily: 'imprima',
        color: "#585555",
    },
    checkbox: {
        margin: 8,
        color: "black",
    },
});

// dietText: {
//     paddingHorizontal: 15,
//     paddingTop: 20,
//     fontFamily: 'imprima',
//     fontSize: 18,
//     color: '#363232',
// },