import Carousel from "components/carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts, fetchProducts } from "state/getProducts";
import { AppDispatch, RootState } from "state/store";
import Content from "./content";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.length]);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryProducts(category || "all"));
    }
  }, [searchParams]);

  return (
    <>
      <Carousel />
      <Content />
    </>
  );
};

export default Products;
