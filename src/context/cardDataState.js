import { useState } from "react";
import CardDataContext from "./cardDataContext";
import {productList} from "../pages/home/helper/product-helper"

const CartDataState = ({ children }) => {
    const state = [];
    const [products, setProducts] = useState(productList);
    const [cartData, setCartData] = useState(state);
    const [filterCartData, setFilterCartData] = useState(cartData);
    const [filtertype, setFilterType] = useState('home')
    const [total, setTotal] = useState(0);


    const updateState = (productData) => {
        setCartData([...cartData, productData]);
    }

    const removeProduct = (i,price) => {
        let data = cartData.filter((ele,index) => index !== i);
        setCartData(data);
        setFilterCartData(data);
    }

    const emptyCart = () => {
        setCartData([]);
        setFilterCartData([]);
    }

    const updateQuantity = (item) => {
        const data = cartData.map((ele) => {
            if(ele.id == item.id) {
             ele.count = item.count;   
            }
            return ele;
        });
    }

    return (
        <CardDataContext.Provider value={{ cartData, total, products, filterCartData, filtertype, setProducts, updateState, removeProduct, emptyCart, setFilterCartData, setFilterType, setTotal, updateQuantity }}>
            {children}
        </CardDataContext.Provider>
    )
}

export default CartDataState;

