import { useState, useEffect } from 'react';

export default function useIntersection(ref, options) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );

    const element = ref.current;

    if (!element) return;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    }
  }, [ref, options]);

  return isIntersecting;
}