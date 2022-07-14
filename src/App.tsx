import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/button/Button';
import Menu from './components/menu/Menu';
import MenuItem from './components/menu/MenuItem';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={0} onSelect={(index) => alert(index)}>
        <MenuItem index={0}>
          cool link1
        </MenuItem>
        <MenuItem index={1} disabled>
          cool link2
        </MenuItem>
        <MenuItem index={2}>
          cool link3
        </MenuItem>
      </Menu>
      <Button autoFocus btnType={ButtonType.Link} href={'http://www.baidu.com'}>
        button
      </Button>
      <Button onClick={
        () => {
          console.log('hi');
        }}
              size={ButtonSize.Large}
              autoFocus
              btnType={ButtonType.Default}>
        button
      </Button>
      <Button
        className={'custom'}
        size={ButtonSize.Small}
        btnType={ButtonType.Danger}
        disabled={true}>
        button
      </Button>
    </div>
  );
}

export default App;
