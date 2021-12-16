import React, { useState } from 'react';

import {
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import styles from './Forms.styles';

import ServerClient from '../../clients/serverClient';
import { useNavigation } from '@react-navigation/native';
import validationSchemas from '../../utils/validationSchemas';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

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
            <View>
              <Text style={styles.label}>Nazwa użytkownika: </Text>
              <TextInput
                style={styles.input}
                placeholder="Nazwa użytkownika"
                autoCapitalize="none"
                onChangeText={props.handleChange('username')}
                value={props.values.username}
              />
              {props.errors.username && props.touched.username && (
                <Text style={styles.errorField}>
                  {props.errors.username}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>Hasło: </Text>
              <TextInput
                style={styles.input}
                placeholder="Hasło"
                autoCapitalize="none"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                secureTextEntry={true}
              />
              {props.errors.password && props.touched.password && (
                <Text style={styles.errorField}>
                  {props.errors.password}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>Potwierdź hasło: </Text>
              <TextInput
                style={styles.input}
                placeholder="Potwierdź hasło"
                autoCapitalize="none"
                onChangeText={props.handleChange('confirmPassword')}
                value={props.values.confirmPassword}
                secureTextEntry={true}
              />
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <Text style={styles.errorField}>
                    {props.errors.confirmPassword}
                  </Text>
                )}
            </View>
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
