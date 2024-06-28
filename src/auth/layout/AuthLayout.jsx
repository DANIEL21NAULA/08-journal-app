import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import 'animate.css';

export const AuthLayout = ({ children, title }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
  >
    <Grid
      item
      className="box-shadow"
      xs={12}
      sx={{
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 2,
        width: { md: 450 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 1 }}
      >
        { title }
      </Typography>
      {/* Children */}
      { children }
    </Grid>
  </Grid>
);

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};
