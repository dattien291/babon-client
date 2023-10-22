import classNames from 'classnames';
import { FC } from 'react';

interface IBadgeProps {
  label: string | number;
  color?: 'primary' | 'danger' | 'warning' | 'soft-primary' | 'soft-danger' | 'soft-warning';
  className?: string;
  circle?: boolean;
}

export const Badge: FC<IBadgeProps> = ({ label, color, circle, className }) => {
  return (
    <span className={classNames('ks-badge', `-${color}`, { '-circle': circle }, className)}>
      {label}% OFF
    </span>
  );
};

Badge.defaultProps = {
  label: 'badge',
  color: 'primary',
  className: '',
  circle: false,
};
