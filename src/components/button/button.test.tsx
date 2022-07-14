import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Button, {ButtonProps, ButtonSize, ButtonType} from './Button';

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct based on different props', () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  });
  it('should render a link when bthType equals link and href is provided', () => {
    render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>);
    const element = screen.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render a disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const element = screen.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
