import classNames from 'classnames';
import LinkRoot, { LinkProps } from 'next/link';
import { FC, ReactNode } from 'react';

interface ILinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary';
  hiddenUnderline?: boolean;
  textTransform?: 'unset' | 'uppercase' | 'capitalize';
  variant?: 'primary' | 'secondary';
  title: string;
  target?: '_self' | '_blank';
}

export const Link: FC<ILinkProps> = ({
  children,
  textTransform,
  hiddenUnderline,
  variant,
  className,
  target,
  ...rest
}) => {
  return (
    <LinkRoot target={target} {...rest} passHref>
      <a
        className={classNames(
          'ks-link',
          `-${textTransform}`,
          `-${variant}`,
          { '-hidden-underline': hiddenUnderline },
          className,
        )}
      >
        <>{children}</>
      </a>
    </LinkRoot>
  );
};

Link.defaultProps = {
  color: 'primary',
  hiddenUnderline: false,
  textTransform: 'unset',
  variant: 'primary',
  target: '_blank',
};
