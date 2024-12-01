import { Container, Grid, Typography } from "@mui/material";
import Card from "components/card";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const Favorites = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites);

  return (
    <Container maxWidth="lg">
      <Typography component={"h2"} fontSize={35} fontWeight={"600"}>
        Favorites
      </Typography>
      <Grid container spacing={5} marginTop={"8px"}>
        {favorites.map((product) => (
          <Grid key={product.id} item xs={6} md={3}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
