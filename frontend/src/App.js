
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Home from "./components/home/Home"
import {Link,BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
       
        
       
    </Routes>
  </BrowserRouter>
  );
}

export default App;
