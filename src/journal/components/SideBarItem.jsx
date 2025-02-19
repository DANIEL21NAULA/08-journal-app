import PropTypes from 'prop-types';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({
  id,
  title,
  body,
  date,
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const handleClickNoteActive = () => {
    dispatch(setActiveNote({
      id,
      title,
      body,
      date,
      imageUrls,
    }));
  };

  const newTitle = useMemo(() => ((title.length > 17) ? `${title.substring(0, 17)}...` : title), [title]);

  return (
    <ListItem
      disablePadding
      onClick={handleClickNoteActive}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  imageUrls: PropTypes.array,
};

/* SideBarItem.defaultProps = {
  imageUrls: [],
}; */
