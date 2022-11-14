// Pages Import
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchList from './pages/SearchList/SearchList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import Ad from './pages/Admin/Ad';
import Product from './pages/Admin/Product';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Ad/>}/>
      <Route path="/admin/products" element={<Product/>}/>
      <Route path="/search/:keyword" element={<SearchList/>}/>
      <Route path="/products/:model" element={<ProductList/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
    </Routes>
  );
}

export default App;
