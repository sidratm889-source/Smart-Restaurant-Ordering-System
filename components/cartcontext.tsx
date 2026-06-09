"use client";
import {createContext, useState, useContext, useCallback, useEffect} from "react";
export type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
}
type CartContextValue = {
    cart: CartItem[];
    totalQuantity: number;
    grandTotal: number;
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string)=> void;
    clearCart: () => void;
}
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({children}: {children: React.ReactNode}){
    const[cart, setCart] = useState<CartItem[]>([]);
    useEffect(() =>{
        const storedCart = localStorage.getItem("cart");
        if(storedCart)
            setCart(JSON.parse(storedCart));

        }, []);
        useEffect(() => {
            localStorage.setItem("cart",JSON.stringify(cart)); 
        }, [cart]);
    
    const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
        setCart((currentCart) =>{
            const existing  = currentCart.find((entry) => entry.id === item.id);
            if(existing){
                return currentCart.map((entry) => 
                    entry.id === item.id ? {...entry, quantity: entry.quantity + 1}: entry);
            } return [...currentCart, {...item, quantity: 1}];

            });
        }, []);
        const updateQuantity = useCallback((id: string, quantity: number) => {
            setCart((currentCart) => currentCart.map((entry) => entry.id === id
            ? {...entry, quantity: Math.max(0, quantity)}: entry)
            .filter((entry) => entry.quantity > 0));
        }, []);
        const removeFromCart = useCallback((id: string) => {
            setCart((currentCart) => currentCart.filter((entry) => entry.id !== id));
        }, []);
         const clearCart = useCallback(() => setCart([]), []);
         const totalQuantity  = cart.reduce((sum, item) => sum + item.quantity, 0);
         const grandTotal = cart.reduce((sum, item) => sum + item.quantity * item.price , 0);
        return(
            <CartContext.Provider value={{
                cart,
                totalQuantity,
                grandTotal,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
            >{children}</CartContext.Provider>
        );
        }
        export function useCart(){
            const context = useContext(CartContext);
            if(!context){
                throw new Error("usecart must be used inside cartprovider");
            }
            return context;
        }




