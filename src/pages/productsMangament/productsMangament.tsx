import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductsTable from "./productsTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state/store";
import { fetchProducts } from "state/getProducts";
import AddEditProduct from "./addEditProduct";
import { fetchCategories } from "state/getCategories";

const ProductsMangament = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);
  return (
    <div>
      <Typography component="h1" fontWeight={"600"} fontSize={"42px"}>
        Products
      </Typography>
      <AddEditProduct />
      <ProductsTable />
    </div>
  );
};

export default ProductsMangament;
