import './style.css';
import { AccessAlarm } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className='App'>
      <Typography variant='h1'>squeeze films</Typography>
      <h1>フォントのテスト</h1>
      <p>font test</p>
      <p>フォントのテスト</p>
      <AccessAlarm></AccessAlarm>
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </div>
  );
}

export default App;
