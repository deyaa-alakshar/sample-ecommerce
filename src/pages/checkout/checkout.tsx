import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetCard } from "state/addToCard";
import { AppDispatch } from "state/store";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface CheckoutInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalZipCode: string;
  country: string;
  paymentType: string;
}
const initialValues: CheckoutInfo = {
  fullName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalZipCode: "",
  country: "",
  paymentType: "",
};

const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters"),
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(100, "Street address cannot exceed 100 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City cannot exceed 50 characters"),
  stateProvince: z
    .string()
    .min(1, "State/Province is required")
    .max(50, "State/Province cannot exceed 50 characters"),
  postalZipCode: z
    .string()
    .min(1, "Postal/Zip code is required")
    .max(20, "Postal/Zip code cannot exceed 20 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(50, "Country cannot exceed 50 characters"),
  paymentType: z
    .string()
    .min(1, "Payment type is required")
    .max(50, "Payment type cannot exceed 50 characters"),
});

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: CheckoutInfo) => {
    dispatch(resetCard());
    toast.success("your order successfully submited", {
      type: "success",
      position: "bottom-left",
      isLoading: false,
      autoClose: 3000,
    });
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1">
        Check out info
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(checkoutSchema)}
      >
        {({ values, errors, touched, setFieldValue, resetForm }) => (
          <Form>
            <div className="bg-zinc-100 rounded-lg mx-auto p-6">
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full name"
                    type="text"
                    autoComplete="fullName"
                    autoFocus
                    value={values.fullName}
                    onChange={(e) => setFieldValue("fullName", e.target.value)}
                    error={touched.fullName && errors.fullName ? true : false}
                    helperText={errors.fullName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="email"
                    name="email"
                    label="email"
                    type="text"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    error={touched.email && errors.email ? true : false}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    type="tel"
                    autoComplete="phoneNumber"
                    autoFocus
                    value={values.phoneNumber}
                    onChange={(e) =>
                      setFieldValue("phoneNumber", e.target.value)
                    }
                    error={
                      touched.phoneNumber && errors.phoneNumber ? true : false
                    }
                    helperText={errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    type="text"
                    autoComplete="city"
                    autoFocus
                    value={values.city}
                    onChange={(e) => setFieldValue("city", e.target.value)}
                    error={touched.city && errors.city ? true : false}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="stateProvince"
                    name="stateProvince"
                    label="State province"
                    type="text"
                    autoComplete="stateProvince"
                    autoFocus
                    value={values.stateProvince}
                    onChange={(e) =>
                      setFieldValue("stateProvince", e.target.value)
                    }
                    error={
                      touched.stateProvince && errors.stateProvince
                        ? true
                        : false
                    }
                    helperText={errors.stateProvince}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="postalZipCode"
                    name="postalZipCode"
                    label="Postal zip code"
                    type="text"
                    autoComplete="postalZipCode"
                    autoFocus
                    value={values.postalZipCode}
                    onChange={(e) =>
                      setFieldValue("postalZipCode", e.target.value)
                    }
                    error={
                      touched.postalZipCode && errors.postalZipCode
                        ? true
                        : false
                    }
                    helperText={errors.postalZipCode}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="country"
                    name="country"
                    label="country"
                    type="text"
                    autoComplete="country"
                    autoFocus
                    value={values.country}
                    onChange={(e) => setFieldValue("country", e.target.value)}
                    error={touched.country && errors.country ? true : false}
                    helperText={errors.country}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="none"
                    fullWidth
                    id="paymentType"
                    name="paymentType"
                    label="paymentType"
                    type="text"
                    autoComplete="paymentType"
                    autoFocus
                    value={values.paymentType}
                    onChange={(e) =>
                      setFieldValue("paymentType", e.target.value)
                    }
                    error={
                      touched.paymentType && errors.paymentType ? true : false
                    }
                    helperText={errors.paymentType}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="contained"
                      color="inherit"
                      size="large"
                      className="my-4 block"
                      onClick={() => resetForm()}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      className="my-4 block"
                    >
                      Confirm
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Checkout;
