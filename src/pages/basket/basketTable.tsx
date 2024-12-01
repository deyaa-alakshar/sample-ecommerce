import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "state/store";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Typography } from "@mui/material";
import { removeFromCard } from "state/addToCard";
import { useCallback } from "react";
import { Product } from "state/getProducts";
import { toast } from "react-toastify";

const BasketTable = () => {
  const { card } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = useCallback((product: Product) => {
    dispatch(removeFromCard(product));
    toast.success("Successfully removed from the Card", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  }, []);

  return (
    <>
      <Typography
        component={"h2"}
        fontSize={35}
        fontWeight={"600"}
        sx={{ marginBottom: 2 }}
      >
        Card
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {card.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <img
                      src={product.image}
                      alt="product image"
                      className="w-20 h-20"
                    />
                    {product.title}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemove(product)}
                  >
                    <DeleteOutlineOutlinedIcon color="error" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasketTable;
