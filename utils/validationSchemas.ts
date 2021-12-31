import * as Yup from 'yup';

const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const minLog = (min: number, label: string) =>
  `${label} must be at least ${min} characters`;

const maxLog = (max: number, label: string) =>
  `${label} must be less than ${max} characters`;

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, minLog(3, 'Username'))
    .max(50, maxLog(50, 'Username'))
    .required('Username is required'),
  password: Yup.string()
    .min(8, minLog(8, 'Password'))
    .max(50, maxLog(50, 'Password'))
    .required('Required'),
});

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, minLog(3, 'Username'))
    .max(50, maxLog(50, 'Username'))
    .required('Required'),
  password: Yup.string()
    .min(8, minLog(4, 'Password'))
    .max(50, maxLog(50, 'Password'))
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
    )
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
      .max(31, 'Too Big!')
      .required('Required'),
    month: Yup.number()
      .min(1, 'Too Small!')
      .max(12, 'Too Big!')
      .required('Required'),
    year: Yup.number()
      .min(2020, 'Too Small!')
      .max(2050, 'Too Big!')
      .required('Required'),
  }),
  time: Yup.object().shape({
    hour: Yup.number()
      .min(0, 'Too Small!')
      .max(23, 'Too Big!')
      .required('Required'),
    minute: Yup.number()
      .min(0, 'Too Small!')
      .max(59, 'Too Big!')
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
    .min(2, 'Too Small!')
    .max(50, 'Too Big!')
    .required('Required'),
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, minLog(8, 'Old Password'))
    .max(50, maxLog(50, 'Old Password'))
    .required('Required'),
  newPassword: Yup.string()
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'Passwords cannot match'
    )
    .min(8, minLog(8, 'Password'))
    .max(50, maxLog(50, 'Password'))
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const ChangeDescriptionSchema = Yup.object().shape({
  description: Yup.string().max(150, 'Too Long!'),
});

export default {
  LoginSchema,
  RegisterSchema,
  EventSchema,
  ChangePasswordSchema,
  ChangeDescriptionSchema,
};
