import React from "react";

import { Formik, Field } from "formik";
import CustomInput from "./FormElements/CustomInput";
import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

import styles from "./Forms.styles";
import validationSchemas from "../../utils/validationSchemas";

const ChangeAccountDescForm = () => {
  return (
    <Surface style={privateStyles.form}>
      <Text style={styles.header}>Dodaj lub zmień swój Opis</Text>

      <Formik
        initialValues={{
          description: "",
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchemas.ChangeDescriptionSchema}
      >
        {(props) => (
          <>
            <Text style={privateStyles.text}>
              {props.values.description || "Napisz coś o sobie :)"}
            </Text>

            <Field
              name="description"
              component={CustomInput}
              label="Opis"
              setFieldValue={props.setFieldValue}
              multiline
            />

            <Button mode="contained" onPress={props.handleSubmit}>
              Zmień opis
            </Button>
          </>
        )}
      </Formik>
    </Surface>
  );
};

const privateStyles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default ChangeAccountDescForm;
