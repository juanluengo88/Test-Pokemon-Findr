// src/PokemonCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <div className="pokemon-image-container">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>
        <div className="pokemon-info">
          <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;