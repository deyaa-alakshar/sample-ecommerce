import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toFormikValidationSchema } from "zod-formik-adapter";
import LoadingButton from "components/loadingButton";
import { toast } from "react-toastify";
import { Navigate, Router, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  username: z
    .string()
    .min(2, " Username must be at least 2 characters")
    .max(255, "Username can't be more than 255 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface Initial {
  username: string;
  password: string;
}

const initialValues: Initial = {
  username: "",
  password: "",
};

const Login = () => {
  const router = useNavigate();

  const { mutate, isLoading } = useMutation(
    async (values: { username: string; password: string }) => {
      const promise = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        values
      );

      return promise;
    },
    {
      onSuccess: (response: any) => {
        toast.success("Welcome back", {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          position: "bottom-left",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("type", "user");
        router("/home/products");
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

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("type") === "user"
    ) {
      router("/home/products");
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("type") === "admin"
    ) {
      router("/dashboard/products");
    }
  }, []);

  return (
    <Formik
      validationSchema={toFormikValidationSchema(schema)}
      onSubmit={(values) => {
        if (
          values.username === "admin@admin" &&
          values.password === "admin@admin"
        ) {
          localStorage.setItem("token", "auth");
          localStorage.setItem("type", "admin");
          router("/dashboard/products");
        } else {
          mutate(values);
        }
      }}
      initialValues={initialValues}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <Container maxWidth="sm">
            <Box
              sx={{ display: "flex", height: "100vh", alignItems: "center" }}
            >
              <div className="flex-grow flex flex-col items-center p-6 rounded-lg gap-3 bg-slate-200">
                <Typography variant="h4" component="h1">
                  Login
                </Typography>
                <TextField
                  margin="none"
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.target.value)}
                  error={touched.username && errors.username ? true : false}
                  helperText={errors.username}
                />
                <TextField
                  margin="none"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  error={touched.password && errors.password ? true : false}
                  helperText={errors.password}
                />
                {isLoading ? (
                  <LoadingButton label="Loading..." />
                ) : (
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    {" "}
                    Sign In
                  </Button>
                )}
              </div>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
