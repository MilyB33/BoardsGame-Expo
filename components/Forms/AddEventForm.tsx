import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Formik, Field } from 'formik';
import { EventFormState } from '../../types/types';
import { transformFormValues } from '../../utils/transformers';
import CustomInput from './CustomInput';
import { Surface } from 'react-native-paper';

import { View, Text, Button, ActivityIndicator } from 'react-native';

import validationSchemas from '../../utils/validationSchemas';

import styles from './Forms.styles';

const TODAYS_DATE = new Date();

const initialValues: EventFormState = {
  location: '',
  description: '',
  date: {
    day: TODAYS_DATE.getDate(),
    month: TODAYS_DATE.getMonth() + 1,
    year: TODAYS_DATE.getFullYear(),
  },
  time: {
    hour: 0,
    minute: 0,
  },
  game: '',
  town: '',
  maxPlayers: 2,
};

const AddEventForm = () => {
  const { addEvent } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (
    values: EventFormState,
    { resetForm }: { resetForm: Function }
  ) => {
    setIsLoading(true);

    const transformedValues = transformFormValues(values);

    const isAdded = await addEvent(transformedValues);

    if (isAdded) {
      resetForm();
    }

    setIsLoading(false);
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
              placeholder="Dodaj lokalizację"
              setFieldValue={props.setFieldValue}
            />

            <Field
              component={CustomInput}
              name="description"
              label="Opis"
              placeholder="Dodaj opis"
              setFieldValue={props.setFieldValue}
            />

            <Text style={styles.label}>Data: </Text>
            <View style={styles.group}>
              <Field
                component={CustomInput}
                name="date.day"
                placeholder="Dzień"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="date.month"
                placeholder="Miesiąc"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="date.year"
                placeholder="Rok"
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
                placeholder="Godzina"
                keyboardType="number-pad"
                setFieldValue={props.setFieldValue}
                isNumeric
              />

              <Field
                component={CustomInput}
                name="time.minute"
                placeholder="Minuty"
                keyboardType="number-pad"
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
              placeholder="Miasto"
              setFieldValue={props.setFieldValue}
            />

            <Field
              component={CustomInput}
              name="maxPlayers"
              label="Maksymalna liczba graczy"
              placeholder="Maksymalna liczba graczy"
              keyboardType="number-pad"
              setFieldValue={props.setFieldValue}
              isNumeric
            />

            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Button
                title="Dodaj wydarzenie"
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
