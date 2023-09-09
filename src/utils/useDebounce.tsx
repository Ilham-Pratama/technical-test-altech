import {useEffect, useState} from 'react';

function useDebounce<T>(value: T, delay: number = 300) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return state;
}

export default useDebounce;
