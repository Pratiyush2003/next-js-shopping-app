"use client";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Productcard from "@/components/productcard/Productcard";
import { useEffect, useState } from "react";

const Categorypage = () => {
    const { product } = useSelector((state) => state.app);
    const { singleproduct } = useParams();
    const router = useRouter();

    const [getsingleProduct, setGetsingleProduct] = useState(null);
    const [getsimilarcategoryproject, setGetsimilarcategoryproject] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (singleproduct) {
            const singleProductData = product.find(
                (ele) => ele.id === parseInt(singleproduct)
            );
            const similarCategoryProducts = product.filter(
                (ele) => ele.category === singleProductData?.category
            );

            setGetsingleProduct(singleProductData);
            setGetsimilarcategoryproject(similarCategoryProducts);
        } else {
            router.push("/");
        }
    }, [singleproduct, product, router]);

    const addtocart = async () => {
        const token = localStorage.getItem("usertoken");
        if (!token) {
            router.push("/uipages/LoginPage");
            return;
        }

        if (!getsingleProduct) return;

        try {
            setLoading(true);

            const response = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productname: getsingleProduct.title,
                    price: getsingleProduct.price.toString(),
                    image: getsingleProduct.images[0],
                    brand: getsingleProduct.brand,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

            if(response.ok){
                router.push("/uipages/CartPage");
            }
            
            const data = await response.json();
            
        } catch (error) {
            console.error("Error adding product to cart:", error);
        } finally { 
            setLoading(false);
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-12 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full h-80 object-contain object-center rounded"
                            src={getsingleProduct?.images[0]}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {getsingleProduct?.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {getsingleProduct?.title}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    {Array.from(
                                        { length: Math.floor(getsingleProduct?.rating || 0) },
                                        (_, index) => (
                                            <svg
                                                key={index}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-4 h-4 text-indigo-500"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        )
                                    )}
                                    <span className="text-gray-600 ml-3">
                                        {getsingleProduct?.rating} Reviews
                                    </span>
                                </span>
                            </div>
                            <p className="leading-relaxed">{getsingleProduct?.description}</p>
                            <div className="flex mt-3">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    ${getsingleProduct?.price}
                                </span>
                                <button
                                    onClick={addtocart}
                                    disabled={loading}
                                    className="flex ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded"
                                >
                                    {loading ? "Adding..." : "Add To Cart"}
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Productcard product={getsimilarcategoryproject} />
        </>
    );
};

export default Categorypage;
