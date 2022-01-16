import React, { useState } from "react";

interface State {
  [key: string]: {
    visible: boolean;
    component: React.FC<any>;
    props?: {
      [key: string]: any;
    };
  };
}

const useOptions = (initialState: State) => {
  const [options, setOptions] = useState<State>(initialState);

  const toggleOption = (option: string) => {
    const newOptions = {} as State;

    for (const key in options) {
      if (key !== option) {
        newOptions[key] = {
          ...options[key],
          visible: false,
        };
      }
    }

    setOptions({
      ...newOptions,
      [option]: {
        ...options[option],
        visible: true,
      },
    });
  };

  const renderComponent = () => {
    for (const [key, value] of Object.entries(options)) {
      if (value.visible) {
        return <value.component {...value.props} />;
      }
    }
  };

  return { options, toggleOption, renderComponent };
};

export default useOptions;
