"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onActivate: () => void) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI_CODE[index]) {
        const next = index + 1;
        if (next === KONAMI_CODE.length) {
          onActivate();
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(key === KONAMI_CODE[0] ? 1 : 0);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onActivate]);
}
