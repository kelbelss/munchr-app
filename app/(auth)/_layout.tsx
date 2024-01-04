import { Link, Stack, Tabs } from 'expo-router';
import { useAuth } from '../../provider/AuthProvider';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TabOneScreen from './chat-page';


// Simple stack layout within the authenticated area
// const StackLayout = () => {
//     const { signOut, session } = useAuth();

//     return (
//         <Stack
//             screenOptions={{
//                 headerStyle: {
//                     backgroundColor: '#EDF0F6',
//                 },
//             }}>
//             <Stack.Screen
//                 name="account"
//                 redirect={!session}
//                 options={{
//                     headerTitle: 'My Account',
//                     headerRight: () => (
//                         <TouchableOpacity onPress={signOut}>
//                             <Ionicons name="log-out-outline" size={30} color={'#585555'} />
//                         </TouchableOpacity>
//                     ),
//                 }}>

//             </Stack.Screen>

//             <Stack.Screen
//                 name="chat-page">
//             </Stack.Screen>

//         </Stack>
//     );
// };

// export default StackLayout;

const TabLayout = () => {

    const { signOut, session } = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#EDF0F6',
                    borderBottomWidth: 0,
                },
                tabBarStyle: {
                    backgroundColor: '#EDF0F6',
                },
                tabBarActiveTintColor: '#000', // Active tab text color
                tabBarInactiveTintColor: '#585555',
            }}
        >
            <Tabs.Screen
                name="chat-page"
                options={{
                    title: "Munchr",
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    headerTitleStyle: {
                        fontSize: 40,
                        color: '#E6DBC8',
                        fontFamily: "irish_grover",
                    },
                    tabBarIcon: () => <Entypo name="bowl" color='#363232' size={28} />,
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" color='#363232' size={32} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={signOut}>
                            <Ionicons name="log-out-outline" size={30} color={'#585555'} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
