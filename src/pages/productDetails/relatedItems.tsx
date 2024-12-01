import { Box, Grid, Typography } from "@mui/material";
import Card from "components/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "state/getProducts";
import { AppDispatch, RootState } from "state/store";

const RelatedItems = () => {
  const { product } = useSelector((state: RootState) => state.product);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    product?.category && dispatch(fetchCategoryProducts(product?.category));
  }, [product]);

  return (
    <Box marginTop={10}>
      <Typography component={"h2"} fontSize={35} fontWeight={'600'}>Category: {product?.category}</Typography>
      <Grid container spacing={5} marginTop={'8px'}>
        {products.map((product) => (
          <Grid key={product.id} item xs={6} md={3}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedItems;
