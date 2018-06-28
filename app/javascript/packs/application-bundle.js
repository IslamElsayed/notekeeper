import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import NotesIndex from '../bundles/components/notes/NotesIndex';
import NoteForm from '../bundles/components/notes/NoteForm';
import Note from '../bundles/components/notes/Note';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  NotesIndex,
  NoteForm,
  Note
});
