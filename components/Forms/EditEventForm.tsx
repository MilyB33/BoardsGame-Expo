import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Button } from "react-native";
import { Surface } from "react-native-paper";
import { Formik, Field } from "formik";
import { useRoute, RouteProp } from "@react-navigation/native";
import CustomInput from "./CustomInput";
import ActivityIndicator from "../Generic/ActivityIndicator";

import styles from "./Forms.styles";
import { RootStackParamList, EventFormState } from "../../types/types";
import { transformFormValues } from "../../utils/transformers";
import validationSchemas from "../../utils/validationSchemas";

type EditEventRouteProp = RouteProp<RootStackParamList, "EditEvent">;

const AddEventForm = () => {
  const { editEvent } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute<EditEventRouteProp>();
  const navigation = useNavigation();

  const { event } = route.params;

  const initialValues: EventFormState = {
    location: event.location,
    description: event.description,
    date: {
      day: Number(event.date.split("-")[2]),
      month: Number(event.date.split("-")[1]),
      year: Number(event.date.split("-")[0]),
    },
    time: {
      hour: Number(event.time.split(":")[0]),
      minute: Number(event.time.split(":")[1]),
    },
    game: event.game,
    town: event.town,
    maxPlayers: Number(event.maxPlayers),
  };

  const submitForm = async (values: EventFormState) => {
    setIsLoading(true);

    const transformedValues = transformFormValues(values);

    const isAdded = await editEvent(transformedValues, event._id);

    setIsLoading(false);

    if (isAdded) navigation.goBack();
  };

  return (
    <Surface style={styles.form}>
      <Text style={styles.header}>Edytuj Wydarzenie</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas.EventSchema}
        onSubmit={submitForm}
      >
        {(props) => (
          <>
            <Field
              component={CustomInput}
              name="location"
              label="Lokalizacja"
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
                keyboardType="numeric"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="date.year"
                keyboardType="numeric"
                setFieldValue={props.setFieldValue}
                isNumeric
              />
            </View>

            <Text style={styles.label}>Godzina: </Text>
            <View style={styles.group}>
              <Field
                component={CustomInput}
                name="time.hour"
                keyboardType="numeric"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="time.minute"
                keyboardType="numeric"
                setFieldValue={props.setFieldValue}
                isNumeric
              />
            </View>

            <Field
              component={CustomInput}
              name="game"
              label="Gra"
              placeholder="Nazwa gry"
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
              keyboardType="numeric"
              setFieldValue={props.setFieldValue}
              isNumeric
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button
                title="Zaktualizuj"
                onPress={() => props.handleSubmit()}
              />
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default AddEventForm;
