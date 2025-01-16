"use client";
import { configureStore } from "@reduxjs/toolkit";
import  products from "../feature/getProduct";
export const store = configureStore({
    reducer : {
        app: products
    }
})