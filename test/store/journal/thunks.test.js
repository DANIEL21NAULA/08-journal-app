import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewEmptyNote,
  setActiveNote,
  setSavingNewNote,
  startNewNote,
} from '../../../src/store/journal';

describe('Pruebas en Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe de crear una nueva nota en blanco', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({
      auth: { uid },
    });
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setSavingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(
      {
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      },
    ));

    expect(dispatch).toHaveBeenCalledWith(setActiveNote(
      {
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      },
    ));

    //! Borrar de Firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
