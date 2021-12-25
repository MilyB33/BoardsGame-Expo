import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Formik } from 'formik';

import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Field from './Field';

import validationSchemas from '../../utils/validationSchemas';

import styles from './Forms.styles';

interface State {
  location: string;
  description: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  time: {
    hour: number;
    minute: number;
  };
  game: string;
  town: string;
  maxPlayers: number;
}

const TODAYS_DATE = new Date();

const initialValues: State = {
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
  maxPlayers: 1,
};

const AddEventForm = () => {
  const { addEvent } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (
    values: State,
    { resetForm }: { resetForm: Function }
  ) => {
    setIsLoading(true);
    console.log(values);

    const transformedValues = {
      ...values,
      date: `${values.date.year}-${values.date.month}-${values.date.day}`,
      time: `${values.time.hour}:${values.time.minute}`,
      maxPlayers: Number(values.maxPlayers), // TODO: fix this
    };

    const isAdded = await addEvent(transformedValues);

    if (isAdded) {
      resetForm();
    }

    setIsLoading(false);
  };

  return (
    <View style={[styles.form, additionalStyles.form]}>
      <Text style={styles.header}>Dodaj wydarzenie</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas.EventSchema}
        onSubmit={submitForm}
      >
        {(props) => (
          <>
            <View>
              <Field
                label="Lokalizacja"
                onChangeCallback={props.handleChange('location')}
                value={props.values.location}
                placeholder="Dodaj lokalizację"
                error={props.errors.location}
                touched={props.touched.location}
              />

              <Field
                label="Opis"
                onChangeCallback={props.handleChange('description')}
                value={props.values.description}
                placeholder="Dodaj opis"
                error={props.errors.description}
                touched={props.touched.description}
              />

              <Text style={styles.label}>Data: </Text>
              <View style={styles.group}>
                <Field
                  onChangeCallback={props.handleChange('date.day')}
                  value={props.values.date.day}
                  placeholder="Dzień"
                  error={props.errors.date?.day}
                  touched={props.touched.date?.day}
                  keyboardType="numeric"
                />

                <Field
                  onChangeCallback={props.handleChange('date.month')}
                  value={props.values.date.month}
                  placeholder="Miesiąc"
                  error={props.errors.date?.month}
                  touched={props.touched.date?.month}
                  keyboardType="numeric"
                />

                <Field
                  onChangeCallback={props.handleChange('date.year')}
                  value={props.values.date.year}
                  placeholder="Rok"
                  error={props.errors.date?.year}
                  touched={props.touched.date?.year}
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.label}>Godzina: </Text>
              <View style={styles.group}>
                <Field
                  onChangeCallback={props.handleChange('time.hour')}
                  value={props.values.time.hour}
                  placeholder="Godzina"
                  error={props.errors.time?.hour}
                  touched={props.touched.time?.hour}
                  keyboardType="numeric"
                />

                <Field
                  onChangeCallback={props.handleChange('time.minute')}
                  value={props.values.time.minute}
                  placeholder="Minuty"
                  error={props.errors.time?.minute}
                  touched={props.touched.time?.minute}
                  keyboardType="numeric"
                />
              </View>

              <Field
                label="Gra"
                onChangeCallback={props.handleChange('game')}
                value={props.values.game}
                placeholder="Nazwa gry"
                error={props.errors.game}
                touched={props.touched.game}
              />

              <Field
                label="Miasto"
                onChangeCallback={props.handleChange('town')}
                value={props.values.town}
                placeholder="Miasto"
                error={props.errors.town}
                touched={props.touched.town}
              />

              <Field
                label="Maksymalna liczba graczy"
                onChangeCallback={props.handleChange('maxPlayers')}
                value={props.values.maxPlayers}
                placeholder="Maksymalna liczba graczy"
                error={props.errors.maxPlayers}
                touched={props.touched.maxPlayers}
                keyboardType="numeric"
              />

              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Button
                  title="Dodaj wydarzenie"
                  onPress={() => props.handleSubmit()}
                />
              )}
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  form: {
    width: '90%',
    paddingHorizontal: 30,
  },
});

export default AddEventForm;
