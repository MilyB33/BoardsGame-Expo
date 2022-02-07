import React from "react";

import ActivityIndicator from "../components/Generic/ActivityIndicator";

// This component is used to add loading to single button

const WithLoading = (Component: any) => {
  return (props: any) => {
    const [loading, setLoading] = React.useState(false);

    const handlePress = async () => {
      setLoading(true);

      await props.onPress();
    };

    return (
      <>
        {loading ? (
          <ActivityIndicator />
        ) : (
          // to get more flexibility, we can pass onPress as a prop to the component but we need to set up loading state
          <Component {...props} onPress={handlePress} />
        )}
      </>
    );
  };
};

export default WithLoading;
