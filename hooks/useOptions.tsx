import React, { useState } from 'react';

interface State {
  [key: string]: any;
}

const useOptions = () => {
  const [options, setOptions] = useState<State>({
    description: false,
    password: false,
  });

  const toggleOption = (option: string) => {
    const newOptions = {} as State;

    for (const key in options) {
      if (key !== option) {
        newOptions[key] = false;
      }
    }

    setOptions({
      ...newOptions,
      [option]: !options[option],
    });
  };

  return { options, toggleOption };
};

export default useOptions;
