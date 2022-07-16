import {
  Button,
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
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CustomOutlinedButton from "../../../components/CustomButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { toast } from "react-toastify";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "../../../components/MuiNextLink";
import useAuth from "../../../auth/authContext";

const CustomInputField = styled(TextField)({
  width: "400px",
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

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  username: yup.string("Enter your Name").required("User Name is required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Contact number is not valid")
    .required("Contact number is required"),
  organistion_name: yup
    .string("Enter Organization Name")
    .required("Organization Name is required"),
  location: yup.string("Enter Location").required("Location is required"),
});

const SignupDialog = ({ open = true, handleClose = () => {} }) => {
  const steps = ["Credentials", "Profile", "Organization Profile"];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { register } = useAuth();
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      contact: "",
      organistion_name: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const handleSignup = () => {
    setIsLoading(true);
    register(formik.values)
      .then((res) => {
        console.log(res);
        window.location.pathname = "/verifyemail";
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
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
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="400px"
              margin="auto"
            >
              <Typography variant="h4" mb={3} sx={{ width: "400px" }}>
                Join Today!
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ mb: 2 }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 0 && (
                  <Credentials formik={formik} handleNext={handleNext} />
                )}
                {activeStep === 1 && (
                  <Profile
                    formik={formik}
                    handleNext={handleNext}
                    handleBack={handleBack}
                  />
                )}
                {activeStep === 2 && (
                  <OrganizationDetails
                    formik={formik}
                    handleSignup={handleSignup}
                    handleBack={handleBack}
                    isLoading={isLoading}
                  />
                )}
              </form>
            </Box>
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
                Already have an account?
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                sx={{ width: "250px", textAlign: "center", color: "#6A7A93" }}
              >
                Get back to where you left!
              </Typography>
              <Link href="/login">
                <CustomOutlinedButton
                  text="Sign In"
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
export default SignupDialog;

const Credentials = ({ formik, handleNext }) => {
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <CustomInputField
        variant="outlined"
        placeholder="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <CustomInputField
        variant="outlined"
        placeholder="Password"
        type={showpassword ? "text" : "password"}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
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
      <CustomInputField
        variant="outlined"
        placeholder="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
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
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomOutlinedButton
          variant="outlined"
          type="submit"
          text="Next"
          Icon={ArrowForwardIosIcon}
          onClick={(e) => {
            e.preventDefault();
            console.log(formik.errors);
            Object.keys(formik.errors).map((key) => {
              if (
                key === "email" ||
                key === "password" ||
                key === "confirmPassword"
              )
                toast.error(formik.errors[key]);
            });
            if (
              !formik.errors.email &&
              !formik.errors.password &&
              !formik.errors.confirmPassword
            )
              if (
                formik.values.password === formik.values.confirmPassword &&
                formik.values.email !== ""
              ) {
                handleNext();
              } else {
                toast.error("Passwords must match");
              }
          }}
        />
      </Box>
    </>
  );
};

const Profile = ({ formik, handleNext, handleBack }) => {
  return (
    <>
      <CustomInputField
        variant="outlined"
        placeholder="User Name"
        type="text"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeIcon />
            </InputAdornment>
          ),
        }}
      />
      <CustomInputField
        variant="outlined"
        placeholder="+xxxxxxxxxxxx"
        type="text"
        name="contact"
        value={formik.values.contact}
        onChange={formik.handleChange}
        error={formik.touched.contact && Boolean(formik.errors.contact)}
        helperText={formik.touched.contact && formik.errors.contact}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomOutlinedButton
          text={"Back"}
          StartIcon={ArrowBackIosNewIcon}
          variant="outlined"
          onClick={() => {
            handleBack();
          }}
        />

        <CustomOutlinedButton
          variant="outlined"
          type="submit"
          text="Next"
          Icon={ArrowForwardIosIcon}
          onClick={() => {
            console.log(formik.errors);
            if (!formik.errors.username && !formik.errors.contact) handleNext();
          }}
        />
      </Box>
    </>
  );
};

const OrganizationDetails = ({
  formik,
  handleSignup,
  handleBack,
  isLoading,
}) => {
  return (
    <>
      <CustomInputField
        variant="outlined"
        placeholder="Organization Name"
        type="text"
        name="organistion_name"
        value={formik.values.organistion_name}
        onChange={formik.handleChange}
        error={
          formik.touched.organistion_name &&
          Boolean(formik.errors.organistion_name)
        }
        helperText={
          formik.touched.organistion_name && formik.errors.organistion_name
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CorporateFareIcon />
            </InputAdornment>
          ),
        }}
      />
      <CustomInputField
        variant="outlined"
        placeholder="Location"
        type="text"
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomOutlinedButton
          variant="outlined"
          text="Back"
          StartIcon={ArrowBackIosNewIcon}
          onClick={() => {
            handleBack();
          }}
        />

        <CustomOutlinedButton
          variant="outlined"
          size="large"
          type="submit"
          text="Create Account"
          isLoading={isLoading}
          loadingPosition="end"
          sx={{
            textTransform: "none",
          }}
          Icon={ArrowRightAltIcon}
          onClick={() => {
            console.log(formik.errors);
            if (!formik.errors.organistion_name && !formik.errors.location)
              handleSignup();
          }}
        />
      </Box>
    </>
  );
};
