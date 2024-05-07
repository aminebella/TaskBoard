import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import Board from './components/Board';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';


function App() {

  const { isSignedIn } = useAuth();
  const navigate = useNavigate()

  useEffect(()=>{
    
    function IsUserSignedIn(){
      if(isSignedIn){
        navigate('/Dashboard');
      }
    }
  
    IsUserSignedIn()
  },[isSignedIn , navigate])



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/Dashboard' element={<Board/>}/>
        <Route path='/stats' element={<p>hello from stats</p>}/>
      </Routes>
    </div>

  );
}

export default App;
