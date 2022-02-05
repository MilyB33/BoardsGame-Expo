import { useState } from "react";

// This hook is used to set multiple boolean states at once.

const useBooleanState = (elements: string[]) => {
  const [state, setLoadingState] = useState(
    elements.reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const setToTrue = (element: string) => {
    setLoadingState((prevState) => ({
      ...prevState,
      [element]: true,
    }));
  };

  const setToFalse = (element: string) => {
    setLoadingState((prevState) => ({
      ...prevState,
      [element]: false,
    }));
  };

  return { state, setToTrue, setToFalse };
};

export default useBooleanState;
