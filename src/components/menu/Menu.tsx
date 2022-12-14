import React, {createContext, FC, useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './MenuItem';

type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectedIndex: number) => void

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
}

export interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
  index: 0
});

const Menu: FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, style, onSelect, children} = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const classes = classNames('w-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  });
  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSelect?.(index);
  };
  const passedContext: IMenuContext = {
    index: activeIndex ? activeIndex : 0,
    onSelect: handleClick
  };
  const renderChildren = React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<MenuItemProps>;
    const {displayName} = childElement.type;
    if (displayName === 'MenuItem') {
      return React.cloneElement(childElement, {index});
    } else {
      console.error('Warning: Menu has a child which is not a MenuItem');
    }
  });
  return <ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {renderChildren}
    </MenuContext.Provider>
  </ul>;
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;
