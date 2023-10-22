import classNames from 'classnames';
import { ChangeEvent, FC, FocusEvent } from 'react';

interface ICheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  defaultChecked?: boolean;
  value?: string | number;
  onChange?: ({
    name,
    value,
    checked,
  }: {
    name: string;
    value: string | number;
    checked: boolean;
  }) => void;
  onFocus?: ({
    name,
    value,
    checked,
  }: {
    name: string;
    value: string | number;
    checked: boolean;
  }) => void;
  onBlur?: ({
    name,
    value,
    checked,
  }: {
    name: string;
    value: string | number;
    checked: boolean;
  }) => void;
  checked?: boolean;
  disabled?: boolean;
}

export const Checkbox: FC<ICheckboxProps> = ({
  id,
  name,
  label,
  className,
  checkboxClassName,
  labelClassName,
  defaultChecked,
  value,
  onChange = () => null,
  onFocus = () => null,
  onBlur = () => null,
  checked,
  disabled,
}) => {
  return (
    <div className={classNames('ks-checkbox', { '-disabled': disabled }, className)}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={classNames('checkbox', checkboxClassName)}
        defaultChecked={defaultChecked}
        value={value}
        onChange={
          !disabled
            ? (e) =>
                onChange({
                  name: e.target.name,
                  value: e.target.value,
                  checked: e.target.checked,
                })
            : () => null
        }
        onFocus={
          !disabled
            ? (e) =>
                onFocus({
                  name: e.target.name,
                  value: e.target.value,
                  checked: e.target.checked,
                })
            : () => null
        }
        onBlur={
          !disabled
            ? (e) =>
                onBlur({
                  name: e.target.name,
                  value: e.target.value,
                  checked: e.target.checked,
                })
            : () => null
        }
        disabled={disabled}
        checked={checked}
      />
      {label && (
        <label htmlFor={id} className={classNames('label', labelClassName)}>
          {label}
        </label>
      )}
    </div>
  );
};
