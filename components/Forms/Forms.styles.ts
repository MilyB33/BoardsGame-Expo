import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    padding: 25,
    marginVertical: 10,
    borderRadius: 10,
    minWidth: '90%',
    elevation: 4,
  },
  input: {
    margin: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {},
  errorField: {
    backgroundColor: '#e63946',
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  link: {
    textDecorationLine: 'underline',
    margin: 10,
    marginBottom: 30,
    maxWidth: '100%',
    textAlign: 'center',
  },
  group: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  invalid: {
    borderColor: '#e63946',
  },
});

export default styles;
