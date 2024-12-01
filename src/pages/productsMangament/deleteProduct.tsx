import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProduct, Product } from "state/getProducts";
import { AppDispatch } from "state/store";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const DeleteProduct = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open, setOpen]);

  const { mutate, isLoading } = useMutation(
    async (id: number) => {
      const promise = await axios.delete(
        `${process.env.REACT_APP_URL}/products/${id}`
      );
      return promise;
    },
    {
      onSuccess: () => {
        dispatch(deleteProduct(product));
        toast.success("Successfully removed", {
          type: "success",
          position: "bottom-left",
          isLoading: false,
          autoClose: 3000,
        });
        handleClose();
      },
      onError: (error: any) =>
        toast.error(error.message, {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          position: "bottom-left",
        }),
    }
  );

  return (
    <>
      <span className="cursor-pointer" onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon color="error" />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => mutate(product.id!)}
            autoFocus
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProduct;
