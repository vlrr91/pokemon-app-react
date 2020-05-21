import React, { useRef, useEffect, useState } from 'react';
import './InfiniteScroll.css';
import PokemonCard from '../PokemonCard';

import useIntersection from '../../hooks/useIntersection';

export default function InfiniteScroll() {
  const loadingRef = useRef(null);
  const offset = useRef(0);

  const [data, setData] = useState([]);

  const isIntersecting = useIntersection(loadingRef, { threshold: 1.0 });

  function loadMore() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset.current}&limit=20`)
      .then(res => res.json())
      .then(newData => {
        setData(prevData => [...prevData, ...newData.results])
        offset.current += 20;
      });
  }

  useEffect(() => {
    if (isIntersecting) loadMore();
  }, [isIntersecting]);

  return (
    <div className="scroll-container">
      <div className="scroll-container__grid">
        {data.map(item =>
          <PokemonCard
            key={item.name}
            pokemonName={item.name}
          />
        )}
      </div>
      <div 
        ref={loadingRef}
        className="scroll-container__loader"
      >
        Cargando...
      </div>
    </div>
  );
}
