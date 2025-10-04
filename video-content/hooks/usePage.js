"use client";

import { useEffect, useState } from "react";

export default function usePage({ root = null, threshold = 0.75 }) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { root, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, root, threshold]);

  return { inView, setNode };
}
