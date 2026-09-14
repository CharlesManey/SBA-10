import {Route, Routes} from 'react-router-dom'
import NotFoundPage from './pages/NotFound';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';


function App() {
  return(
    <div className='bg-amber-800 flex flex-col items-center'>
      <header>
        <h1 className='text-4xl font-bold text-amber-200 mb-2 pt-2'>Recipe Discovery App</h1>
        <NavBar />
      </header>

      <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route path='/search' element={<SearchPage/>}/>

        <Route path='/categories' element={<CategoriesPage/>}/>

        <Route path='/category/:categoryName' element={<CategoryPage/>}/>

        <Route path='/recipe/:mealId' element={<RecipeDetailPage/>}/>

        <Route path='/favorites' element={<FavoritesPage/>}/>

        <Route path='/login' element={<LoginPage/>}/>

        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;