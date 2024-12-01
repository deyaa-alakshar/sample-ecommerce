import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppDispatch, RootState } from "state/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, fetchProducts, Product } from "state/getProducts";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ErrorMessage, Form, Formik } from "formik";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import MyDropzone from "components/myDropzone";

interface ProductForm {
  id?: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

const initial: ProductForm = {
  title: "",
  price: "0",
  description: "",
  image: "",
  category: "",
};

const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  price: z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid price format"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
  category: z.string().min(1, "Category is required"),
});

const AddEditProduct = ({ product }: { product?: Product }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.categories);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open, setOpen]);

  const { mutate, isLoading } = useMutation(
    async (values: ProductForm) => {
      const path: string = values.id
        ? `${process.env.REACT_APP_URL}/products/${values.id}`
        : `${process.env.REACT_APP_URL}/products`;

      const promise = values.id
        ? await axios.put(path, values)
        : await axios.post(path, values);
      return promise;
    },
    {
      onSuccess: (res: any, data: ProductForm) => {
        toast.success("Successfully added", {
          type: "success",
          position: "bottom-left",
          isLoading: false,
          autoClose: 3000,
        });
        handleClose();
        if (product?.id) {
          dispatch(
            editProduct({
              ...data,
              price: parseFloat(data.price),
              rating: product.rating,
            })
          );
        } else {
          dispatch(fetchProducts());
        }
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
    <div>
      {product?.id ? (
        <span className="cursor-pointer" onClick={handleClickOpen}>
          <EditOutlinedIcon color="primary" />
        </span>
      ) : (
        <Button
          variant="contained"
          size="large"
          sx={{ marginBottom: 2, marginLeft: "auto", display: "block" }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      )}
      <Formik
        initialValues={
          product?.id
            ? {
                id: product.id,
                title: product.title,
                price: product.price.toString(),
                description: product.description,
                image: product.image,
                category: product.category,
              }
            : initial
        }
        onSubmit={(values) => mutate(values)}
        validationSchema={toFormikValidationSchema(productSchema)}
        enableReinitialize
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          resetForm,
          submitForm,
        }) => (
          <Form>
            <Dialog open={open} maxWidth="md">
              <DialogTitle>Add/Edit product</DialogTitle>
              <DialogContent>
                <DialogContentText>Manage your product info</DialogContentText>
                <div className="flex flex-col gap-y-3 mt-4">
                  <TextField
                    margin="none"
                    fullWidth
                    id="title"
                    name="title"
                    label="title"
                    type="text"
                    autoComplete="title"
                    autoFocus
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    error={touched.title && errors.title ? true : false}
                    helperText={errors.title}
                    sx={{ minWidth: "350px" }}
                  />
                  <TextField
                    margin="none"
                    fullWidth
                    id="price"
                    name="price"
                    label="price"
                    type="text"
                    autoComplete="price"
                    autoFocus
                    value={values.price}
                    onChange={(e) => setFieldValue("price", e.target.value)}
                    error={touched.price && errors.price ? true : false}
                    helperText={errors.price}
                    sx={{ minWidth: "350px" }}
                  />
                  <TextField
                    margin="none"
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    type="text"
                    autoComplete="description"
                    autoFocus
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    error={
                      touched.description && errors.description ? true : false
                    }
                    helperText={errors.description}
                    sx={{ minWidth: "350px" }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>

                    <Select
                      labelId="category"
                      id="category"
                      value={values.category}
                      label="Category"
                      onChange={(e: SelectChangeEvent) =>
                        setFieldValue("category", e.target.value as string)
                      }
                      fullWidth
                      className="block"
                      sx={{ minWidth: "350px" }}
                      error={touched.category && errors.category ? true : false}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category}
                          defaultValue={categories[0]}
                          value={category}
                        >
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <MyDropzone
                    onFilesSelected={(image: string) =>
                      setFieldValue("image", image.toString())
                    }
                    src={product?.image}
                  />
                  <ErrorMessage
                    name="image"
                    component={"span"}
                    className="text-red-500"
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  type="submit"
                  onClick={submitForm}
                  disabled={isLoading}
                >
                  {values.id ? "Edit" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditProduct;
