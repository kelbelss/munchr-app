import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../provider/AuthProvider';
import { ShoppingListProvider } from './(auth)/shoppingListContext';

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
    const { session, initialized } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!initialized) return;

        // Check if the path/url is in the (auth) group
        const inAuthGroup = segments[0] === '(auth)';

        if (session && !inAuthGroup) {
            // Redirect authenticated users to the list page
            router.replace('/chat-page');
        } else if (!session) {
            // Redirect unauthenticated users to the login page
            router.replace('/');
        }
    }, [session, initialized]);

    return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
    return (
        <AuthProvider>
            <ShoppingListProvider>
                <InitialLayout />
            </ShoppingListProvider>
        </AuthProvider>
    );
};

export default RootLayout;