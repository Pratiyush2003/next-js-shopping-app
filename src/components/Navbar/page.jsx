"use client";
import { useState, memo, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const navref = useRef(null);

    const handleOutsideClick = (e) => {
        if (navref.current && !navref.current.contains(e.target)) {
            setToggle(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }
    , []);

    return (
        <>
            <div ref={navref} className="flex justify-between items-center w-full bg-black text-white px-4 md:px-14 h-20 rounded-lg">
                <Link href="/" className="text-lg font-semibold">
                    Next Js
                </Link>
                <div>
                    <div
                        className="border-2 rounded-lg p-1 md:hidden cursor-pointer"
                        onClick={() => setToggle(!toggle)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={toggle}
                    >
                        <Menu size={24} />
                    </div>
                    <ul className="hidden md:flex items-center justify-between gap-4 cursor-pointer">
                        <li>
                            <Link className="hover:border-b-2" href="/">Home</Link>
                        </li>
                        <li>
                            <Link className="hover:border-b-2" href="/uipages/ProductPage/">Products</Link>
                        </li>
                        <li>
                            <Link className="hover:border-b-2" href="/uipages/CartPage">Cart</Link>
                        </li>
                        <li>
                            <Link className="hover:border-b-2" href="/uipages/LoginPage">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div > 
                <ul
                    className={`${
                        toggle ? "block" : "hidden"
                    } flex flex-col items-start p-4 gap-4 cursor-pointer bg-black text-white absolute w-64 h-auto z-10 rounded-lg top-[6rem] right-2 md:hidden`}
                >
                    <li>
                        <Link className="hover:border-b-2" href="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:border-b-2" href="/uipages/ProductPage/">Products</Link>
                    </li>
                    <li>
                        <Link className="hover:border-b-2" href="/uipages/CartPage">Cart</Link>
                    </li>
                    <li>
                        <Link className="hover:border-b-2" href="/uipages/LoginPage">Login</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default memo(Navbar);
