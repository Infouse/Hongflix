import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Main} from './pages/Main';
import MovieList from './pages/movieList';
import Header from './componet/Header';
import Footer from './componet/Footer';
import DeTail from './pages/deTail';


function App() {
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='movieList' element={<MovieList/>}/>
        <Route path='deTail' element={<DeTail/>}/>
      </Routes>
      <Footer/>
    </Router>  
  );
}

export default App;
