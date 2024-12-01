import { Container, Typography } from "@mui/material";
import Card from "components/card";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMediaQuery } from "@mui/material";

const Content = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Container maxWidth="lg">
      <Typography
        marginY={"24px"}
        variant="h3"
        component={"h3"}
        fontSize={"40px"}
      >
        Category : All
      </Typography>
      <Swiper
        slidesPerView={isMobile ? 2 : 4}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Content;
