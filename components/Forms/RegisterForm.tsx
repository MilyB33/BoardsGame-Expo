import React, { useContext } from 'react';

import { View, TextInput, Text, Button } from 'react-native';
import { Formik } from 'formik';
import styles from './Forms.styles';
import { AuthContext } from '../../context/authContext';

import ServerClient from '../../clients/serverClient';
import useStorage from '../../hooks/useStorage';
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
  const { storeData } = useStorage();
  const { login, user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: Function }
  ) => {
    const data = await ServerClient.loginUser(values);
    if (!data.success) {
      alert(data.message);
    } else {
      await storeData(data.data.user.token);
      const { _id, username } = data.data.user;
      login({
        id: _id,
        username,
        isAuthenticated: true,
      });
      resetForm();
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.header}>Załóż konto</Text>

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
              onPress={() => changeForm(true)}
            >
              Masz już konto? Zaloguj się.
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

export default RegisterForm;
