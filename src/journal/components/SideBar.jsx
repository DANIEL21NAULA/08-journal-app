import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';

export const SideBar = ({ drawerWidth = 240 }) => (
  <Box
    component="nav"
    sx={{
      width: { sm: drawerWidth },
      flexShrink: { sm: 0 },
    }}
  >
    <Drawer
      variant="permanent"
      open
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          Daniel Naula
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          ['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
            <ListItem
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid>
                  <ListItemText primary={text} />
                  <ListItemText secondary="Lorem laborum duis fugiat" />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  </Box>
);

SideBar.propTypes = {
  // eslint-disable-next-line react/require-default-props
  drawerWidth: PropTypes.number,
};
