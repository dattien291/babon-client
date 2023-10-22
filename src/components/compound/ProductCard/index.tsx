import { Badge, Button, Image, Link } from '@components/primitive';
import { Rating, Tooltip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IProduct } from '@interfaces/product';
import { useScroll } from '@hooks/useScroll';

export interface IProductCardProps {
  data: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ data }) => {
  const { sale, name, price, optionPrice, id, rating, thumbnail, secondaryThumbnail } = data;

  const [activeThumb] = useState<string>(secondaryThumbnail);

  const [priceSale, setPriceSale] = useState<number>();
  useEffect(() => {
    if (sale) {
      setPriceSale(price - (price * sale) / 100);
    }
  }, [price, sale]);

  return (
    <div className="ks-product-card">
      <div className="thumbnail">
        <Link title="" href="" className="image">
          <Image
            src={thumbnail}
            alt={thumbnail}
            objectFit="cover"
            className="img -main"
            ratio="square"
          />
          <Image src={activeThumb} alt={activeThumb} objectFit="cover" className="img -secondary" />
        </Link>
        <div className="onsale">{sale && <Badge label={sale} className="badge" />}</div>
        <div className="actions">
          <Button className="button" iconOnly square>
            <span className="icon">
              <i className="fa-light fa-heart"></i>
            </span>
          </Button>
          <Button className="button" iconOnly square>
            <span className="icon">
              <i className="fa-light fa-arrow-down-arrow-up fa-rotate-270"></i>
            </span>
          </Button>
          <Button className="button" iconOnly square>
            <span className="icon">
              <i className="fa-light fa-magnifying-glass-plus"></i>
            </span>
          </Button>
        </div>
      </div>

      <div className="content">
        <div className="rating">
          <Rating value={Number(rating)} readOnly size="small" />
        </div>
        <Link title="" className="link" href="">
          {name}
        </Link>

        <div className="price">
          {priceSale ? (
            <>
              {optionPrice ? (
                <>
                  <span className="normal">
                    {price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}{' '}
                    -{' '}
                    {optionPrice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </>
              ) : (
                <>
                  <span className="new">
                    {priceSale.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span className="old">
                    {price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              {optionPrice ? (
                <span className="normal">
                  {price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  })}{' '}
                  -{' '}
                  {optionPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  })}
                </span>
              ) : (
                <span className="normal">
                  {price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  })}{' '}
                </span>
              )}
            </>
          )}
        </div>

        <div className="buy">
          <Button className="button" iconOnly square>
            <span className="icon">
              <i className="fa-light fa-bag-shopping"></i>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
