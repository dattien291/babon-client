import { Image, Link } from '@components/primitive';
import { FC } from 'react';
import { IBlog } from '@interfaces/blog';
import { routes } from '@utils/routes';
import { map } from 'lodash';

interface IBlogCardProps {
  data: IBlog;
}

export const BlogCard: FC<IBlogCardProps> = ({ data }) => {
  const { slug, name, images, tags } = data;

  return (
    <div className="ks-blog-card">
      <div className="thumbnail">
        <Link
          href={{
            pathname: routes.BLOG,
            query: {
              slug,
            },
          }}
          title={name}
        >
          <Image src={images[0] || ''} alt={name} objectFit="cover" />
        </Link>
      </div>
      <div className="content">
        <span className="tag">{tags[0]}</span>
        <h3 className="name">
          <Link
            href={{
              pathname: routes.BLOG,
              query: {
                slug,
              },
            }}
            title={name}
          >
            {name}
          </Link>
        </h3>
        <Link
          href={{
            pathname: routes.BLOG,
            query: {
              slug,
            },
          }}
          className="link"
          title={name}
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
};
