// src/components/usePokemonSearch.js
import { useState, useEffect } from 'react';

const usePokemonSearch = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allPokemonData, setAllPokemonData] = useState([]); 
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
        const fetchAllPokemon = async () => {
            let allPokemonList = [];
            let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

            try {
                setLoading(true);
                while (nextUrl) {
                  
                    const response = await fetch(nextUrl);
                    if (!response.ok) {
                        throw new Error('Failed to fetch initial Pokémon list.');
                    }
                    const data = await response.json();
                    allPokemonList = [...allPokemonList, ...data.results];
                    nextUrl = data.next;
                }
                
               
                const BATCH_SIZE = 50; 
                const fetchedData = [];

                for (let i = 0; i < allPokemonList.length; i += BATCH_SIZE) {
                    const batch = allPokemonList.slice(i, i + BATCH_SIZE);
                    const detailedPokemonPromises = batch.map(async (pokemon) => {
                        try {
                            const res = await fetch(pokemon.url);
                            if (!res.ok) {
                                console.warn(`Could not fetch details for ${pokemon.name}: ${res.status}`);
                                return null;
                            }
                            const detailedData = await res.json();
                            return {
                                id: detailedData.id,
                                name: detailedData.name,
                                image: detailedData.sprites.front_default
                            };
                        } catch (err) {
                            console.error(`Error fetching data for ${pokemon.name}:`, err);
                            return null;
                        }
                    });

                    const batchResults = await Promise.all(detailedPokemonPromises);
                    const validBatch = batchResults.filter(p => p !== null);
                    fetchedData.push(...validBatch);
                }
                setLoading(false);
                setAllPokemonData(fetchedData);
                setPokemons(fetchedData);

            } catch (err) {
                console.error("Failed to fetch all Pokémon data:", err);
                setError("Error al cargar la lista completa de Pokémon. Por favor, recargue la página.");
            } finally {
                setInitialLoading(false);
            }
        };
        fetchAllPokemon();
    }, []);

  const searchPokemons = (term) => {
    setLoading(true);
    setError(null);
    setPokemons([]);

    
    try {
        if (!term.trim()) {
            setPokemons(allPokemonData);
        } else {
            const filteredResults = allPokemonData.filter(p => p.name.includes(term.toLowerCase()));
            if (filteredResults.length === 0) {
                setError(`No se encontraron resultados para "${term}".`);
            }
            setPokemons(filteredResults);
        }
    } catch (err) {
        setError("Hubo un error al buscar los Pokémon. Por favor, inténtelo de nuevo más tarde.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return { pokemons, loading, error, initialLoading, searchPokemons };
};

export default usePokemonSearch;