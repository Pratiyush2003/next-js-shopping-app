'use client';
import Link from 'next/link';

const Productcard = ({ product }) => {
    return (
        <section className="text-gray-600 body-font py-10">
            <div className="container px-5 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {product && product.length > 0 ? (
                        product.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-lg rounded-lg p-4 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                            >
                                <a
                                    className="block relative h-48 rounded-t-lg overflow-hidden"
                                    href="#"
                                >
                                    <img
                                        alt={item.title}
                                        className="object-contain object-center w-full h-full hover:scale-105 transition-transform duration-300"
                                        src={item.images[0]}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                        {item.category.toUpperCase()}
                                    </h3>
                                    <h2 className="text-gray-900 title-font text-lg font-semibold line-clamp-1">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-800 font-medium mt-1">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <Link href={`/uipages/Categorypage/${item.id}`}>
                                        <button className="flex mt-3 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded">
                                            View Product
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">
                            Loading...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Productcard;
