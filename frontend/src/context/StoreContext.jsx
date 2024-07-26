import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

let StoreContextProvider = (props) => {
    let [cartItems, setCartItems] = useState({});
    let url = "http://localhost:4000";
    let [token, setToken] = useState("")
    let [food_list, setFoodList] = useState([]);

    let addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, {
                headers:{ token }
            })
        }
    };

    let removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, {
                headers:{ token }
            })
        }
    };

    let getTotalCartAmount = () => {
        let total = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    };

    let fetchFoodList = async () => {
        let response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        let response = await axios.post(url + '/api/cart/get', {}, {
            headers: { token }
        });
        console.log(response.data)
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
        await fetchFoodList();
        if(localStorage.getItem('token')){
               setToken(localStorage.getItem('token'));            
               await loadCartData(localStorage.getItem('token'));
         }
        }

        loadData();
    },[])

    let contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
