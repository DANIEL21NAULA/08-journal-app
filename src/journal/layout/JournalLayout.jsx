import { Box, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import { Navbar, SideBar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => (
  <Box
    sx={{ display: 'flex' }}
    className="animate__animated animate__fadeIn animate_faster"
  >
    {/* Navbar */}
    <Navbar drawerWidth={drawerWidth} />
    {/* Sidebarz */}
    <SideBar drawerWidth={drawerWidth} />
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
      {/* Toolbar */}
      <Toolbar />
      { children }
    </Box>
  </Box>
);

JournalLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
