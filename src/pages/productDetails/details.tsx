import { Button, Grid, Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { addToCard } from "state/addToCard";
import { Product } from "state/getProducts";
import { toast } from "react-toastify";
import Favorite from "components/favorite";

const Details = () => {
  const { product } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const handleAddToCard = (product: Product) => {
    dispatch(addToCard(product));
    toast.success("Successfully added to Card", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  };

  return (
    <Grid container spacing={8} alignItems={"center"}>
      <Grid xs={4} alignItems={"center"}>
        <img
          style={{ width: "200px", height: "200px" }}
          src={product?.image}
          alt="product image"
        />
      </Grid>
      <Grid xs={8}>
        <div className="flex flex-col gap-y-2">
          <Typography component={"h1"} fontSize={"32px"}>
            {product?.title}
          </Typography>
          <Typography variant={"subtitle1"} component={"span"} fontSize={"24"}>
            {product?.category}
          </Typography>
          <Rating
            name="product rating"
            defaultValue={5}
            value={product?.rating.rate || 5}
            readOnly
          />
          <Typography component={"span"} fontSize={"20"} className="font-bold">
            <AttachMoneyOutlinedIcon /> {product?.price}
          </Typography>
          <Typography component={"span"} fontSize={"20"} className="font-bold">
            {" "}
            {product?.description}
          </Typography>
          <Button
            onClick={() => handleAddToCard(product!)}
            variant="contained"
            size={"large"}
            className="w-1/3"
          >
            <div className="flex gap-3">
              <LocalGroceryStoreOutlinedIcon color="inherit" />{" "}
              <Typography>Add to card</Typography>
            </div>
          </Button>
          <Favorite product={product!} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Details;
