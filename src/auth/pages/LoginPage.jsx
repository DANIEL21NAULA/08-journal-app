import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AuthLayout } from '../layout';
import { useForm } from '../../hooks';

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm({
    email: 'nauladanielj@gmail.com',
    password: '123456',
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

  const handleGoogleSignIn = () => {
    dispatch
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
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
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
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
                variant="contained"
                fullWidth
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
