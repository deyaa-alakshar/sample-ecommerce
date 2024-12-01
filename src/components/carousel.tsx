import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const router = useNavigate();

  return (
    <div className="bg-white">
      <Container maxWidth="lg">
        <Swiper
          pagination={{
            type: "bullets",
          }}
          navigation={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              {" "}
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center" }}
                className="p-8"
              >
                <Grid item xs={8} className="text-start">
                  <div className="flex flex-col gap-4">
                    <Typography
                      className="text-zinc-900"
                      variant="h2"
                      component={"h2"}
                      fontSize={"32px"}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      component={"h3"}
                      className="text-zinc-800 text-start"
                      fontSize={"20px"}
                    >
                      {product.description?.slice(0, 124)} ...
                    </Typography>
                    <Typography
                      variant="h4"
                      component={"h4"}
                      className="text-zinc-800 w-1/2 text-start"
                      fontSize={"16px"}
                    >
                      {product.category}
                    </Typography>
                    <div className="text-start">
                      {" "}
                      <Button
                        onClick={() =>
                          router(`/home/products/${product.id}`)
                        }
                        variant="contained"
                        size={"large"}
                      >
                        View this product
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    maxHeight={"452px"}
                    maxWidth={"323px"}
                    height={"352px"}
                    width={"323px"}
                  >
                    <img
                      src={product.image}
                      alt="product image"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Carousel;
