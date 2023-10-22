import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: 'primary' | 'warning' | 'danger' | 'dark' | 'light';
  size?: 'md' | 'lg';
  noBorder?: boolean;
  bounceHover?: boolean;
  fullWidth?: boolean;
  square?: boolean;
  iconOnly?: boolean;
  circle?: boolean;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isLoading?: boolean;
}

export const Button: FC<IButtonProps> = ({
  color,
  size,
  noBorder,
  fullWidth,
  bounceHover,
  className,
  children,
  square,
  iconOnly,
  circle,
  variant,
  disabled,
  startAdornment,
  endAdornment,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        `ks-button`,
        { '-no-border': noBorder },
        { '-full-width': fullWidth },
        { '-bounce-hover': bounceHover },
        { '-square': square },
        { '-icon-only': iconOnly },
        { '-circle': circle },
        { '-disabled': disabled },
        { '-adornment': startAdornment || endAdornment },
        `-${size}`,
        `-${variant}-${color}`,
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {startAdornment}
      {!isLoading ? children : 'loading...'}
      {endAdornment}
    </button>
  );
};

Button.defaultProps = {
  color: 'primary',
  noBorder: false,
  bounceHover: false,
  fullWidth: false,
  className: '',
  type: 'button',
  square: false,
  iconOnly: false,
  circle: false,
  variant: 'contained',
};
