import { useCallback } from 'react';

type NextValue = string | number | boolean;

const useDebounce = (delay: number, callback: Function) => {
  const debounce = (func: Function, delay: number) => {
    let timeoutId: any;

    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedValue = useCallback(
    debounce((nextValue: NextValue) => callback(nextValue), delay),
    []
  );

  return { debouncedValue };
};

export default useDebounce;
