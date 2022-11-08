// Pages Import
import {Routes,Route} from 'react-router-dom';
import Admin from "./pages/Admin/Admin";
import Home from './pages/Home/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  );
}

export default App;
