import { Button, Container } from "@mui/material";
import BasketTable from "./basketTable";
import { Link } from "react-router-dom";

const Basket = () => {
  return (
    <Container maxWidth="lg">
      <BasketTable />
      <Button
        variant="contained"
        size="large"
        sx={{ margin: "auto", display: "block", marginY: 6 }}
        className="mt-4"
      >
        <Link to={"/home/checkout"}>Go to check out</Link>
      </Button>
    </Container>
  );
};

export default Basket;
