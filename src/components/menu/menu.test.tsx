import React from 'react';
import {cleanup, fireEvent, render, RenderResult, screen} from '@testing-library/react';
import Menu, {MenuProps} from './Menu';
import MenuItem from './MenuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
};

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
};

const generateMenu = (props: MenuProps) => {
  return <Menu {...props}>
    <MenuItem>
      active
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      xyz
    </MenuItem>
    <li>
      li test
    </li>
  </Menu>;
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

const getElement = () => {
  wrapper = render(generateMenu(testProps));
  menuElement = screen.getByTestId('test-menu');
  activeElement = screen.getByText('active');
  disabledElement = screen.getByText('disabled');
  return {wrapper, menuElement, activeElement, disabledElement};
};

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    getElement();
  });
  it('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('w-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('w-menu-item is-active');
    expect(disabledElement).toHaveClass('w-menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = screen.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    expect(thirdItem).toHaveClass('is-active');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    render(generateMenu(testVerticalProps));
    expect(screen.getByTestId('test-menu')).toHaveClass('menu-vertical');
  });
});
