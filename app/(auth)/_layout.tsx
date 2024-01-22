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
                tabBarActiveTintColor: '#363232', // Active tab text color
                tabBarInactiveTintColor: '#585555',
            }}
        >
            <Tabs.Screen
                name="chat-page"
                options={{
                    title: "MUNCHR",
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    headerTitleStyle: {
                        fontSize: 40,
                        color: '#E6DBC8',
                        fontFamily: "irish_grover",
                        textShadowColor: '#baa582',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 0.5,
                    },
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="bowl" color={focused ? '#363232' : '#585555'} size={28} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="account" color={focused ? '#363232' : '#585555'} size={32} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={signOut}>
                            <Ionicons name="log-out-outline" size={30} color={'#363232'} marginRight={20} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
