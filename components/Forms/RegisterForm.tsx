import React, { useState } from 'react';

import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import styles from './Forms.styles';

import ServerClient from '../../clients/serverClient';
import { useNavigation } from '@react-navigation/native';
import validationSchemas from '../../utils/validationSchemas';

import { NavigationProps } from '../../types/types';
import Field from './Field';

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
      confirmPassword: null,
    };

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
    <View style={styles.form}>
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
              label="Nazwa użytkownika"
              onChangeCallback={props.handleChange('username')}
              value={props.values.username}
              placeholder="Nazwa użytkownika"
              error={props.errors.username}
              touched={props.touched.username}
            />

            <Field
              label="Hasło"
              onChangeCallback={props.handleChange('password')}
              value={props.values.password}
              placeholder="Hasło"
              error={props.errors.password}
              touched={props.touched.password}
              isSecure={true}
            />

            <Field
              label="Potwierdź hasło"
              onChangeCallback={props.handleChange('confirmPassword')}
              value={props.values.confirmPassword}
              placeholder="Potwierdź hasło"
              error={props.errors.confirmPassword}
              touched={props.touched.confirmPassword}
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
                title="Zaloguj"
                onPress={() => {
                  props.handleSubmit();
                }}
              />
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default RegisterForm;
