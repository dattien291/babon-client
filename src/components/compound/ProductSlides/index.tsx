import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import { ProductCard } from '../ProductCard';
import { FC } from 'react';
import NextIcon from '@svg/chevron-right.svg';
import PrevIcon from '@svg/chevron-left.svg';
import { breakpoints } from '@/utils/constants';
import { dataProductCard } from '../ProductCard/dataProductCard';
import { IProduct } from '@interfaces/product';
import { Autoplay } from 'swiper';

interface IProductSlidesProps {
  product: IProduct[];
}

export const ProductSlides: FC<IProductSlidesProps> = ({ product }) => {
  return (
    <div className="ks-product-slides ">
      <Swiper
        breakpoints={{
          [breakpoints.xl]: {
            slidesPerView: 4.5,
          },
          [breakpoints.md]: {
            slidesPerView: 3,
          },
          [breakpoints.xs]: {
            slidesPerView: 2,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="swiper"
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          waitForTransition: true,
        }}
      >
        {dataProductCard.map((dataProduct: IProduct, idx: number) => (
          <SwiperSlide key={`product-${idx}`}>
            <ProductCard data={dataProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
