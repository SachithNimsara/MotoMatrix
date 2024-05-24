import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/homepage';
import Charts from './pages/Charts';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chart' element={<Charts/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
