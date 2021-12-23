import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const EventSchema = Yup.object().shape({
  location: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(2000, 'Too Long!')
    .required('Required'),
  date: Yup.object().shape({
    day: Yup.number()
      .min(1, 'Too Short!')
      .max(31, 'Too Long!')
      .required('Required'),
    month: Yup.number()
      .min(1, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
    year: Yup.number()
      .min(2020, 'Too Short!')
      .max(2050, 'Too Long!')
      .required('Required'),
  }),
  time: Yup.object().shape({
    hour: Yup.number()
      .min(0, 'Too Short!')
      .max(23, 'Too Long!')
      .required('Required'),
    minute: Yup.number()
      .min(0, 'Too Short!')
      .max(59, 'Too Long!')
      .required('Required'),
  }),
  game: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  town: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  maxPlayers: Yup.number()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default { LoginSchema, RegisterSchema, EventSchema };
