import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// import { Google } from '@mui/icons-material';

import Google from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/* import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'; */
import { AuthLayout } from '../layout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const { email, password, onInputChange } = useForm(formData);
  const dispatch = useDispatch();

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={handleSubmitLogin}
        className="animate__animated animate__fadeIn animate_faster"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
              inputProps={{ 'data-testid': 'password' }}
              value={password}
              onChange={onInputChange}
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
              sm={6}
            >
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                aria-label="google-btn"
                onClick={handleGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="end"
          >
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/register"
            >
              Crear otra cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
