import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  return (
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
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            notes.map(({
              id,
              title,
              body,
              date,
              imageUrls,
            }) => (
              <SideBarItem
                key={id}
                id={id}
                title={title}
                body={body}
                date={date}
                imageUrls={imageUrls}
              />
            ))
          }
        </List>
      </Drawer>
    </Box>
  );
};

SideBar.propTypes = {
  // eslint-disable-next-line react/require-default-props
  drawerWidth: PropTypes.number,
};
