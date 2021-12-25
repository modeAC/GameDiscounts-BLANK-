import logo from './logo.svg';
import './App.css';
import { Button, Container } from 'react-bootstrap';
import MainScreen from './Components/MainScreen.js';
import Content from './Components/Content.js';

function App() {
  return (
    <body>
      <div class='wrap'>
        <MainScreen/>
        <Content class='content'/>
      </div>
    </body>
  );
}

export default App;
