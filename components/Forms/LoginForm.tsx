import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../storage/App/hooks";
import { login } from "../../storage/Slices/userSlice";

import { Surface, Button } from "react-native-paper";
import { Text } from "react-native";
import { Formik, Field } from "formik";
import CustomInput from "./FormElements/CustomInput";
import ActivityIndicator from "../Generic/ActivityIndicator";

import styles from "./Forms.styles";
import {
  NavigationProps,
  LoginFormState,
  DispatchType,
} from "../../types/types";
import validationSchemas from "../../utils/validationSchemas";
import { removeWhiteSpaces } from "../../utils/transformers";

interface PropTypes {
  changeForm: DispatchType<boolean>;
}

const initialValues = {
  username: "",
  password: "",
} as LoginFormState;

const LoginForm = ({ changeForm }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const navigation = useNavigation<NavigationProps>();

  const onSubmit = async (
    values: LoginFormState,
    { resetForm }: { resetForm: Function }
  ) => {
    const clearedValues = removeWhiteSpaces(values);

    const isLogged = await dispatch(login(clearedValues)).then(
      (res) => res.payload
    );

    if (isLogged) {
      resetForm();
      navigation.goBack();
    }
  };

  return (
    <Surface style={styles.form}>
      <Text style={styles.header}>Zaloguj się</Text>

      <Formik
        initialValues={initialValues}
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
            {loading === "loading" ? (
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
