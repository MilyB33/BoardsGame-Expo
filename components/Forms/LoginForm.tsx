import React, { useContext } from 'react';

import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import styles from './Forms.styles';
import { UserContext } from '../../context/userContext';

import { useNavigation } from '@react-navigation/native';
import validationSchemas from '../../utils/validationSchemas';
import { NavigationProps } from '../../types/types';
import Field from './Field';

interface Props {
  changeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ changeForm }) => {
  const { login, user } = useContext(UserContext);
  const navigation = useNavigation<NavigationProps>();

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: Function }
  ) => {
    const isLogged = await login(values);

    if (isLogged) {
      resetForm();
      navigation.goBack();
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.header}>Zaloguj się</Text>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchemas.LoginSchema}
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

            <Text
              style={styles.link}
              onPress={() => changeForm(false)}
            >
              Nie masz jeszcze konta? Załóz je od razu.
            </Text>
            {user.loading ? (
              <ActivityIndicator size="large" color="white" />
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

export default LoginForm;
