// Pages Import
import {Routes,Route} from 'react-router-dom';
import Admin from "./pages/Admin/Admin";
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import SearchList from './pages/SearchList/SearchList';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/favorite" element={<Favorites/>}/>
      <Route path="/search/:keyword" element={<SearchList/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
    </Routes>
  );
}

export default App;
