import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ServerClient from "../../clients/serverClient";

import { Text } from "react-native";
import { Surface, Button } from "react-native-paper";
import { Formik, Field } from "formik";
import CustomInput from "./FormElements/CustomInput";
import ActivityIndicator from "../Generic/ActivityIndicator";

import styles from "./Forms.styles";
import { NavigationProps, RegisterFormState } from "../../types/types";
import validationSchemas from "../../utils/validationSchemas";
import { removeWhiteSpaces } from "../../utils/transformers";

interface Props {
  changeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
} as RegisterFormState;

const RegisterForm: React.FC<Props> = ({ changeForm }) => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    values: RegisterFormState,
    { resetForm }: { resetForm: Function }
  ) => {
    const clearValues = removeWhiteSpaces(values);

    const userObject = {
      ...clearValues,
    };

    delete userObject.confirmPassword;

    setLoading(true);

    const data = await ServerClient.registerUser(userObject);

    if (!data.success) {
      alert(data.message);
    } else {
      alert("Successfully registered");
      resetForm();
      navigation.navigate("Home");
    }

    setLoading(false);
  };

  return (
    <Surface style={styles.form}>
      <Text style={styles.header}>Załóż konto</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas.RegisterSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <>
            <Field
              component={CustomInput}
              name="username"
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

            <Field
              component={CustomInput}
              name="confirmPassword"
              label="Potwierdź hasło"
              setFieldValue={props.setFieldValue}
              isSecure={true}
            />

            <Text style={styles.link} onPress={() => changeForm(true)}>
              Masz już konto? Zaloguj się.
            </Text>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                onPress={() => {
                  props.handleSubmit();
                }}
                mode="contained"
              >
                Zarejestruj się
              </Button>
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default RegisterForm;
