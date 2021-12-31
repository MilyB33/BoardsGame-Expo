import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

import { StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';

import validationSchemas from '../../utils/validationSchemas';

import styles from './Forms.styles';

const ChangePasswordForm = () => {
  const { updatePassword } = useContext(UserContext);

  return (
    <Surface style={privateStyles.form}>
      <Text style={styles.header}>Dodaj wydarzenie</Text>

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          updatePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validationSchema={validationSchemas.ChangePasswordSchema}
      >
        {(props) => (
          <>
            <Field
              name="oldPassword"
              component={CustomInput}
              label="Stare hasło"
              placeholder="Stare hasło"
              secureTextEntry
              setFieldValue={props.setFieldValue}
              isSecure
            />
            <Field
              name="newPassword"
              component={CustomInput}
              label="Nowe hasło"
              placeholder="Nowe hasło"
              secureTextEntry
              setFieldValue={props.setFieldValue}
              isSecure
            />
            <Field
              name="confirmPassword"
              component={CustomInput}
              label="Potwierdź hasło"
              placeholder="Potwierdź hasło"
              secureTextEntry
              setFieldValue={props.setFieldValue}
              isSecure
            />

            <Button mode="contained" onPress={props.handleSubmit}>
              Zmień hasło
            </Button>
          </>
        )}
      </Formik>
    </Surface>
  );
};

const privateStyles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
});

export default ChangePasswordForm;
