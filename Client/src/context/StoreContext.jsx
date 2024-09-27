import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:3000";
  const navigate = useNavigate();
  // Load cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [menu_list2, setMenu_list2] = useState([]);

  // Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
      };

      // Save the updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });

    // Sync with backend if token is available
    if (token) {
      try {
        await axios.post(`${url}/api/cart/addCart`, { itemId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Item added to cart successfully");
      } catch (err) {
        console.error("Error adding item to cart:", err);
      }
    }
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });

    // Sync with backend if token is available
    if (token) {
      await axios.post(`${url}/api/cart/removeCart`, { itemId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = menu_list2.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setMenu_list2(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data from the backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/getCart`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const backendCartData = response.data.cartData || {};

      // Merge backend cart data with local cartItems
      const mergedCart = { ...cartItems, ...backendCartData };
      setCartItems(mergedCart);

      // Persist to localStorage
      localStorage.setItem("cartItems", JSON.stringify(mergedCart));
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Save cart to backend on logout
  const saveCartToBackend = async () => {
    if (token) {
      try {
        await axios.post(`${url}/api/cart/saveCart`, { cartItems }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Cart saved to backend successfully");
      } catch (error) {
        console.error("Error saving cart to backend:", error);
      }
    }
  };

  // Handle Logout
const logout = async () => {
  if (token) {
    try {
      // Clear cart from backend
      await axios.post(`${url}/api/cart/clearCart`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token to clear the cart
        },
      });
      console.log("Cart cleared from backend successfully");
      toast.success("User logged out successfully");
    } catch (error) {
      console.error("Error clearing cart from backend:", error);

    }
  }

  // Clear token and cartItems from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("cartItems");

  // Clear token and cartItems from state
  setToken("");
  setCartItems({});

  // Redirect to login page
  navigate("/");
};


  // Initialize data on page load
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  // Sync cartItems with backend on token change
  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    menu_list2,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout,  // Export logout to be used in components
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
