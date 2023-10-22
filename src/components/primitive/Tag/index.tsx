import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ITagProps {
  className?: string;
  label: string;
  link?: string;
  onClick?: () => void;
}

export const Tag: FC<ITagProps> = ({ label, className, link, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!!onClick) onClick();
    if (!!link) router.push(link);
  };

  return (
    <span title={label} onClick={handleClick} className={classNames('ks-tag', className)}>
      {label}
    </span>
  );
};

Tag.defaultProps = {
  className: '',
  link: undefined,
  onClick: () => null,
};
