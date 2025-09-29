import { useCallback, useEffect, useRef, useState } from "react";

export default function usePage(options) {
  const [inView, setInView] = useState(false);
  const nodeRef = useRef(null);
  const observerRef = useRef(null);

  const setNode = useCallback((node) => {
    nodeRef.current = node;
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.75, ...options }
    );

    const node = nodeRef.current;
    if (node) observerRef.current.observe(node);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [options]);

  return { inView, setNode };
}
