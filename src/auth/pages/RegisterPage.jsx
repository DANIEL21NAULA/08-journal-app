import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout';
import { startCreateUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidation = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @.'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es requerido.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    passwordValid,
    emailValid,
  } = useForm(formData, formValidation);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!isFormValid) return;

    dispatch(startCreateUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate_faster"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="John For"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            {
              (errorMessage != null) && (
                <Grid
                  item
                  xs={12}
                >
                  <Alert severity="error">
                    {errorMessage}
                  </Alert>
                </Grid>
              )
            }
            <Grid
              item
              xs={12}
            >
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="end"
          >
            <Typography sx={{ mr: 1 }}>
              ya tienes cuenta?
            </Typography>
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/login"
            >
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
