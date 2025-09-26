// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import PokemonCarousel from './components/PokemonCarousel';
import usePokemonSearch from './components/PokemonSearch';
import PokemonDetails from './components/PokemonDetails';
import './styles/App.css';
import './styles/SearchBar.css';
import "./components/Footer"
import "./components/Header"
import Page_Header from './components/Header';
import  Page_Footer from './components/Footer';

function App() {
  const { pokemons, loading, error, searchPokemons } = usePokemonSearch();

  return (
    <Router>
      <div className='app-container'>
      <Page_Header></Page_Header>

      <Routes>
        <Route path="/" element={
          <>
            <SearchBar onSearch={searchPokemons} />
            {loading && <p className="status-message">Buscando Pokémon...</p>}
            {error && <p className="status-message error-message">{error}</p>}
            {!loading && !error && pokemons.length > 0 && <PokemonCarousel pokemons={pokemons} />}
          </>
        } />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
      <Page_Footer></Page_Footer>
      </div>
    </Router>
  );
}

export default App;