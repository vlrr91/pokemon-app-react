import React, { useState, useEffect } from 'react';
import './PokemonCard.css';

export default function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
      const { name, sprites, types } = await response.json();
      const { front_default: img } = sprites;
      const pokemonTypes = types.map(item => item.type.name);
      
      setPokemon({ name, img, pokemonTypes});
    }

    fetchData();
  }, [pokemonName]);

  return (
    <div className="card">
      {pokemon.name && (
        <div className="card__content">
          <h2 className="card__title">{pokemon.name}</h2>
          <div className="card__body">
            <img src={pokemon.img} alt={pokemon.name}/>
            <ul className="card__types">
              {pokemon.pokemonTypes.map(type => 
                <li
                  className={`card__type ${type}`}
                  key={type}
                >
                  {type}
                </li>
              )}
            </ul>
          </div>
        </div>        
      )}
    </div>
  );
}