import { useEffect, useState } from 'react';
import { parseHash, type Route } from './route';

/** Current route, kept in sync with `location.hash` (back/forward and in-app `<a href="#/…">` links). */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
