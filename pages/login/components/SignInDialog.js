import {
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Container } from "@mui/system";
import CustomField from "../../../components/CustomTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import CustomOutlinedButton from "../../../components/CustomButton";
import Link from "../../../components/MuiNextLink";
import { toast } from "react-toastify";
import useAuth from "../../../auth/authContext";

const CustomInputField = styled(TextField)({
  width: "350px",
  marginBottom: 20,
  background: "#132136",
  borderRadius: "9px",
  "& .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17px",
    background: "#132136",
    borderRadius: "9px",
    height: "20px",
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
});

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password"),
  // .min(8, "Password should be of minimum 8 characters length")
  // .required("Password is required"),
});

const SignInDialog = ({ open = true, handleClose = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      login(values.email, values.password)
        .then((value) => {
          console.log(value);
          if (value.error) toast.error(value.error);
          else if (value.token == "error")
            toast.error("Incorrect Credentials!");
          else if (value.token) {
            toast.success("Logged In Successfully!");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error("failed to login...");
          setIsLoading(false);
        });
    },
  });

  const [showpassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Dialog
      PaperComponent={Container}
      maxWidth="lg"
      sx={{
        marginTop: "90px",
        background: "rgba(9, 13, 21, 0.2)",
        borderRadius: "6px",
        zIndex: "99999",
      }}
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
    >
      <Box
        sx={{
          border: "1px solid #3B4B82",
          position: "relative",
          borderRadius: "9px",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            md={7}
            sx={{
              borderRight: 1,
              borderColor: "rgba(57, 76, 104, 0.6)",
              height: "100%",
              background: "rgba(5, 16, 31, 0.71)",
            }}
          >
            <form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h4" mb={3} sx={{ width: "350px" }}>
                  Welcome Back!
                </Typography>
                <CustomInputField
                  variant="outlined"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    form: {
                      autocomplete: false,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInputField
                  variant="outlined"
                  name="password"
                  placeholder="Password"
                  type={showpassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showpassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  mt={-1}
                  variant="body2"
                  sx={{ color: "#0E9AFF", width: "350px" }}
                >
                  Forgot your password ?
                </Typography>
                <CustomOutlinedButton
                  text="Sign In"
                  Icon={ArrowRightAltIcon}
                  isLoading={isLoading}
                  sx={{ mt: 5 }}
                />
              </Box>
            </form>
          </Grid>
          <Grid
            item
            md={5}
            sx={{ height: "100%", background: "rgba(0, 0, 0, 0.3)" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" mb={3}>
                New to Skylark Labs?
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                sx={{ width: "250px", textAlign: "center", color: "#6A7A93" }}
              >
                Sign up and start enhancing your security today!
              </Typography>
              <Link href="/signup">
                <CustomOutlinedButton
                  text="Sign Up"
                  Icon={ArrowRightAltIcon}
                  sx={{ mt: 3 }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
export default SignInDialog;
