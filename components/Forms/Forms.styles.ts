import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 25,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 15,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
  },
  errorField: {
    color: '#fff',
    backgroundColor: '#e63946',
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
    margin: 10,
    maxWidth: '100%',
  },
  group: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default styles;
