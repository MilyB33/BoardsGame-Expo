import React, { useState } from 'react';

import { Text, Button, ActivityIndicator } from 'react-native';
import { Formik, Field } from 'formik';
import styles from './Forms.styles';

import ServerClient from '../../clients/serverClient';
import { useNavigation } from '@react-navigation/native';
import validationSchemas from '../../utils/validationSchemas';
import { Surface } from 'react-native-paper';

import { NavigationProps } from '../../types/types';
import CustomInput from './CustomInput';

interface Props {
  changeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<Props> = ({ changeForm }) => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: Function }
  ) => {
    const userObject = {
      ...values,
    };

    delete userObject.confirmPassword;

    setLoading(true);

    const data = await ServerClient.registerUser(userObject);

    if (!data.success) {
      alert(data.message);
    } else {
      alert('Successfully registered');
      resetForm();
      navigation.navigate('Home');
    }

    setLoading(false);
  };

  return (
    <Surface style={styles.form}>
      <Text style={styles.header}>Załóż konto</Text>

      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchemas.RegisterSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <>
            <Field
              component={CustomInput}
              name="username"
              label="Nazwa użytkownika"
              placeholder="Nazwa użytkownika"
              setFieldValue={props.setFieldValue}
            />

            <Field
              component={CustomInput}
              name="password"
              label="Hasło"
              placeholder="Hasło"
              setFieldValue={props.setFieldValue}
              isSecure
            />

            <Field
              component={CustomInput}
              name="confirmPassword"
              label="Potwierdź hasło"
              placeholder="Potwierdź hasło"
              setFieldValue={props.setFieldValue}
              isSecure={true}
            />

            <Text
              style={styles.link}
              onPress={() => changeForm(true)}
            >
              Masz już konto? Zaloguj się.
            </Text>
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <Button
                title="Zarejestruj się"
                onPress={() => {
                  props.handleSubmit();
                }}
              />
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default RegisterForm;
