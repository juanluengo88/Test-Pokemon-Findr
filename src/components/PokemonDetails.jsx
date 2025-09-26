import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PokemonDetails.css";

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("No se encontró el Pokémon.");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <p className="status-message">Cargando detalles...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="status-message error-message">{error}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Volver
      </button>
      <h2 className="pokemon-details-name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <div className="details-image-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="details-image"
        />
      </div>
      <div className="pokemon-info-grid">
        <div className="info-item">
          <strong>Tipo:</strong>
          {pokemon.types.map((t,index) => (
            <span key={t.type.name} className={`type-badge ${t.type.name}`}>
              {t.type.name}
              {index < pokemon.types.length - 1 && ","}
            </span>
          ))}
        </div>
        <div className="info-item">
          <strong>Altura:</strong> {pokemon.height / 10} m
        </div>
        <div className="info-item">
          <strong>Peso:</strong> {pokemon.weight / 10} kg
        </div>
        <div className="info-item">
          <strong>Habilidades:</strong>
          <div className="abilities-list">
            {pokemon.abilities.map((ability, index) => (
              <span key={index} className="ability-item">
                {ability.ability.name}
                {index < pokemon.abilities.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
