import React, { useContext,useState, useEffect } from "react";
import CartDataContext from "../../context/cardDataContext";
import ListItems from "../../shared/list";
import './card-items.page.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartItems = () => {

    const navigate = useNavigate();
    const context = useContext(CartDataContext);
    const [openToast, setOpenToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);

    
    useEffect(() => {
        context.setFilterType('card');
        context.setFilterCartData(context.cartData);
        const total = context.cartData.reduce((acc , ele) => {
            return acc + (ele.price * ele.count);
        },0);
        context.setTotal(total);
    },[]);

    const closeToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
        setOpenErrorToast(false)
    };

    const placeOrder = async () => {
        try {
            const responce = await axios.post("https://dummyjson.com/posts/add", { "userId": 5, ...context.cartData });
            context.emptyCart();
            context.setTotal(0);
            setOpenToast(true);
            navigate('/home');
        } catch (error) {
            setOpenErrorToast(true);
            console.log("Error", error);
        }
    }

    return (
        <>
            <Snackbar
                open={openToast}
                autoHideDuration={6000}
                onClose={closeToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={closeToast} severity="success" sx={{ width: '100%' }}>
                   Order Placed Successfully
                </Alert>
            </Snackbar>

            <Snackbar
                open={openErrorToast}
                autoHideDuration={6000}
                onClose={closeToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={closeToast} severity="error" sx={{ width: '100%' }}>
                   Error Occured while placing the order
                </Alert>
            </Snackbar>

            {/* <AppHeader /> */}

            {
                context.filterCartData.length === 0 ? (
                    <div className="productContainer">
                        <h1>No Products Found..</h1>
                    </div>
                ) : (

                    context.filterCartData.map((products, index) => (
                        <ListItems
                            productName={products.title}
                            description={products.description}
                            path={products.path}
                            price={products.price}
                            index={index}
                            count={products.count}
                        />
                    ))

                )
            }


            <div className="center">
                <h4>Total :- {context.total}</h4>
                <button
                    className="btn"
                    onClick={placeOrder}
                    disabled={context.total == 0}
                >Place Order</button>
            </div>
        </>
    )
}

export default CartItems;