import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

let StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    let [cartItems, setCartItems] = useState({});
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
        return total.toFixed(2);
    };

    let [loading, setLoading] = useState(false);

    let fetchFoodList = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
        setLoading(false);
    }

    const loadCartData = async (token) => {
        let response = await axios.post(url + '/api/cart/get', {}, {
            headers: { token }
        });
        setCartItems(response.data.cartData);
    }

    const fetchAverageRating = async (itemId) => {
        try {
            const response = await axios.post(`${url}/api/ratings/getAverageRating`, { itemId });
            if(response.data.success) {
                return response.data.data.averageRating;
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
        return 0;
    };

    const handleRatingChange = async (itemId, newValue) => {
        if(!token) {
            toast.error('You need to be logged in to rate products');
            return
        }
        
        try {
            const endpoint = `${url}/api/ratings/updateRating`;
            await axios.post(endpoint, {
                itemId,
                rating: newValue
            }, {
                headers: { token }
            });
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    useEffect(() => {
        async function loadData() {
        await fetchFoodList();
        if(localStorage.getItem('token')){
               setToken(localStorage.getItem('token'));            
               await loadCartData(localStorage.getItem('token'));
         }
        }

        loadData();
    }, [])

    let contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loading,
        fetchAverageRating,
        handleRatingChange
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
