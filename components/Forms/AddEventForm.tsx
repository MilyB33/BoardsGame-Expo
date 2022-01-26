import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";

import { View, Text } from "react-native";
import { Surface, Button } from "react-native-paper";
import { Formik, Field } from "formik";
import CustomInput from "./CustomInput";
import CustomSwitch from "./CustomSwitch";
import ActivityIndicator from "../Generic/ActivityIndicator";

import styles from "./Forms.styles";
import { EventFormState } from "../../types/types";
import validationSchemas from "../../utils/validationSchemas";
import { transformFormValues } from "../../utils/transformers";

const TODAYS_DATE = new Date();

const initialValues: EventFormState = {
  location: "",
  description: "",
  date: {
    day: TODAYS_DATE.getDate(),
    month: TODAYS_DATE.getMonth() + 1,
    year: TODAYS_DATE.getFullYear(),
  },
  time: {
    hour: 0,
    minute: 0,
  },
  game: "",
  town: "",
  maxPlayers: 2,
  // isPrivate: false,
};

const AddEventForm = () => {
  const { addEvent } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const submitForm = async (values: EventFormState) => {
    setIsLoading(true);

    const transformedValues = transformFormValues(values);

    const isAdded = await addEvent(transformedValues);

    setIsLoading(false);

    if (isAdded) navigation.goBack();
  };

  return (
    <Surface style={styles.form}>
      <Text style={styles.header}>Dodaj wydarzenie</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas.EventSchema}
        onSubmit={submitForm}
      >
        {(props) => (
          <>
            <Field
              component={CustomInput}
              label="Lokalizacja"
              name="location"
              setFieldValue={props.setFieldValue}
            />
            <Field
              component={CustomInput}
              name="description"
              label="Opis"
              setFieldValue={props.setFieldValue}
            />
            <Text style={styles.label}>Data: </Text>
            <View style={styles.group}>
              <Field
                component={CustomInput}
                name="date.day"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="date.month"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="date.year"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />
            </View>
            <Text style={styles.label}>Godzina: </Text>
            <View style={styles.group}>
              <Field
                component={CustomInput}
                name="time.hour"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="time.minute"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />
            </View>
            <Field
              component={CustomInput}
              name="game"
              label="Gra"
              setFieldValue={props.setFieldValue}
            />
            <Field
              component={CustomInput}
              name="town"
              label="Miasto"
              setFieldValue={props.setFieldValue}
            />
            <Field
              component={CustomInput}
              name="maxPlayers"
              label="Maksymalna liczba graczy"
              keyboardType="number-pad"
              setFieldValue={props.setFieldValue}
              isNumeric
            />

            {/* <Field
              component={CustomSwitch}
              name="isPrivate"
              label="Tylko dla znajomych"
              setFieldValue={props.setFieldValue}
            /> */}

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button onPress={() => props.handleSubmit()} mode="contained">
                Dodaj wydarzenie
              </Button>
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default AddEventForm;
