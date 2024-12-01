import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCard } from "state/addToCard";
import { Product } from "state/getProducts";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { toast } from "react-toastify";
import Favorite from "./favorite";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Card = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleAddToCard = useCallback((product: Product) => {
    dispatch(addToCard(product));
    toast.success("Successfully added to Card", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  }, []);

  return (
    <div
      className="flex flex-col gap-2 mb-10 border-solid border-#121212 border-2 rounded-md p-4 "
      style={{ height: "600px" }}
    >
      <img
        src={product.image}
        alt="product image"
        className="object-cover rounded-md cursor-pointer"
        style={{
          width: "274px",
          height: "414px",
          objectFit: "contain",
        }}
        onClick={() => router(`/home/products/${product.id}`)}
      />
      <Typography className="text-zinc-900 font-medium">
        {product.title?.length > 20
          ? product.title.slice(0, 20) + "..."
          : product.title}
      </Typography>
      <Typography className="text-zinc-900 font-medium">
        {product.category}
      </Typography>
      <div className="flex justify-between">
        <Typography className="text-zinc-900 font-medium">
          {"$ " + product.price}
        </Typography>
        <Favorite product={product} />
      </div>
      <Button
        onClick={() => handleAddToCard(product)}
        variant="contained"
        size={"large"}
      >
        <div className="flex gap-3">
          <LocalGroceryStoreOutlinedIcon color="inherit" />{" "}
          <Typography>Add to card</Typography>
        </div>
      </Button>
    </div>
  );
};

export default Card;
