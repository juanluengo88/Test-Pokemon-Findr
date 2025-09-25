import { useState, useEffect } from 'react';

const usePokemonSearch = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchAllNames = async () => {
      let results = [];
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon'; 

      try {
        
        while (nextUrl) {
          const response = await fetch(nextUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch initial Pokémon list.');
          }
          const data = await response.json();
          results = [...results, ...data.results];
          nextUrl = data.next; 
        }
        setAllPokemonNames(results);
      } catch (err) {
        console.error("Failed to fetch initial Pokémon list:", err);
        setError("Error al cargar la lista completa de Pokémon. Por favor, recargue la página.");
      } finally {
        setInitialLoading(false); 
      }
    };
    fetchAllNames();
  }, []); 

  
  const searchPokemons = async (term) => {
    setLoading(true);
    setError(null);
    setPokemons([]); 

    try {
      if (!term.trim()) {
       
        setLoading(false);
        return;
      }
      
     
      const filteredResults = allPokemonNames.filter(p => p.name.includes(term.toLowerCase()));

      if (filteredResults.length === 0) {
        setError(`No se encontraron resultados para "${term}".`);
        
        setLoading(false);
        return;
      }

      
      const detailedPokemons = await Promise.all(
        filteredResults.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) throw new Error('Failed to fetch detailed data for a Pokémon.');
          const detailedData = await res.json();
          return {
            id: detailedData.id,
            name: detailedData.name,
          };
        })
      );

      setPokemons(detailedPokemons);

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