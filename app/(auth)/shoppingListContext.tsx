import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ShoppingListContextProps {
    shoppingList: string[];
    setShoppingList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ShoppingListContext = createContext<ShoppingListContextProps | undefined>(undefined);

export const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shoppingList, setShoppingList] = useState<string[]>([]);

    return (
        <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingList = () => {
    const context = useContext(ShoppingListContext);
    if (!context) {
        throw new Error('useShoppingList must be used within a ShoppingListProvider');
    }
    return context;
};