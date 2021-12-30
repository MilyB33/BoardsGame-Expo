import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';

const ChangePasswordForm = () => {
  return (
    <Surface style={styles.form}>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
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
            />
            <Field
              name="newPassword"
              component={CustomInput}
              label="Nowe hasło"
              placeholder="Nowe hasło"
              secureTextEntry
              setFieldValue={props.setFieldValue}
            />
            <Field
              name="confirmPassword"
              component={CustomInput}
              label="Potwierdź hasło"
              placeholder="Potwierdź hasło"
              secureTextEntry
              setFieldValue={props.setFieldValue}
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

const styles = StyleSheet.create({
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
