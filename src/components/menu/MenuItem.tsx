import React, {FC, useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './Menu';

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const {index, disabled, className, style, children} = props;
  const {index: activeIndex, onSelect} = useContext(MenuContext);
  const classes = classNames('w-menu-item', className, {
    'is-disabled': disabled,
    'is-active': activeIndex === index
  });
  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index);
    }
  };
  return <li className={classes} style={style} onClick={handleClick}>
    {children}
  </li>;
};

export default MenuItem;
