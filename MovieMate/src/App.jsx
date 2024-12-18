import { Routes, Route } from 'react-router-dom';
import './css/App.css'; 
import Home from './pages/Home'; 
import Favorites from './pages/Favorites'; 
import { MovieProvider } from './context/MovieContext'; 
import NavBar from './components/NavBar'; 
import Movie from './pages/Movie';  
import Footer from './components/Footer';

function App() {
    return (
        <MovieProvider>
            <NavBar />
            <main className='main-content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/movie/:id' element={<Movie />} /> {/* Updated route */}
                </Routes>
            </main>
            <Footer />
        </MovieProvider>
    )
}

export default App

