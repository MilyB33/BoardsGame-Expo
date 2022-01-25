import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";

import { Surface, Button } from "react-native-paper";
import { Text } from "react-native";
import { Formik, Field } from "formik";
import CustomInput from "./CustomInput";
import ActivityIndicator from "../Generic/ActivityIndicator";

import styles from "./Forms.styles";
import { NavigationProps } from "../../types/types";
import validationSchemas from "../../utils/validationSchemas";

interface Props {
  changeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ changeForm }) => {
  const { login, userState } = useContext(UserContext);
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
    <Surface style={styles.form}>
      <Text style={styles.header}>Zaloguj się</Text>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchemas.LoginSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <>
            <Field
              name="username"
              component={CustomInput}
              label="Nazwa użytkownika"
              setFieldValue={props.setFieldValue}
            />

            <Field
              component={CustomInput}
              name="password"
              label="Hasło"
              setFieldValue={props.setFieldValue}
              isSecure
            />

            <Text style={styles.link} onPress={() => changeForm(false)}>
              Nie masz jeszcze konta? Załóz je od razu.
            </Text>
            {userState.loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                mode="contained"
                onPress={() => {
                  props.handleSubmit();
                }}
              >
                Zaloguj
              </Button>
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default LoginForm;
