import React, {createContext, FC, useState} from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectIndex: number) => void

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  children: React.ReactNode;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({
  index: 0
});

const Menu: FC<MenuProps> = (props) => {
  const {className, mode, style, children, defaultIndex, onSelect} = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames('wu-menu', className, {
    'menu-vertical': mode === 'vertical'
  });
  const handleClick = (index: number) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;
