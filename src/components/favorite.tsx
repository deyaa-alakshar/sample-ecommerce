import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Product } from "state/getProducts";
import { addToFavorites, removeFromFavorites } from "state/addToFavorites";
import { toast } from "react-toastify";
import { useCallback } from "react";

const Favorite = ({ product }: { product: Product }) => {
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const handleAddToFavorite = useCallback((product: Product) => {
    dispatch(addToFavorites(product));
    toast.success("Successfully added to Favorites", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  }, []);

  const handleRemoveToFavorite = useCallback((product: Product) => {
    dispatch(removeFromFavorites(product));
    toast.success("Successfully removed from Favorites", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  }, []);

  if (favorites.find((element) => product.id === element.id)) {
    return (
      <span
        className="cursor-pointer"
        onClick={() => handleRemoveToFavorite(product)}
      >
        <FavoriteOutlinedIcon fontSize="large" color="error" />
      </span>
    );
  } else {
    return (
      <span
        className="cursor-pointer"
        onClick={() => handleAddToFavorite(product)}
      >
        <FavoriteBorderOutlinedIcon fontSize="large" color="error" />
      </span>
    );
  }
};

export default Favorite;
