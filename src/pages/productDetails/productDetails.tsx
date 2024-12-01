import React, { useEffect } from "react";
import Details from "./details";
import RelatedItems from "./relatedItems";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state/store";
import { fetchProduct } from "state/getProduct";
import { Container } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() =>{
    dispatch(fetchProduct(id!))
  },[])

  if(!id){
    return <h1>There is no such item</h1>
  }

  return (
    <Container maxWidth="lg">
      <Details />
      <RelatedItems />
    </Container>
  );
};

export default ProductDetails;
