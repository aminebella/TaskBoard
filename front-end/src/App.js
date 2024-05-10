import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import Board from './components/Board';
import { useAuth } from '@clerk/clerk-react';
import Stats from './components/Stats';


function App() {

  const { isSignedIn } = useAuth();

  return (
    <div className="App">
      <Routes>
        {
          isSignedIn ?
          <Route path='/' element={<Board/>}/>
          :
          <Route path='/' element={<Welcome/>}/>
        }
        <Route path='/api/stats/:userId' element={<Stats/>}/>
      </Routes>
    </div>

  );
}

export default App;
