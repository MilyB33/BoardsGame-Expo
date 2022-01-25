import React, { useState } from "react";

interface State {
  [key: string]: boolean;
}

const useOptions = (initialState: State) => {
  const [options, setOptions] = useState<State>(initialState);

  const toggleOption = (option: string) => {
    const newOptions = {} as State;

    for (const key in options) {
      if (key !== option) {
        newOptions[key] = false;
      }
    }

    setOptions({
      ...newOptions,
      [option]: true,
    });
  };

  return { options, toggleOption };
};

export default useOptions;

// This should be in component which wants to render this -- it's not provides rerendering

//   const renderOption = () => {
//     for (const [key, value] of Object.entries(options)) {
//       if (value.visible) {
//         return <value.component />;
//       }
//     }
//   };

// this is the advanced method

// interface State {
//   [key: string]: {
//     visible: boolean;
//     component: React.FC<any>;
//     props?: {
//       [key: string]: any;
//     };
//   };
// }

// const [options, setOptions] = useState<State>(initialState);

// const toggleOption = (option: string) => {
//   const newOptions = {} as State;

//   for (const key in options) {
//     if (key !== option) {
//       newOptions[key] = {
//         ...options[key],
//         visible: false,
//       };
//     }
//   }

//   setOptions({
//     ...newOptions,
//     [option]: {
//       ...options[option],
//       visible: true,
//     },
//   });
// };

// const renderComponent = () => {
//   for (const [key, value] of Object.entries(options)) {
//     if (value.visible) {
//       return <value.component {...value.props} />;
//     }
//   }
// };

// return { options, toggleOption, renderComponent };
