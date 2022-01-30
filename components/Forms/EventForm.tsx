import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Text } from "react-native";
import { Surface, Button } from "react-native-paper";
import { Formik, Field } from "formik";
import CustomInput from "./FormElements/CustomInput";
import CustomSwitch from "./FormElements/CustomSwitch";
import ActivityIndicator from "../Generic/ActivityIndicator";
import DateField from "./FormElements/Date";
import TimeField from "./FormElements/Time";
import WithDateTimePicker from "../../hoc/withDateTimePicker";

import styles from "./Forms.styles";
import { EventFormState, P } from "../../types/types";
import validationSchemas from "../../utils/validationSchemas";
import { transformFormValues } from "../../utils/transformers";

interface Props {
  initialValues: EventFormState;
  onSubmit: (values: any) => P<boolean>;
  buttonText: string;
}

const EventForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  buttonText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const submitForm = async (values: EventFormState) => {
    setIsLoading(true);

    const transformedValues = transformFormValues(values);

    const isAdded = await onSubmit(transformedValues);

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

            <Field
              component={WithDateTimePicker(DateField)}
              name="date"
              label="Data"
              setFieldValue={props.setFieldValue}
              mode="date"
              buttonText="Wybierz datę"
            />

            <Field
              component={WithDateTimePicker(TimeField)}
              name="time"
              label="Godzina"
              setFieldValue={props.setFieldValue}
              mode="time"
              buttonText="Wybierz godzinę"
            />

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

            <Field
              component={CustomSwitch}
              name="isPrivate"
              label="Tylko dla znajomych"
              setFieldValue={props.setFieldValue}
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button onPress={() => props.handleSubmit()} mode="contained">
                {buttonText}
              </Button>
            )}
          </>
        )}
      </Formik>
    </Surface>
  );
};

export default EventForm;
