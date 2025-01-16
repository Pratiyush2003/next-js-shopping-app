"use client";
import React, { useEffect, useState } from "react";
import Productcard from "@/components/productcard/Productcard";
import { useDispatch, useSelector } from "react-redux";
import { fetchallproducts } from "@/app/feature/getProduct";
import Pagination from "@/components/Pagination/page";

const ProductPage = () => {
  const { product } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallproducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [search, setSearch] = useState("");

  const filteredProducts = product.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredProducts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredProducts.length / recordsPerPage);

  return (
    <div>
      <div className="flex justify-center mx-3 p-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:max-w-[27rem] p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Productcard product={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductPage;
