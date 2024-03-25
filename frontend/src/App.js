import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
