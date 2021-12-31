import React from 'react';

import { View, StyleSheet } from 'react-native';
import ChangePasswordForm from '../Forms/ChangePasswordForm';
import ChangeAccountDesc from '../Forms/ChangeAccountDesc';

interface Props {
  options: {
    [key: string]: boolean;
  };
}

const FormWrapper: React.FC<Props> = ({ options }) => {
  const renderOption = () => {
    switch (true) {
      case options.description:
        return <ChangeAccountDesc />;
      case options.password:
        return <ChangePasswordForm />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderOption()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormWrapper;
