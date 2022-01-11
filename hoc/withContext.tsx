import React from 'react';

interface Props {
  children: React.ReactNode;
}

// Check the Context Provider types
const WithContext = (
  Component: React.FC,
  ContextProvider: React.FC<Props>
) => {
  return (props: any) => {
    return (
      <ContextProvider>
        <Component {...props} />
      </ContextProvider>
    );
  };
};

export default WithContext;
