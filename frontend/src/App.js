import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/homepage';
import Charts from './pages/Charts';
import EngineData from './pages/EngineData';
import HomePage from './components/Home/home';
import EngineFaults from './pages/EngineFaults';
import ErrorPrevent from './pages/ErrorPrevent';
import GpsTracker from './pages/GpsTracker';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chart' element={<Charts/>}/>
          <Route path='/EngineData' element={<EngineData/>}/>
          <Route path='/EngineFaults' element={<EngineFaults/>}/>
          <Route path='/ErrorPrevent' element={<ErrorPrevent/>}/>
          <Route path='/GpsTracker' element={<GpsTracker/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;