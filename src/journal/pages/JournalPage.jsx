import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const handleClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <>
      {/* por defecto le ubica como una etiqueta p
      <Typography>Journal Page</Typography> */}

      {/* se utiliza la variante component para ubicarle con la etiqueta que deseamos
      <Typography component="h1">Journal Page</Typography> */}

      {/* se utiliza la variant para que le ubique las propiedades del tag de html */}
      {/* <MailOutline /> */}
      <JournalLayout>
        {/* <Typography>
          Et consequat cillum ipsum ut eiusmod. Cupidatat do ut tempor eiusmod.
          Officia mollit nisi ex deserunt occaecat excepteur aliquip veniam qui.
          Ut officia sint ad cupidatat incididunt aliqua nulla.
          aaIpsum duis incididunt cillum ut pariatur ad commodo.
          Anim ullamco aliquip aliqua enim nostrud ea amet aliqua dolore sint.
        </Typography> */}
        <>
          {
            // eslint-disable-next-line no-extra-boolean-cast
            (!!active) ? <NoteView /> : <NothingSelectedView />
          }
          {/* <NothingSelectedView /> */}
          {/* <NoteView /> */}
          <IconButton
            disabled={isSaving}
            onClick={handleClickNewNote}
            size="large"
            sx={{
              color: 'white',
              backgroundColor: 'error.main',
              ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
              position: 'fixed',
              right: 50,
              bottom: 50,
            }}
          >
            <AddOutlined sx={{ fontSize: 30 }} />
          </IconButton>
        </>
      </JournalLayout>
    </>
  );
};
