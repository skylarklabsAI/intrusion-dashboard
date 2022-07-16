import { Box, Dialog, Typography, Button, Container } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../../auth/authContext";

const DeleteCameraModal = ({ open, handleClose, id }) => {
  const { handleDeleteCamera } = useAuth();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={Container}
      sx={{
        background: "rgba(9, 13, 21, 0.8)",
        borderRadius: "6px",
      }}
      PaperProps={{ maxWidth: "sm" }}
    >
      <Box
        sx={{
          background: "#040D18dd",
          border: "2px solid #3B4B82",
          position: "relative",
          borderRadius: "9px",
          p: 4,
        }}
      >
        <Typography variant="h5" mb={2}>
          Are You Sure want to Delete Camera?
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          All the Statistics and Storage will be deleted.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button sx={{ mr: 2 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleDeleteCamera(id).then((res) => {
                if (res) toast.success("Camera Deleted..");
                else toast.error("Failed to Delete Camera..");
              });
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteCameraModal;
