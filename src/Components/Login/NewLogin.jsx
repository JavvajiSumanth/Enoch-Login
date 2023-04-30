import React from "react";
import * as Yup from "yup";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMounted } from "../../hooks/use-mounted";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const initialValues = {
  email: "admin@admin.com",
  password: "admin!",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});
const NewLogin = () => {
  const isMounted = useMounted();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });
  return (
    <Box
      sx={{
        minWidth: {
          xs: "85%",
          md: "600px",
        },
        margin: "100px auto",
      }}
    >
      <Card elevation={16}>
        <CardHeader
          subheader={
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an accounts? &nbsp;
              <Link to={"/register"} underline="hover" variant="subtitle2">
                Register
              </Link>
            </Typography>
          }
          sx={{ pb: 0 }}
          title="Log in"
        />
        <CardContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Stack>
            {formik.errors.submit && (
              <FormHelperText error sx={{ mt: 3 }}>
                {formik.errors.submit}
              </FormHelperText>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewLogin;
