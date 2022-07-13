import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/button/Button';

function App() {
  return (
    <div className="App">
      <Button btnType={ButtonType.Link} href={'http://www.baidu.com'}>
        button
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
        button
      </Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Danger} disabled={true}>
        button
      </Button>
    </div>
  );
}

export default App;
