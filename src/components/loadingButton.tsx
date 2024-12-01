import { Button, CircularProgress, Typography } from "@mui/material";

const LoadingButton = ({ label }: { label: string }) => {
  return (
    <Button className="flex gap-3" variant="text" fullWidth>
      <CircularProgress size="30px" /> <Typography variant="button" component="span">{label}</Typography>
    </Button>
  );
};

export default LoadingButton;
