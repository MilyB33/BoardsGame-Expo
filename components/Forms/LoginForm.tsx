import React, { useContext } from 'react';

import { View, TextInput, Text, Button } from 'react-native';
import { Formik } from 'formik';
import styles from './Forms.styles';
import { AuthContext } from '../../context/authContext';

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

const LoginForm: React.FC<Props> = ({ changeForm }) => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: Function }
  ) => {
    // Tutaj zapytać bo nie wiem dlaczego ale musze uzywac Promise<boolean>
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
            <Text
              style={styles.link}
              onPress={() => changeForm(false)}
            >
              Nie masz jeszcze konta? Załóz je od razu.
            </Text>
            <Button
              title="Zaloguj"
              onPress={() => {
                props.handleSubmit();
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
