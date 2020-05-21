import React from 'react';
import Header from './components/Header';
import InfiniteScroll from './components/InfiniteScroll';
import PokemonCard from './components/PokemonCard';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <InfiniteScroll 
          initialOffset={0}
          limit={20}
          baseUrl={'https://pokeapi.co/api/v2/pokemon'}
          render={(pokemonName) => (
            <PokemonCard 
              key={pokemonName}
              pokemonName={pokemonName}
            />
          )}
        />
      </main>
    </div>
  );
}

export default App;
