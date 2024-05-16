import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/Welcome";
import Board from "./components/Board";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Board nav="tasks" />} />
          <Route path="/statistics/:userId" element={<Board nav="stats" />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    );
  }

  // return (
  //   <div className="App">
  //     <Routes>
  //       {
  //         isSignedIn ?
  //         <Route path='/' element={<Board/>}/>
  //         :
  //         <Route path='/' element={<Welcome/>}/>
  //       }
  //       <Route path='/stats/:userId' element={<Stats/>}/>
  //     </Routes>
  //   </div>

  // );
}

export default App;
