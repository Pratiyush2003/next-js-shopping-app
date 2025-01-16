'use client';
import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const [stripeloading, setstripeLoading] = useState(false);

    const handlecheckout = async () => {
        setstripeLoading(true);
        const stripe = await stripePromise;
        try {
            const response = await fetch('/api/stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems}),
            });
    
            if (!response.ok) {
                throw new Error('Failed to checkout');
            }
    
            const data = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: data.id });
            console.log(result);
            if (result.error) {
                console.log(result.error.message);
            }
        } catch (error) {
            console.log(error);
        }
        setstripeLoading(false);
    };
    

    
    async function getProductsFromCart() {
        try {
            const token = localStorage.getItem('usertoken');
            const response = await fetch('/api/product/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }

            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            setError('Unable to fetch cart items.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductsFromCart();
    }, []);

    const handleRemove = async (id) => {
        const response = await fetch(`/api/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to remove product from cart');
        } else {
            getProductsFromCart();
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center" style={{ height: "calc(100vh - 4rem)" }}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW02oWLO4f77NgnxUuLTgcVBIZ5z4ISnqQg&s"
                    alt="Loading"
                    className="h-56 w-56"
                />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    if (cartItems.products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
                <Link
                    href="/uipages/ProductPage" className="flex justify-center items-center h-screen">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW02oWLO4f77NgnxUuLTgcVBIZ5z4ISnqQg&s"
                        alt="Loading"
                        className="h-56 w-56"
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Your Cart</h2>
            <ul className="flex flex-col divide-y divide-gray-200">
                {cartItems.products.map((product, index) => (
                    <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between items-center">
                        <div className="flex w-full sm:w-auto space-x-4">
                            <img
                                className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded object-contain"
                                src={product.image}
                                alt={product.name}
                            />
                            <div className="flex flex-col justify-between">
                                <h3 className="text-lg font-semibold">{product.productname}</h3>
                                <p className="text-sm text-gray-500">{product.brand}</p>
                                <div className="mt-2">
                                    <p className="text-lg font-bold">₹{product.price}</p>
                                    <p className="text-sm line-through text-gray-400">{product.originalPrice}</p>
                                    <p className="text-sm text-green-500">{product.discount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mt-4 sm:mt-0 space-x-3">
                            <button
                                type="button"
                                className="flex items-center space-x-2 text-red-500 hover:underline"
                                onClick={() => handleRemove(product._id)}
                            >
                                <Trash size={16} />
                                <span>Remove</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 space-y-2 text-right">
                <p className="text-xl font-semibold">
                    Total: ₹ 
                    {Math.ceil( cartItems.products.reduce(
                        (total, item) => total + parseFloat(item.price.replace('₹', '')),
                        0
                    ))}
                </p>
                <div className="flex justify-end space-x-4">
                    <Link
                        href="/uipages/ProductPage"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-200"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        type="button"
                        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                        onClick={handlecheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
