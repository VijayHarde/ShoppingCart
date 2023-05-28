import React, { useContext, useEffect } from "react";
import Product from "../../shared/cart";
import './home-page.css';
import CartDataContext from "../../context/cardDataContext";


const Home = () => {
    const context = useContext(CartDataContext);

    useEffect(() => {
        context.setFilterType('home');
    },[]);

    return (
        <>
             {/* <AppHeader /> */}
            {
                context.products.length === 0 ? (
                    <div className="productContainer">
                        <h1>No Products Found..</h1>
                    </div>
                ) : (
                    <div className="productContainer">
                        {
                            context.products.map((product, i) =>
                            (
                                <span>
                                    {/* <span>{product.path}</span> */}
                                    <Product
                                        id={product.id}
                                        path={product.path}
                                        title={product.title}
                                        description={product.description}
                                        price={product.price}
                                        quantity={product.quantity}
                                    />
                                </span>
                            )
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Home;