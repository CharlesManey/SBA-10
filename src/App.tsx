import {Route, Routes} from 'react-router-dom'
import NotFoundPage from './pages/NotFound';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';


function App() {
  return(
    <div>
      <header>
        <h1>Recipe Discovery App</h1>
        <Navbar />
      </header>

      <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route path='/category' element={<CategoryPage/>}/>

        <Route path='/recipe' element={<RecipeDetailPage/>}/>

        <Route path='/favorites' element={<FavoritesPage/>}/>

        <Route path='/search' element={<SearchPage/>}/>

        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;