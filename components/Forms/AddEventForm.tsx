import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Formik } from 'formik';

import {
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

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
              <Text style={styles.label}>Lokalizacja: </Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('location')}
                value={props.values.location}
                placeholder="Lokalizacja"
              />
              {props.errors.location && props.touched.location && (
                <Text style={styles.errorField}>
                  {props.errors.location}
                </Text>
              )}

              <Text style={styles.label}>Opis: </Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('description')}
                value={props.values.description}
                placeholder="Opis"
              />
              {props.errors.description &&
                props.touched.description && (
                  <Text style={styles.errorField}>
                    {props.errors.description}
                  </Text>
                )}

              <Text style={styles.label}>Data: </Text>
              <View style={styles.group}>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('date.day')}
                    value={props.values.date.day.toString()}
                    placeholder="Dzień"
                    keyboardType="numeric"
                  />
                  {props.errors.date?.day &&
                    props.touched.date?.day && (
                      <Text style={styles.errorField}>
                        {props.errors.date.day}
                      </Text>
                    )}
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('date.month')}
                    value={props.values.date.month.toString()}
                    placeholder="Miesiąc"
                    keyboardType="numeric"
                  />
                  {props.errors.date?.month &&
                    props.touched.date?.month && (
                      <Text style={styles.errorField}>
                        {props.errors.date.month}
                      </Text>
                    )}
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('date.year')}
                    value={props.values.date.year.toString()}
                    placeholder="Rok"
                    keyboardType="numeric"
                  />
                  {props.errors.date?.year &&
                    props.touched.date?.year && (
                      <Text style={styles.errorField}>
                        {props.errors.date.year}
                      </Text>
                    )}
                </View>
              </View>

              <Text style={styles.label}>Godzina: </Text>
              <View style={styles.group}>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('time.hour')}
                    value={props.values.time.hour.toString()}
                    placeholder="Godzina"
                    keyboardType="numeric"
                  />
                  {props.errors.time?.hour &&
                    props.touched.time?.hour && (
                      <Text style={styles.errorField}>
                        {props.errors.time.hour}
                      </Text>
                    )}
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('time.minute')}
                    value={props.values.time.minute.toString()}
                    placeholder="Minuty"
                    keyboardType="numeric"
                  />
                  {props.errors.time?.minute &&
                    props.touched.time?.minute && (
                      <Text style={styles.errorField}>
                        {props.errors.time.minute}
                      </Text>
                    )}
                </View>
              </View>

              <Text style={styles.label}>Gra: </Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('game')}
                value={props.values.game}
                placeholder="Gra"
              />
              {props.errors.game && props.touched.game && (
                <Text style={styles.errorField}>
                  {props.errors.game}
                </Text>
              )}

              <Text style={styles.label}>Miasto: </Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('town')}
                value={props.values.town}
                placeholder="Miasto"
              />
              {props.errors.town && props.touched.town && (
                <Text style={styles.errorField}>
                  {props.errors.town}
                </Text>
              )}

              <Text style={styles.label}>
                Maksymalna liczba graczy:
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('maxPlayers')}
                value={props.values.maxPlayers.toString()}
                keyboardType="numeric"
                placeholder="Maksymalna liczba graczy"
              />
              {props.errors.maxPlayers &&
                props.touched.maxPlayers && (
                  <Text style={styles.errorField}>
                    {props.errors.maxPlayers}
                  </Text>
                )}

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
