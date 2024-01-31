import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDobounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDobounceValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
