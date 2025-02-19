import {
  setDoc,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  setSavingNewNote,
  updateNote,
} from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => (
  async (dispatch, getState) => {
    dispatch(setSavingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
);

export const startLoadingNotes = () => (
  async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
);

export const starActiveNote = (idNote) => (
  async (dispatch, getState) => {
    const { notes } = getState().journal;
    const note = notes.find(({ id }) => id === idNote);
    if (note == null) throw new Error('La nota del usuario no existe');

    dispatch(setActiveNote(note));
  }
);

export const starSavingNote = () => (
  async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
  }
);

export const startUploadingFiles = (files = []) => (
  async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < files.length; index++) {
      fileUploadPromises.push(fileUpload(files[index]));
    }

    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photoUrls));
  }
);

export const startDeletingNote = () => (
  async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(note.id));
  }
);
