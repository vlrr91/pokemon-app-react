import React, { useRef, useEffect, useState, useCallback } from 'react';

// Utils
import { fetcher } from '../../utils/fetcher';

// Hooks
import useIntersection from '../../hooks/useIntersection';

// Styles
import './InfiniteScroll.css';

export default function InfiniteScroll({
  initialOffset,
  limit,
  baseUrl,
  render
}) {
  const loadingRef = useRef(null);
  const offset = useRef(initialOffset);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const isIntersecting = useIntersection(loadingRef, {
    threshold: 1.0,
    rootMargin: '140px'
  });

  const loadMore = useCallback(async () => {
    setLoading(true);
    const url = `${baseUrl}?offset=${offset.current}&limit=${limit}`;
    const { results } = await fetcher(url);

    setData(prevData => [...prevData, ...results])
    offset.current += 20;
    setLoading(false);
  }, [baseUrl, limit]);

  useEffect(() => {
    if (isIntersecting) loadMore();
  }, [isIntersecting, loadMore]);

  if (render) {
    return (
      <div className="scroll-container">
        <div className="scroll-container__grid">
          {data.map(item => render(item.name))}
        </div>
        <p className="scroll-container__loader">
          {loading ? 'Cargando...' : ''}
        </p>
        <div
          ref={loadingRef}
          className="scroll-container__reference">
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-container__not-content">
      No hay contenido
    </div>
  );
}
