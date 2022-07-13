import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/button/Button';

function App() {
  return (
    <div className="App">
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
